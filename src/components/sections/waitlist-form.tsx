'use client';

import { useActionState } from 'react';
import { useTranslations } from 'next-intl';
import { ArrowUpRight, Check } from 'lucide-react';
import { joinWaitlist } from '@/app/actions/waitlist';
import type { Locale } from '@/i18n/routing';
import type { WaitlistState } from '@/lib/waitlist';

const fieldClass =
  'mt-2 min-h-12 w-full rounded-xl border border-line-strong bg-bg px-4 text-base text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:opacity-60';

export function WaitlistForm({
  locale,
  available,
}: {
  locale: Locale;
  available: boolean;
}) {
  const t = useTranslations('Waitlist');
  const [state, action, pending] = useActionState<WaitlistState, FormData>(
    joinWaitlist,
    {
      status: 'idle',
    },
  );
  const message = !available
    ? t('unavailable')
    : state.status !== 'idle'
      ? t(state.status)
      : '';

  return (
    <form
      action={action}
      className="rounded-card border border-line-strong bg-surface p-6 sm:p-8"
      aria-describedby="waitlist-notice waitlist-status"
      aria-busy={pending}
    >
      <input type="hidden" name="locale" value={locale} />
      <div hidden aria-hidden="true">
        <label htmlFor="waitlist-website">{t('website')}</label>
        <input
          id="waitlist-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      <fieldset
        disabled={!available || pending || state.status === 'success'}
        className="space-y-5"
      >
        <legend className="sr-only">{t('title')}</legend>
        <div>
          <label htmlFor="waitlist-email" className="text-sm font-medium">
            {t('email')}
          </label>
          <input
            id="waitlist-email"
            name="email"
            type="email"
            autoComplete="email"
            maxLength={254}
            required
            className={fieldClass}
            aria-describedby="waitlist-status"
          />
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="waitlist-interest" className="text-sm font-medium">
              {t('interest')}
            </label>
            <select
              id="waitlist-interest"
              name="interest"
              defaultValue="both"
              className={fieldClass}
            >
              {(['launch', 'transcriptor', 'both'] as const).map((value) => (
                <option key={value} value={value}>
                  {t(`interests.${value}`)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="waitlist-language" className="text-sm font-medium">
              {t('songLanguage')}
            </label>
            <select
              id="waitlist-language"
              name="songLanguage"
              defaultValue={locale}
              className={fieldClass}
            >
              {(['es', 'en', 'other'] as const).map((value) => (
                <option key={value} value={value}>
                  {t(`languages.${value}`)}
                </option>
              ))}
            </select>
          </div>
        </div>
        <label className="flex min-h-11 cursor-pointer items-start gap-3 text-sm leading-6 text-fg-mute">
          <input
            type="checkbox"
            name="consent"
            required
            className="mt-1 size-5 shrink-0 accent-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          />
          {t('consent')}
        </label>
        <button
          type="submit"
          className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-accent px-6 text-sm font-semibold text-accent-fg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? t('pending') : t('submit')}
          {state.status === 'success' ? (
            <Check size={18} aria-hidden="true" />
          ) : (
            <ArrowUpRight size={18} aria-hidden="true" />
          )}
        </button>
      </fieldset>
      <p id="waitlist-notice" className="mt-5 text-xs leading-6 text-fg-mute">
        {t('privacy')}
      </p>
      <p
        id="waitlist-status"
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="mt-3 text-sm leading-6 text-accent"
      >
        {message}
      </p>
    </form>
  );
}
