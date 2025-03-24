import { JSONArray, JSONObject, JSONValue } from '@battis/typescript-tricks';

export const DEFAULT_ID_KEYS = [
  'Id',
  'id',
  'assigment_id',
  'assignment_index_id',
  'AssignmentId',
  'AssignmentIndexId',
  'index_id',
  'DownloadId',
  'LinkId'
];

export const DEFAULT_ERROR_KEYS = ['Error', 'error', 'errors'];

function isJSONObject(value: JSONValue): value is JSONObject {
  return value !== undefined && value !== null && typeof value === 'object';
}

function isError(value: JSONValue, errors = DEFAULT_ERROR_KEYS) {
  if (isJSONObject(value)) {
    for (const error of errors) {
      if (Object.getOwnPropertyNames(value).includes(error)) {
        return true;
      }
    }
  }
  return false;
}

function matchByIdentifier(a: JSONValue, b: JSONValue, identifier: string) {
  return (
    isJSONObject(a) &&
    isJSONObject(b) &&
    Object.getOwnPropertyNames(a).includes(identifier) &&
    Object.getOwnPropertyNames(b).includes(identifier) &&
    a[identifier] == b[identifier] &&
    a[identifier] !== 0
  );
}

function findMatchingArrayElement(
  eltA: JSONObject,
  b: JSONArray,
  identifiers = DEFAULT_ID_KEYS
) {
  let eltB = undefined;
  for (const identifier of identifiers) {
    if (!eltB) {
      eltB = b.find((eltB) => matchByIdentifier(eltA, eltB, identifier));
    }
  }
  return eltB;
}

export function unmatchedProperties<T extends JSONObject = JSONObject>(
  a: T,
  b: T
) {
  const result: JSONObject = {};
  if (isJSONObject(a) && isJSONObject(b)) {
    for (const prop of Object.getOwnPropertyNames(a)) {
      if (!Object.getOwnPropertyNames(b).includes(prop)) {
        result[prop] = a[prop];
      }
    }
    return result;
  } else {
    return a;
  }
}

/**
 * @param identifiers list of property identifiers to attempt to match objects by (default: `DEFAULT_ID_KEYS`)
 * @param errors list of property identifiers that indicate an object is an error (default: `DEFAULT_ERROR_KEYS`)
 */
export function merge<T extends JSONValue = JSONValue>(
  a: T,
  b: T,
  identifiers = DEFAULT_ID_KEYS,
  errors = DEFAULT_ERROR_KEYS
): T {
  if (a === undefined || a === null) {
    console.log({ a, b, result: 'b (a undefined)' });
    return b;
  }
  if (b === undefined || b === null) {
    console.log({ a, b, result: 'a (b undefined)' });
    return a;
  }
  if (isError(a, errors)) {
    console.log({ a, b, result: 'b (a error)' });
    return b;
  }
  if (isJSONObject(a) && typeof b === 'string') {
    console.log({ a, b, result: 'a (b string, a object)' });
    return a;
  }
  if (Array.isArray(a) && Array.isArray(b)) {
    const result = [];
    for (const eltA of a) {
      if (!findMatchingArrayElement(eltA, b, identifiers)) {
        result.push(eltA);
      }
    }
    for (const eltB of b) {
      const eltA = findMatchingArrayElement(eltB, a, identifiers);
      if (eltA) {
        result.push(merge(eltA, eltB, identifiers, errors));
      } else {
        result.push(eltB);
      }
    }
    console.log({ a, b, result });
    return result as T;
  }
  if (isJSONObject(a) && isJSONObject(b)) {
    const result: JSONObject = { ...unmatchedProperties(a, b) };
    for (const prop of Object.getOwnPropertyNames(b)) {
      if (Object.getOwnPropertyNames(a).includes(prop)) {
        result[prop] = merge(a[prop], b[prop]);
      } else {
        result[prop] = b[prop];
      }
    }
    console.log({ a, b, result });
    return result as T;
  }
  if (isJSONObject(a) && isError(b)) {
    console.log({ a, b, result: 'b (a is error)' });
    return b;
  }
  if (isJSONObject(b) && isError(a)) {
    console.log({ a, b, result: 'a (b is error)' });
    return a;
  }

  console.log({ a, b, result: 'whichever is truthier' });
  return b || a;
}
