'use client';

import React from 'react';
import { useLocale } from 'next-intl';
import LanguageSwitcher from '@/i18n/languageSwitcher';


export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = useLocale();

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('lang', locale);
    }
  }, [locale]);

  return (
    <>
      {children}

      <div className="fixed top-4 right-4 z-[1000]">
        <LanguageSwitcher />
      </div>
    </>
  );
}