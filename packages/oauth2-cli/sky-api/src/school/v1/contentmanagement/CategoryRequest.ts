export type CategoryRequest = {
  // TODO CategoryRequest.id may be a string (undocumented)
  // Issue URL: https://github.com/groton-school/myschoolapp-reporting/issues/271
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
