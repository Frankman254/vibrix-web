import { z } from 'zod';

export const waitlistSchema = z.object({
  email: z.string().trim().toLowerCase().max(254).pipe(z.email()),
  songLanguage: z.enum(['es', 'en', 'other']),
  interest: z.enum(['launch', 'transcriptor', 'both']),
  locale: z.enum(['es', 'en']),
  consent: z.literal('on'),
  website: z.string().max(0),
});

export type WaitlistInput = z.infer<typeof waitlistSchema>;
export type WaitlistState = {
  status: 'idle' | 'success' | 'invalid' | 'unavailable' | 'error';
};
export type WaitlistConfig = { apiKey: string; segmentId: string };

export function getWaitlistConfig(): WaitlistConfig | null {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const segmentId = process.env.RESEND_WAITLIST_SEGMENT_ID?.trim();
  return apiKey && segmentId ? { apiKey, segmentId } : null;
}

/** Solo lo importa una Server Action. Nunca devuelve emails ni credenciales. */
export async function saveWaitlistContact(
  input: WaitlistInput,
  config: WaitlistConfig,
  request: typeof fetch = fetch,
): Promise<void> {
  const contactPath = `/contacts/${encodeURIComponent(input.email)}`;
  const call = async (path: string, method = 'GET', body?: unknown) => {
    const options = {
      method,
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        'Content-Type': 'application/json',
      },
      ...(body ? { body: JSON.stringify(body) } : {}),
      cache: 'no-store' as const,
    };
    let response = await request(`https://api.resend.com${path}`, {
      ...options,
      signal: AbortSignal.timeout(8000),
    });
    // Resend puede limitar ráfagas de las tres operaciones de un contacto existente.
    if (response.status === 429) {
      await new Promise((resolve) => setTimeout(resolve, 1100));
      response = await request(`https://api.resend.com${path}`, {
        ...options,
        signal: AbortSignal.timeout(8000),
      });
    }
    return response;
  };
  const properties = {
    song_language: input.songLanguage,
    signup_locale: input.locale,
    waitlist_interest: input.interest,
  };
  const existing = await call(contactPath);

  if (existing.status === 404) {
    const created = await call('/contacts', 'POST', {
      email: input.email,
      unsubscribed: false,
      properties,
      segments: [{ id: config.segmentId }],
    });
    if (!created.ok) throw new Error('Waitlist contact could not be saved.');
    return;
  }
  if (!existing.ok) throw new Error('Waitlist contact could not be checked.');

  const contact = (await existing.json()) as { unsubscribed?: boolean };
  // Una nueva petición pública nunca revoca una baja anterior.
  if (contact.unsubscribed) throw new Error('Contact is unsubscribed.');
  const updated = await call(contactPath, 'PATCH', { properties });
  if (!updated.ok) throw new Error('Waitlist preferences could not be saved.');
  const segmented = await call(
    `${contactPath}/segments/${encodeURIComponent(config.segmentId)}`,
    'POST',
  );
  if (!segmented.ok) throw new Error('Waitlist segment could not be saved.');
}
