import data from "../data/policies.csv";

import { TPolicy } from "../types/types";

type TParsedCSV = {
  headers: string[];
  data: TPolicy[];
};

/**
 * parseCSV
 * Transforms a CSV input into a data set for use within the application
 * Note: please refer to the vite.config.ts for the dsv plugin that allows us to read CSV files
 * Note: I would normally expect the back-end to return JSON rather than CSV data
 * @param csv the csv data
 * @returns TCsvToJson which contains the table headers and the data set
 */

// Important Note: I have included the CSV in the project directory but in all likelyhood this would be coming from an API in future
// For that reason there is no asynchronus handling of the data. If it were API driven I would include the necessary loading states to the application.
export const parseCSV = (csv: TPolicy[] = data): TParsedCSV => {
  return {
    headers: ["policy_id", "policy_title", "sectors", "description_text"],
    data: csv,
  };
};
