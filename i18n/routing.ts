import {defineRouting} from 'next-intl/routing';
 
export const routing = defineRouting({
  locales: ['en', 'de', 'jp', 'es', 'fr'] as const, 
  defaultLocale: 'en'
});