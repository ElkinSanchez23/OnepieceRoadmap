import { Arc } from "./types";

export function filterArcs(
  arcsData: Arc[],
  arcIds: number[] | undefined
): Arc[] {
  return arcIds ? arcsData.filter((arc) => arcIds.includes(arc.id)) : arcsData.slice(0, 5);
}
