"use client";
import Image, { StaticImageData } from "next/image";
import sagaIcon from "@/assets/Map/OnepieceGif.png";
import islandIcon from "@/assets/Map/IslandStatic.png";
import { useTranslations } from "next-intl";
import { Fragment } from "react";

interface Props {
  filterType: "all" | "saga" | "island";
  setFilterType: (type: "all" | "saga" | "island") => void;
}

type Option = {
  type: "saga" | "island";
  icon: StaticImageData;
  label: string;
  alt: string;
};

function FilterButton({
  type,
  current,
  icon,
  label,
  alt,
  setFilterType,
}: {
  type: "saga" | "island";
  current: string;
  icon: StaticImageData;
  label: string;
  alt: string;
  setFilterType: (t: "saga" | "island") => void;
}) {
  const isActive = current === type;
  const base = "flex items-center gap-2 px-2 py-1 rounded cursor-pointer";
  const style = isActive
    ? "bg-yellow-400 text-white"
    : "bg-white text-yellow-800";

  return (
    <button onClick={() => setFilterType(type)} className={`${base} ${style}`}>
      <div className="w-6 h-4" style={{ position: "relative" }}>
        <Image src={icon} alt={alt} fill sizes="24px" />
      </div>

      <span>{label}</span>
    </button>
  );
}

export function MapTypeIndicator({ filterType, setFilterType }: Props) {
  const t = useTranslations("map");

  const options: Option[] = [
    {
      type: "saga",
      icon: sagaIcon,
      label: t("sagas"),
      alt: t("sagaAlt"),
    },
    {
      type: "island",
      icon: islandIcon,
      label: t("importantIslands"),
      alt: t("islandAlt"),
    },
  ];

  return (
    <div
      className="absolute top-4 left-4 bg-yellow-100 border border-yellow-400 rounded-lg px-4 py-3 text-sm text-brown-800 z-10 transition-all duration-300 ease-in-out hover:scale-[1.03]"
      style={{ boxShadow: "inset 0 0 20px #7b4c20" }}
    >
      <h3 className="text-lg font-black mb-2 text-black-900 tracking-wide border-b border-yellow-600 pb-1">
        {t("legendTitle")}
      </h3>

      <div className="flex flex-col gap-2">
        {options.map((opt) => (
          <Fragment key={opt.type}>
            <FilterButton
              type={opt.type}
              current={filterType}
              icon={opt.icon}
              label={opt.label}
              alt={opt.alt}
              setFilterType={setFilterType}
            />
          </Fragment>
        ))}

        <button
          onClick={() => setFilterType("all")}
          className={`mt-1 underline text-xs cursor-pointer ${
            filterType === "all" ? "font-semibold" : ""
          }`}
        >
          {t("showAll")}
        </button>
      </div>
    </div>
  );
}
