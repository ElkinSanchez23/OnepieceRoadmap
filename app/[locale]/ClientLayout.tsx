'use client';

import React from 'react';
import { useLocale } from 'next-intl';
import { BurguerDespegable } from '@/components/GeneralComponents/BurguerDespegable';
import LanguageSwitcher from '@/i18n/LanguageSwitcher';


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


      <div className="fixed bottom-8 right-8 z-[1000]">
        <BurguerDespegable />
      </div>
    </>
  );
}