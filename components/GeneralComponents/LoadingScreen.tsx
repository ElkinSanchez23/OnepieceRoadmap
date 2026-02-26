import React from "react";
import { useTranslations } from "next-intl";
import Image, { StaticImageData } from "next/image";

type LoadingScreenProps = {
  imageSrc: StaticImageData;
  gifSrc: StaticImageData;
};

export const LoadingScreen = ({ imageSrc, gifSrc }: LoadingScreenProps) => {
  const t = useTranslations("sagaDetail");

  return (
<div
  className="flex flex-col items-center justify-center min-h-screen w-screen bg-blue-800 text-white text-center p-6"
  aria-busy="true"
  aria-live="polite"
>
      <div className="relative w-[300px] md:w-[400px] lg:w-[500px] h-[200px] mb-8">
        <Image
          src={imageSrc}
          alt={t("loadingTitleAlt") || "Loading title image"}
          fill
          sizes="60"
          className="object-contain"
          priority
        />
      </div>

      <Image
        src={gifSrc}
        alt=""
        role="presentation"
        className="w-[120px] h-[120px] md:w-[150px] md:h-[150px] mb-4"
        unoptimized
        priority
      />

      <p className="text-lg md:text-xl font-semibold animate-pulse">
        {t("loading")}
      </p>
    </div>
  );
};
