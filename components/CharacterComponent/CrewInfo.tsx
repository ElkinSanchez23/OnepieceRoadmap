import { useTranslations } from "next-intl";
import { Character } from "@/services/getCharacters";


export default function CrewInfo({ crew }: { crew: Character["crew"] }) {
  const t = useTranslations("character");

  if (!crew) return null;

  return (
    <div className="pt-2 border-t border-yellow-400">
      <h2 className="text-md font-semibold">{t("crewDetails")}:</h2>
      <p>{t("crewName")}: {crew.name}</p>
      <p>{t("crewRomanName")}: {crew.roman_name}</p>
      {crew.total_prime && (
        <p>
          {t("crewTotalBounty")}:{" "}
          <span className="text-red-700">{crew.total_prime}</span>
        </p>
      )}
    </div>
  );
}
