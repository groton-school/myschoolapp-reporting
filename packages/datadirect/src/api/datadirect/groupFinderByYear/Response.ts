export type Item = {
  association: string;
  association_id: number;
  group_name: string;
  lead_pk: number;
  level_description: string;
  terms_offered: string;
  current_pk: number;
};

export type Response = Item[];
