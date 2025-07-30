import * as common from '../common/index.js';

export type Item = common.ContentItem.Response;

// FIXME topiccontentget seems to return a content item per assignment _in_ the widget, rather than a singular widget
export type Response = Item[];
