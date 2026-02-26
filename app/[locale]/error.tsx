"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import Link from "next/link";
import Image from "next/image";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  const t = useTranslations("error");
  const locale = useLocale();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-screen bg-red-800 text-white text-center p-6">
      
      <div className="relative w-[300px] md:w-[400px] lg:w-[500px] h-[200px] mb-8">
        <Image
          src="/assets/generalImages/one_Piece.png"
          alt="One Piece"
          fill
          sizes="60"
          className="object-contain opacity-80"
          priority
        />
      </div>

      
      <div className="text-8xl md:text-9xl mb-6 animate-pulse">⚠️</div>

     
      <h1 className="text-2xl md:text-3xl font-bold mb-4">
        ¡Algo Salió Mal!
      </h1>

      <p className="text-lg md:text-xl mb-8 max-w-2xl">
        Hemos encontrado un error inesperado. Nuestros piratas están trabajando para solucionarlo.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={reset}
          className="px-8 py-3 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-400 transition-colors duration-300 transform hover:scale-105"
        >
          Intentar de Nuevo
        </button>
        
        <Link
          href={`/${locale}`}
          className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500 transition-colors duration-300 transform hover:scale-105"
        >
          Ir al Inicio
        </Link>
      </div>

      <p className="text-sm text-gray-300 mt-8">
        Si el problema persiste, contacta al equipo de soporte
      </p>
    </div>
  );
} 