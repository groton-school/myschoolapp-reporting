export * as AssignmentMarkingPeriods from './AssignmentMarkingPeriods/index.js';
export * as AssignmentSectionsForTeacher from './AssignmentSectionsForTeacher/index.js';
export * as BulletinBoardContentGet from './BulletinBoardContentGet/index.js';
export * as ContentItem from './common/ContentItem/index.js';
export * as ContentType from './common/ContentType.js';
export * as common from './common/index.js';
export * as GetValidFileTypes from './GetValidFileTypes/index.js';
export * as GradeBookMarkingPeriodList from './GradeBookMarkingPeriodList/index.js';
export * as groupFinderByYear from './groupFinderByYear/index.js';
export * as GroupPossibleContentGet from './GroupPossibleContentGet/index.js';
export * as ImportAssignmentsGet from './ImportAssignmentsGet/index.js';
export * as SectionInfoView from './SectionInfoView/index.js';
export * as sectionrosterget from './sectionrosterget/index.js';
export * as sectiontopicsget from './sectiontopicsget/index.js';
export * as topiccontentget from './topiccontentget/index.js';
export * as TopicContentTypesGet from './TopicContentTypesGet/index.js';
export * as topicget from './topicget/index.js';

import { Response as Gradebook } from '../gradebook/hydrategradebook/index.js';
import { Response as BulletinBoardContent } from './BulletinBoardContentGet/index.js';
import { Item as MarkingPeriod } from './GradeBookMarkingPeriodList/index.js';
import { Item as Group } from './groupFinderByYear/Response.js';
import { Item as SectionInfo } from './SectionInfoView/Response.js';
import { Item as SectionTopic } from './sectiontopicsget/Response.js';
import { Item as ObjectType } from './topiccontentget/Response.js';

export {
  /** @deprecated Use BulletinBoardContentGet.Response */
  BulletinBoardContent,
  /** @deprecated Use api.gradebook.hydrategradebook.Response */
  Gradebook,
  /** @deprecated Use groupFinderByYear.Item */
  Group,

  /** @deprecated Use GradeBookMarkingPeriodList.Item */
  MarkingPeriod,
  /** @deprecated Use topiccontentget.Item */
  ObjectType,
  /** @deprecated Use SectionInfoView.Item */
  SectionInfo,

  /** @deprecated Use sectiontopicsget.Item */
  SectionTopic
};
