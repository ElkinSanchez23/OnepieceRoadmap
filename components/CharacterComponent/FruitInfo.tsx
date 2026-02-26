import { Character } from "@/services/getCharacters";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";



export default function FruitInfo({ fruit }: { fruit: Character["fruit"] }) {
  const t = useTranslations("character");
  const locale = useLocale();

  if (!fruit) return null;

  return (
    <div className="pt-2 border-t border-yellow-400">
      <h2 className="text-md font-semibold">{t("devilFruit")}:</h2>
      <p>{fruit.name} ({fruit.type})</p>
      {fruit.description && (
        <p className="text-sm text-gray-600 italic mt-1">
          &quot;
          {["en", "fr"].includes(locale)
            ? fruit.description
            : t(`devilFruitDescriptions.${fruit.roman_name}`)}
          &quot;
        </p>
      )}
    </div>
  );
}
