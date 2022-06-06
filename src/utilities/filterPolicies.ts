import { TPolicy } from "../types";

// Simple filter method that will filter first by the sector
// Then by a string.includes lookup on both the title and description of the policy
export const filterPolicies = (
  policies: TPolicy[],
  sector = "",
  search = ""
): TPolicy[] => {
  let filtered = policies;
  if (sector !== "")
    filtered = filtered.filter(({ sectors }) => sectors.includes(sector));
  if (search !== "")
    filtered = filtered.filter(
      ({ policy_title, description_text }) =>
        policy_title.includes(search) || description_text.includes(search)
    );
  return filtered;
};
