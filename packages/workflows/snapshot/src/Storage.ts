import { All, Single } from './Manager.js';

let _snapshotOptions: Single.SnapshotOptions = {
  bulletinBoard: true,
  topics: true,
  assignments: true,
  gradebook: true,
  studentData: true,
  payload: {
    format: 'json',
    active: true,
    future: true,
    expired: true
  }
};

let _allOptions: All.AllOptions = {
  association: undefined,
  termsOffered: undefined,
  year: `${new Date().getFullYear()} - ${new Date().getFullYear() + 1}`,
  groupsPath: undefined
};
if (new Date().getMonth() <= 6) {
  allOptions.year = `${new Date().getFullYear() - 1} - ${new Date().getFullYear()}`;
}

let _url: string | URL | undefined = undefined;

let _all = false;
let _fromDate = new Date().toLocaleDateString('en-US');
let _contextLabelId = 2;

export function snapshotOptions(value?: Single.SnapshotOptions) {
  if (value) {
    _snapshotOptions = value;
  }
  return _snapshotOptions;
}

export function allOptions(value?: All.AllOptions) {
  if (value) {
    _allOptions = value;
  }
  return _allOptions;
}

export function url(value?: string | URL) {
  if (value) {
    _url = value;
  }
  return _url;
}

export function all(value?: boolean) {
  if (value !== undefined) {
    _all = value;
  }
  return _all;
}

export function fromDate(value?: string) {
  if (value) {
    _fromDate = value;
  }
  return _fromDate;
}

export function contextLabelId(value?: number) {
  if (value !== undefined) {
    _contextLabelId = value;
  }
  return _contextLabelId;
}
