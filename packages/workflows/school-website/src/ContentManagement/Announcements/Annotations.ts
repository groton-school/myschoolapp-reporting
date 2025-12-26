import { SkyAPI } from '@oauth2-cli/sky-api';

export type AnnotatedAnnouncementCategory =
  SkyAPI.school.v1.contentmanagement.announcements.ContentAnnouncementCategory & {
    announcements?: SkyAPI.school.v1.contentmanagement.announcements.ContentAnnouncement[];
  };
