import { Episode } from "./types";
import { normalizeSlug, slugMap } from "./episodeUtils";
import { spanishEpisodes } from "../../../data/spanishEpisodes";
import { germanEpisodes } from "../../../data/germanEpisodes";
import { japaneseEpisodes } from "../../../data/japaneseEpisodes";

const supportedLangs = ["en", "fr"];

const fallbackTexts: Record<string, string> = {
  es: "Cargando...",
  de: "Lädt...",
  jp: "読み込み中...",
};

type EpisodesSource = Record<
  string,
  {
    [slug: string]: Episode[];
  }
>;

const episodeSources: EpisodesSource = {
  es: spanishEpisodes,
  de: germanEpisodes,
  jp: japaneseEpisodes,
};

export async function fetchEpisodes(
  sagaTitle: string,
  sagaId: number,
  lang: string,
  episodeIds: number[] | undefined,
  getEpisodesBySagaId: (id: number, lang: string) => Promise<Episode[]>
): Promise<Episode[]> {
  const baseLang = lang.split("-")[0];
  const normalizedLang = baseLang === "ja" ? "jp" : baseLang;

  if (supportedLangs.includes(normalizedLang)) {
    const episodesData = await getEpisodesBySagaId(sagaId, normalizedLang);
    return episodeIds
      ? episodesData.filter((ep) => episodeIds.includes(ep.id))
      : episodesData.slice(0, 5);
  } else {
    const sagaSlug = slugMap[sagaTitle] || normalizeSlug(sagaTitle);
    const episodesArray = episodeSources[normalizedLang]?.[sagaSlug] || [];

    const episodeMapByNumber = episodesArray.reduce(
      (acc: Record<number, Episode>, ep) => {
        acc[ep.episode] = ep;
        return acc;
      },
      {}
    );

    return episodeIds
      ? episodeIds.map((epNum) => ({
          id: epNum,
          episode: epNum,
          title: episodeMapByNumber[epNum]?.title || fallbackTexts[normalizedLang] || "Loading...",
        }))
      : episodesArray.slice(0, 5);
  }
}
