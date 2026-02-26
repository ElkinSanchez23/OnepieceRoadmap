import { Location } from "./types";
import { getLocationById } from "../../../services/sagasService";

export async function fetchLocations(
  locationIds: number[] | undefined,
  lang: string
): Promise<Location[]> {
  if (!locationIds || locationIds.length === 0) return [];
  const locationPromises = locationIds.map((locId) => getLocationById(locId, lang));
  const locations = await Promise.all(locationPromises);
  return locations.filter((loc): loc is Location => loc !== null);
}
