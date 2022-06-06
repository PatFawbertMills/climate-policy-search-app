import { sortBy } from "lodash";
import { TPolicy, TSector } from "../types";

type TKeyedSectors = {
  [key: string]: number;
};

/**
 * Utility to calculate a sum of all the sectors in our collection
 * Each policy has a collection seperated by ';'
 * We then check the uniqueSectors object for the sector key, if it exists we update the count by 1,
 * otherwise we must be the first instance so we set the count to 1
 * Finally the object is converted to a sorted array for better UX and easy within the app
 * Note: this type of functionality I would expect to be done on the back-end normally
 * */
export const getSectors = (policies: TPolicy[]): TSector[] => {
  const uniqueSectors: TKeyedSectors = {};
  for (let i = 0; i < policies.length; i++) {
    const sectors = policies[i].sectors.split(";");
    for (let j = 0; j < sectors.length; j++) {
      const sector = sectors[j];
      const count =
        uniqueSectors[sector] === undefined ? 0 : uniqueSectors[sector];
      uniqueSectors[sector] = count + 1;
    }
  }
  const sectors: TSector[] = Object.keys(uniqueSectors).map((key) => ({
    name: key,
    no_of_policies: uniqueSectors[key],
  }));
  return sortBy(sectors, (sector: TSector) => sector.name);
};
