import * as Announcement from './Announcement.js';
import * as Assignment from './Assignment.js';
import * as DiscussionThread from './DiscussionThread.js';
import * as Download from './Download.js';
import * as Events from './Events.js';
import * as Expectations from './Expectations.js';
import * as GradingRubric from './GradingRubric.js';
import * as Links from './Links.js';
import * as Media from './Media.js';
import * as News from './News.js';
import * as RSSReader from './RSSReader.js';
import * as Syllabus from './Syllabus.js';
import * as Text from './Text.js';
import * as Widget from './Widget.js';

export type Content =
  | Announcement.Content
  | Assignment.Content
  | Media.Content
  | DiscussionThread.Content
  | Download.Content
  | Events.Content
  | Expectations.Content
  | GradingRubric.Content
  | Links.Content
  | News.Content
  | RSSReader.Content
  | Syllabus.Content
  | Text.Content
  | Widget.Content;
