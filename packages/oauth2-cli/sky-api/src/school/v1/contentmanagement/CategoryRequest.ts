export type CategoryRequest = {
  id?: number;
  type?:
    | 'Page content'
    | 'Class'
    | 'Activity'
    | 'Advisory'
    | 'Team'
    | 'Dorm'
    | 'Community';
};
