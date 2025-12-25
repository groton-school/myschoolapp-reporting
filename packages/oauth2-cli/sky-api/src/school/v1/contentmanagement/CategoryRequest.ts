export type CategoryRequest = {
  // TODO CategoryRequest.id may be a string (undocumented)
  id?: number | string;
  type?:
    | 'PageContent'
    | 'Class'
    | 'Activity'
    | 'Advisory'
    | 'Team'
    | 'Dorm'
    | 'Community';
};
