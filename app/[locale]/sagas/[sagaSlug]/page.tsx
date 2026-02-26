'use client';

import { notFound, useParams } from 'next/navigation';
import { SagaDetail } from '@/components/SagasComponents/SagaDetail/SagaDetail';
import {
  EastBlueBG,
  AlabastaBG,
  SkypieaBG,
  WaterSevenBG,
  ThrillerBarkBG,
  MarinefordBG,
  GyojinIslandBG,
  DressrosaBG,
  WholeCakeBG,
  WanoBG
} from '@/assets/images';
import { StaticImageData } from 'next/image';

type SagaParams = {
  sagaId: number;
  backgroundImage: StaticImageData;
  arcIds: number[];
  characterIds: number[];
  episodeIds: number[];
  locationIds: number[];
};

const sagaDataMap: Record<string, SagaParams> = {
  'east-blue': {
    sagaId: 1,
    backgroundImage: EastBlueBG,
    arcIds: [1, 2, 3, 4],
    characterIds: [1, 2, 3, 4, 5],
    episodeIds: [1, 2, 3, 10, 15],
    locationIds:[5, 4, 3, 2, 1] 
  },
  'alabasta': {
    sagaId: 2,
    backgroundImage: AlabastaBG,
    arcIds: [14, 12, 11, 10,13],
    characterIds: [429, 673, 290, 82, 520],
    episodeIds: [92, 101, 112, 119, 130],
    locationIds: [46,47,50],
  },
  'skypiea': {
    sagaId: 3,
    backgroundImage: SkypieaBG,
    arcIds: [15, 16, 17, 18,19],
    characterIds: [660, 624, 637],
    episodeIds: [167, 182 , 184, 192,195],
    locationIds: [89,92,96,95],
  },
  'water-seven': {
    sagaId: 4,
    backgroundImage: WaterSevenBG,
    arcIds: [24, 25, 26],
    characterIds: [7, 8, 392,396, 6],
    episodeIds: [236, 247 , 278 ,309, 304],
    locationIds: [54, 55, 53],
  },
  'thriller-bark': {
    sagaId: 5,
    backgroundImage: ThrillerBarkBG,
    arcIds: [22],
    characterIds: [1, 3, 4,9, 49,690],
    episodeIds: [337, 341, 359, 377, 379, 380, 382],
    locationIds: [40],
  },
  'marineford': {
    sagaId: 6,
    backgroundImage: MarinefordBG,
    arcIds: [30, 31, 32, 34, 35],
    characterIds: [1, 290, 289, 82, 673, 518, 520, 690, 247, 291, 293, 429, 661, 663, 70, 54],
    episodeIds: [421, 422, 456, 461, 483, 485, 489, 516],
    locationIds: [44, 67],
  },
  'gyojin-island': {
    sagaId: 7,
    backgroundImage: GyojinIslandBG,
    arcIds: [36, 37],
    characterIds: [1, 10, 358, 646, 650],
    episodeIds: [517, 523, 540, 569, 574],
    locationIds: [42, 60],
  },
  'dressrosa': {
    sagaId: 8,
    backgroundImage: DressrosaBG,
    arcIds: [39, 41],
    characterIds: [1, 4, 54, 365, 662],
    episodeIds: [579, 629, 663, 697, 733, 746],
    locationIds: [72, 77, 83],
  },
  'whole-cake': {
    sagaId: 9,
    backgroundImage: WholeCakeBG,
    arcIds: [43, 45],
    characterIds: [1, 5, 10, 96, 97],
    episodeIds: [751, 783, 830, 849, 871, 877],
    locationIds: [71, 78],
  },
  'wano': {
    sagaId: 10,
    backgroundImage: WanoBG,
    arcIds: [46, 47],
    characterIds: [1, 187, 560, 562, 590],
    episodeIds: [892, 960, 978, 1071, 1076, 1085],
    locationIds: [69],
  },
};

export default function SagaPage() {
  const params = useParams();
  const sagaSlug = params?.sagaSlug as string;

  const saga = sagaDataMap[sagaSlug];

  if (!saga) {
    notFound();
  }

  return (
    <SagaDetail
      sagaId={saga.sagaId}
      backgroundImage={saga.backgroundImage}
      arcIds={saga.arcIds}
      characterIds={saga.characterIds}
      episodeIds={saga.episodeIds}
      locationIds={saga.locationIds}
    />
  );
}
