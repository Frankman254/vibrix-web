import test from 'node:test';
import assert from 'node:assert/strict';
import {
  waitlistSchema,
  saveWaitlistContact,
  getWaitlistConfig,
} from '../src/lib/waitlist.ts';

const input = {
  email: 'creator@example.com',
  songLanguage: 'es',
  interest: 'both',
  locale: 'en',
  consent: 'on',
  website: '',
};
const config = { apiKey: 'test-only-key', segmentId: 'test-segment' };
function mockResponses(responses) {
  const calls = [];
  const request = async (url, options) => {
    calls.push({
      url,
      ...options,
      body: options.body ? JSON.parse(options.body) : undefined,
    });
    assert.ok(responses.length, 'Unexpected provider request');
    const [status, body = {}] = responses.shift();
    return new Response(JSON.stringify(body), { status });
  };
  return { calls, request };
}

test('validates email, explicit consent, enums and the honeypot on the server', () => {
  assert.equal(
    waitlistSchema.parse({ ...input, email: ' Creator@Example.com ' }).email,
    input.email,
  );
  for (const values of [
    { email: 'bad' },
    { consent: null },
    { website: 'spam' },
    { interest: 'unknown' },
    { songLanguage: 'unknown' },
    { locale: 'unknown' },
  ]) {
    assert.equal(
      waitlistSchema.safeParse({ ...input, ...values }).success,
      false,
    );
  }
});

test('missing credentials leave the integration unavailable', () => {
  const previous = process.env.RESEND_API_KEY;
  delete process.env.RESEND_API_KEY;
  try {
    assert.equal(getWaitlistConfig(), null);
  } finally {
    if (previous !== undefined) process.env.RESEND_API_KEY = previous;
  }
});

test('persists a new email with language, interest and segment', async () => {
  const mock = mockResponses([[404], [200, { id: 'contact-id' }]]);
  await saveWaitlistContact(input, config, mock.request);
  assert.equal(mock.calls.length, 2);
  assert.equal(mock.calls[1].url, 'https://api.resend.com/contacts');
  assert.equal(mock.calls[1].method, 'POST');
  assert.deepEqual(mock.calls[1].body, {
    email: input.email,
    unsubscribed: false,
    properties: {
      song_language: 'es',
      signup_locale: 'en',
      waitlist_interest: 'both',
    },
    segments: [{ id: 'test-segment' }],
  });
});

test('updates existing contact preferences and segment without duplicating or resubscribing', async () => {
  const mock = mockResponses([[200, { unsubscribed: false }], [200], [200]]);
  await saveWaitlistContact(input, config, mock.request);
  assert.equal(mock.calls[1].method, 'PATCH');
  assert.equal(mock.calls[1].body.unsubscribed, undefined);
  assert.match(
    mock.calls[2].url,
    /creator%40example.com\/segments\/test-segment$/,
  );
});

test('does not reverse an unsubscribe', async () => {
  const mock = mockResponses([[200, { unsubscribed: true }]]);
  await assert.rejects(saveWaitlistContact(input, config, mock.request));
  assert.equal(mock.calls.length, 1);
});

test('provider errors and partial failures never report success', async () => {
  for (const responses of [
    [[500]],
    [[404], [422]],
    [[200, {}], [500]],
    [[200, {}], [200], [500]],
  ]) {
    const mock = mockResponses(responses);
    await assert.rejects(saveWaitlistContact(input, config, mock.request));
  }
  await assert.rejects(
    saveWaitlistContact(input, config, async () => {
      throw new Error('Network unavailable');
    }),
  );
});

test('retries a provider rate limit once', async () => {
  const mock = mockResponses([[429], [404], [200]]);
  await saveWaitlistContact(input, config, mock.request);
  assert.equal(mock.calls.length, 3);
});
