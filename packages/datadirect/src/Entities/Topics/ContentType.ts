type ObjectTypeId =
  | 16 /* dynamic content */
  | 32 /* static content */
  | 64; /* topic information, learning tool, discussion */

export type ContentType = {
  Id: ObjectTypeId;
  Name: string;
  ObjectTypeId: number;
};
