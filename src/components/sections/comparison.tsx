import { getTranslations } from 'next-intl/server';
import { SectionHeading } from './section-heading';

const rows = ['processing', 'audio', 'cost', 'control'] as const;

export async function Comparison() {
  const t = await getTranslations('Comparison');
  return (
    <section
      id="comparison"
      aria-labelledby="comparison-title"
      className="py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          id="comparison-title"
          eyebrow={t('eyebrow')}
          title={t('title')}
          description={t('description')}
        />
        <div className="mt-12 overflow-hidden rounded-card border border-line-strong">
          <table className="w-full table-fixed text-left text-sm leading-6">
            <caption className="sr-only">{t('caption')}</caption>
            <thead className="bg-surface text-xs sm:text-sm">
              <tr>
                <th
                  scope="col"
                  className="w-[26%] p-3 font-medium text-fg-mute sm:p-6"
                >
                  {t('criterion')}
                </th>
                <th
                  scope="col"
                  className="bg-accent/5 p-3 font-display text-accent sm:p-6"
                >
                  {t('local')}
                </th>
                <th scope="col" className="p-3 font-display sm:p-6">
                  {t('cloud')}
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((id) => (
                <tr key={id} className="border-t border-line">
                  <th
                    scope="row"
                    className="p-3 align-top font-medium wrap-break-word sm:p-6"
                  >
                    {t(`rows.${id}.label`)}
                  </th>
                  <td className="bg-accent/3 p-3 align-top wrap-break-word text-fg-mute sm:p-6">
                    {t(`rows.${id}.local`)}
                  </td>
                  <td className="p-3 align-top wrap-break-word text-fg-mute sm:p-6">
                    {t(`rows.${id}.cloud`)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-5 max-w-3xl text-sm leading-6 text-fg-mute">
          {t('note')}
        </p>
      </div>
    </section>
  );
}
