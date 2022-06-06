import { TMeta } from "../types";

type TMetaCollection = {
  [key: number]: TMeta[];
};

/* 
  All the local storage functionality is handled here
  It is a very simple implementation that:
  Retrieves existing meta data from local storage
  Either adds to the existing collection or creates a new collection of the given policy's id
  Deletes a specific meta item based on the key
  Saves the collection back to local storage
*/

const getMeta = (): TMetaCollection => {
  const existingMeta = window.localStorage.getItem("climate_policy_meta");
  return existingMeta == null ? {} : JSON.parse(existingMeta);
};

// Save back to local storage
const saveMeta = (newMeta: TMetaCollection) => {
  window.localStorage.setItem("climate_policy_meta", JSON.stringify(newMeta));
};

export const addMetaData = (
  policy_id: number,
  meta: TMeta
): TMetaCollection => {
  // Get existing meta out of local storage
  const existingMetaCollection = getMeta();

  // Add / replace new meta
  const policyMeta: TMeta[] = existingMetaCollection[policy_id] || [];
  policyMeta.push(meta);
  existingMetaCollection[policy_id] = policyMeta;

  saveMeta(existingMetaCollection);

  return existingMetaCollection;
};

export const deleteMetaItem = (policy_id: number, key: string): TMeta[] => {
  // Get existing meta out of local storage
  const existingMetaCollection = getMeta();
  const policyMeta: TMeta[] = existingMetaCollection[policy_id] || [];

  if (policyMeta == []) return policyMeta;

  // Check we already have the meta, if we do remove it and save
  const existingMetaIndex = policyMeta.findIndex((item) => item.key === key);
  if (existingMetaIndex === -1) return policyMeta;
  policyMeta.splice(existingMetaIndex, 1);
  existingMetaCollection[policy_id] = policyMeta;

  saveMeta(existingMetaCollection);
  return policyMeta;
};

export const getMetaData = (policy_id?: number): TMeta[] => {
  if (!policy_id) return [];
  const existingMetaCollection = getMeta();
  return existingMetaCollection[policy_id];
};

export const containsKey = (policy_id: number, key: string): boolean => {
  // Get existing meta out of local storage
  const existingMetaCollection = getMeta();

  // Add / replace new meta
  const policyMeta: TMeta[] = existingMetaCollection[policy_id] || [];

  // Check if we have the key already
  return policyMeta.findIndex((item) => item.key === key) > -1;
};
