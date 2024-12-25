export type Base = {
  Content: string;
  ContentId: number;
  EditorAccess?: number;
  ShowContentType?: number;
};

export type Audio = Base & { Content: 'Audio' };
export type Video = Base & { Content: 'Video' };
export type Photo = Base & { Content: 'Photo' };
export type Media = Audio | Video | Photo;

export type Widget = Base & { Content: 'Widget' };
export type RSSReader = Widget;

export type Any = Base | Media | Widget | RSSReader;

// TODO unclear if these IDs are consistent across instances
export const Static: Base[] = [
  { ContentId: 408, Content: 'Horizontal Line' },
  { ContentId: 407, Content: 'Spacer' }
];
