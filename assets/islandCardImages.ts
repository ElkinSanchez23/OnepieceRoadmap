import { StaticImageData } from 'next/image'

import BoaVsBlack from '@/assets/cards/amazon lily/BoaVSBlack.jpg'
import LuffyAndBoa from '@/assets/cards/amazon lily/LuffyandBoa.jpg'
import LuffyVsBoaSisters from '@/assets/cards/amazon lily/luffyvsboaSisters.jpg'
import Coby from '@/assets/cards/beehive/Coby.jpg'
import KuzanVsAokiji from '@/assets/cards/beehive/KuzanvsAokiji.jpg'
import BlackFlote from '@/assets/cards/beehive/prime-barbe-noir.jpg'
import RockBands from '@/assets/cards/beehive/RocksBands.jpg'
import bigMom from '@/assets/cards/elbaf/bigMom.jpg'
import DorryVsBrogy from '@/assets/cards/elbaf/Dorry_vs._Brogy.jpg'
import UssopKing from '@/assets/cards/elbaf/usopp-raid-outfit.jpg'
import SanjiPudding from '@/assets/cards/germa 66/Sanji_and_Pudding.jpg'
import SanjiRuit from '@/assets/cards/germa 66/SanjiRaidsuit.jpg'
import VinsmokeFamily from '@/assets/cards/germa 66/vinsmoke-family-germa-66-one-piece.jpg'
import Imu from '@/assets/cards/mary Geoise/imu.jpg'
import KumaSlave from '@/assets/cards/mary Geoise/Kuma-as-a-slave.jpg'
import Ancents from '@/assets/cards/mary Geoise/Los_Cinco_Ancianos_Anime.jpg'
import Tenryu from '@/assets/cards/mary Geoise/Nobles_Mundiales.jpg'
import PunkHazard from '@/assets/cards/punk hazard/Punk_Hazard_completo.jpg'
import LawVsVergo from '@/assets/cards/punk hazard/LawVergo.jpg'
import LuffyLaw from '@/assets/cards/punk hazard/luffyLaw.jpg'
import CaesarBeat from '@/assets/cards/punk hazard/Caesarvsluffy.jpg'
import Borsalino from '@/assets/cards/sabaody/Borsalino.jpg'
import KumaVSMugis from '@/assets/cards/sabaody/Kuma_vs._Sombreros_de_Paja.jpg'
import supernovas from '@/assets/cards/sabaody/supernovas.jpg'
import IslandWeatheria from '@/assets/cards/weatheria/IslandWeatheria.jpg'
import NamiWeather from '@/assets/cards/weatheria/NamiWeather_Report.jpg'
import WeatherRoom from '@/assets/cards/weatheria/Weatheria_Control_Room.jpg'
const cardImages: Record<string, StaticImageData> = {
  // Amazon Lily
  bb_vs_hancock: BoaVsBlack,
  hancock_love: LuffyAndBoa,
  luffy_vs_sisters: LuffyVsBoaSisters,

  // Beehive
  coby_prisoner: Coby,
  garp_vs_kuzan: KuzanVsAokiji,
  blackbeard_base: BlackFlote,
  rocks_origin: RockBands,

  // Elbaf
  big_mom_disaster: bigMom,
  dorry_brogy_duel: DorryVsBrogy,
  usopp_dream: UssopKing,

  // Germa 66
  sanji_pudding_wedding: SanjiPudding,
  raid_suit_tech: SanjiRuit,
  vinsmoke_experiments: VinsmokeFamily,

  // Mary Geoise
  imu_throne: Imu,
  kuma_slave: KumaSlave,
  gorosei_location: Ancents,
  tenryuubito_residence: Tenryu,

  // Punk Hazard
  island_split: PunkHazard,
  vergo_vs_law: LawVsVergo,
  luffy_law_alliance: LuffyLaw,
  caesar_defeated: CaesarBeat,

  // Sabaody
  kizaru_attack: Borsalino,
  kuma_appears: KumaVSMugis,
  supernovas_encounter: supernovas,

  // Weatheria
  cloud_island: IslandWeatheria,
  nami_arrives: NamiWeather,
  nami_steals_book: WeatherRoom,
};

export default cardImages;