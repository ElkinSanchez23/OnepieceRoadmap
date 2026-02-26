"use client";

import React, { useMemo } from "react";
import { useTranslations, useLocale } from "next-intl";
import { VerticalTimelineElement } from "react-vertical-timeline-component";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";

const HiArrowCircleDown = dynamic(
  () => import("react-icons/hi").then((mod) => mod.HiArrowCircleDown),
  { ssr: false }
);

type Props = {
  title: string;
  image: string;
  descriptionKey: string;
  route: string;
};

export const SagaTimelineElement: React.FC<Props> = ({
  title,
  image,
  descriptionKey,
  route,
}) => {
  const t = useTranslations("timeline");
  const locale = useLocale();

  const fullRoute = useMemo(() => {
    return `/${locale}${route.startsWith("/") ? route : `/${route}`}`;
  }, [locale, route]);

  return (
    <VerticalTimelineElement
      contentStyle={{ background: "#f0f0f0", color: "#000" }}
      contentArrowStyle={{ borderRight: "7px solid #bbb" }}
      iconStyle={{ background: "#000", color: "#fff" }}
      icon={<HiArrowCircleDown />}
    >
      <h3 className="text-xl font-semibold text-center">{title}</h3>

      <div className="relative w-full h-48 my-3">
        <Image
          src={image}
          alt={`Imagen de la saga ${title}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover rounded-lg border border-gray-300"
        />
      </div>

      <p className="text-sm text-gray-800">{t(descriptionKey)}</p>

      <Link
        href={fullRoute}
        className="inline-block mt-4 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
        aria-label={`Explorar más sobre la saga ${title}`}
      >
        {t("explore")}
      </Link>
    </VerticalTimelineElement>
  );
};
