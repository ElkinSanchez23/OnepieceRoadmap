"use client";
import { useTranslations } from "next-intl";

const MapTitle = () => {
  const t = useTranslations("map");
  return (
    <div
      className="absolute top-4 left-1/2 -translate-x-1/2 bg-yellow-100 border border-yellow-400 rounded-lg shadow-lg px-4 py-2 text-brown-800 text-lg sm:text-xl font-semibold z-10"
      style={{ boxShadow: "inset 0 0 30px #7b4c20" }}
    >
      {t("interactive")}
    </div>
  );
};

export default MapTitle;
