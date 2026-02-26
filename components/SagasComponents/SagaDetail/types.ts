import { StaticImageData } from "next/image";

export type Arc = { id: number; title: string };
export type Character = { id: number; name: string };
export type Episode = { id: number; episode: number; title: string};
export type Location = { id: number; name: string };
export type Saga = { id: number; title: string; image: string; banner: string };

export type Props = {
  sagaId: number;
  backgroundImage: StaticImageData;
  arcIds?: number[];
  characterIds?: number[];
  episodeIds?: number[];
  locationIds?: number[];
};
