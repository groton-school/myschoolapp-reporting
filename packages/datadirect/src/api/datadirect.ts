export * as AssignmentMarkingPeriods from './datadirect/AssignmentMarkingPeriods.js';
export * as AssignmentSectionsForTeacher from './datadirect/AssignmentSectionsForTeacher.js';
export * as BulletinBoardContentGet from './datadirect/BulletinBoardContentGet.js';
export * as common from './datadirect/common.js';
export * as ContentItem from './datadirect/common/ContentItem.js';
export * as ContentType from './datadirect/common/ContentType.js';
export * as GetValidFileTypes from './datadirect/GetValidFileTypes.js';
export * as GradeBookMarkingPeriodList from './datadirect/GradeBookMarkingPeriodList.js';
export * as groupFinderByYear from './datadirect/groupFinderByYear.js';
export * as GroupPossibleContentGet from './datadirect/GroupPossibleContentGet.js';
export * as ImportAssignmentsGet from './datadirect/ImportAssignmentsGet.js';
export * as SectionInfoView from './datadirect/SectionInfoView.js';
export * as sectionrosterget from './datadirect/sectionrosterget.js';
export * as sectiontopicsget from './datadirect/sectiontopicsget.js';
export * as topiccontentget from './datadirect/topiccontentget.js';
export * as TopicContentTypesGet from './datadirect/TopicContentTypesGet.js';

import { Response as BulletinBoardContent } from './datadirect/BulletinBoardContentGet.js';
import { Item as MarkingPeriod } from './datadirect/GradeBookMarkingPeriodList.js';
import { Item as Group } from './datadirect/groupFinderByYear/Response.js';
import { Item as SectionInfo } from './datadirect/SectionInfoView/Response.js';
import { Item as SectionTopic } from './datadirect/sectiontopicsget/Response.js';
import { Item as ObjectType } from './datadirect/topiccontentget/Response.js';
import { Response as Gradebook } from './gradebook/hydrategradebook.js';

export {
  /** @deprecated use BulletinBoardContentGet.Response */
  BulletinBoardContent,
  /** @deprecated use api.gradebook.hydrategradebook.Response */
  Gradebook,
  /** @deprecated use groupFinderByYear.Item */
  Group,

  /** @deprecated use GradeBookMarkingPeriodList.Item */
  MarkingPeriod,
  /** @deprecated use topiccontentget.Item */
  ObjectType,
  /** @deprecated use SectionInfoView.Item */
  SectionInfo,

  /** @deprecated use sectiontopicsget.Item */
  SectionTopic
};
