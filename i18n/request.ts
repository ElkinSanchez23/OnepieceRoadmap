import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const messages = {
    landing: (await import(`@/messages/${locale}/landing.json`)).default,
    character: (await import(`@/messages/${locale}/character.json`)).default,
    crew: (await import(`@/messages/${locale}/crew.json`)).default,
    home: (await import(`@/messages/${locale}/home.json`)).default,
    importantPlaces: (await import(`@/messages/${locale}/importantPlaces.json`)).default,
    login: (await import(`@/messages/${locale}/login.json`)).default,
    map: (await import(`@/messages/${locale}/map.json`)).default,
    menu: (await import(`@/messages/${locale}/menu.json`)).default,
    plans: (await import(`@/messages/${locale}/plans.json`)).default,
    register: (await import(`@/messages/${locale}/register.json`)).default,
    sagaDetail: (await import(`@/messages/${locale}/sagaDetail.json`)).default,
    timeline: (await import(`@/messages/${locale}/timeline.json`)).default
  };

  return {
    locale,
    messages
  };
});
