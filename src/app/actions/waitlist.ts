'use server';

import {
  getWaitlistConfig,
  saveWaitlistContact,
  waitlistSchema,
  type WaitlistState,
} from '@/lib/waitlist';

export async function joinWaitlist(
  _previous: WaitlistState,
  formData: FormData,
): Promise<WaitlistState> {
  const parsed = waitlistSchema.safeParse({
    email: formData.get('email'),
    songLanguage: formData.get('songLanguage'),
    interest: formData.get('interest'),
    locale: formData.get('locale'),
    consent: formData.get('consent'),
    website: formData.get('website') ?? '',
  });
  if (!parsed.success) return { status: 'invalid' };
  const config = getWaitlistConfig();
  if (!config) return { status: 'unavailable' };
  try {
    await saveWaitlistContact(parsed.data, config);
    return { status: 'success' };
  } catch {
    // No registrar datos personales ni mostrar errores internos del proveedor.
    return { status: 'error' };
  }
}
