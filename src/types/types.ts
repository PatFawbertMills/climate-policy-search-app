export type TPolicy = {
  policy_id: number;
  policy_title: string;
  sectors: string;
  description_text: string;
};

export type TSector = {
  name: string;
  no_of_policies: number;
};

export type TMeta = {
  key: string;
  value: string;
};
