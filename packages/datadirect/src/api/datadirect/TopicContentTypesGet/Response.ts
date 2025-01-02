type ObjectTypeId =
  | 16 /* dynamic content */
  | 32 /* static content */
  | 64; /* topic information, learning tool, discussion */

export type Item = {
  Id: ObjectTypeId;
  Name: string;
  ObjectTypeId: number;
};

export type Response = Item[];
