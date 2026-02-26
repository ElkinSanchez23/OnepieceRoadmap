import { useTranslations } from "next-intl";
import Image, { StaticImageData } from "next/image";

export default function CharacterImage({
  name,
  imageSrc,
}: {
  name: string;
  imageSrc?: StaticImageData;
}) {
  const t = useTranslations("character");

  if (imageSrc) {
    return (
      <div className="relative w-60 sm:w-72 md:w-80 h-[22rem] sm:h-[28rem] md:h-[30rem] rounded-xl overflow-hidden">
        <Image
          src={imageSrc}
          alt={t("characterImageAlt", { name })}
          fill
          sizes="50"
          className="object-contain"
          priority
        />
      </div>
    );
  }

  return (
    <div className="w-60 h-80 bg-gray-200 flex items-center justify-center text-gray-500 rounded-lg shadow-lg">
      {t("noImageAvailable")}
    </div>
  );
}
