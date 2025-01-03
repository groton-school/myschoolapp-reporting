import {
  JSONObject,
  JSONPrimitiveTypes,
  JSONValue
} from '@battis/typescript-tricks';

export type Response = JSONValue;

/*
 * TODO Redefine Endpoint to avoid Payload ambiguity
 *   Needs separate body and searchParams, along with multiple methods at the same endpoint (cf. #63)
 */
export type Method = 'GET' | 'POST' | 'DELETE';

export type Payload = Record<string, JSONPrimitiveTypes> | JSONObject;

export type FetchParams = {
  input: URL | string;
  init: { method: Method; body?: string };
};

// TODO handle DELETE (no Payload) schema as well
export type Prepare<P extends Payload> = (
  payload: P,
  base?: string
) => FetchParams;

export type Fetch<P extends Payload, R extends Response> = (
  payload: P
) => Promise<R>;

export type Module<P extends Payload> = {
  prepare: Prepare<P>;
};

export type RequestParams = {
  path: string;
  base?: URL | string;
  payload: Payload;
  method?: Method;
};

export function preparePath(
  path: URL | string,
  pathParams?: Record<string, JSONPrimitiveTypes>
) {
  let actual = path.toString();
  for (const p in pathParams) {
    actual = actual.replace(
      new RegExp(`(:${p})([^a-z_0-9].*)?$`, 'gi'),
      '' + pathParams[p] + '$2'
    );
  }
  const match = Array.from(actual.matchAll(/:([a-z_0-9]+)/g)).map(
    (group) => group[1]
  );
  if (match.length) {
    throw new Error(
      `No values passed for path parameter${match.length > 1 ? 's' : ''} ${match.join(', ')}`
    );
  }
  return actual;
}

export function prepare(req: RequestParams): FetchParams {
  const { path, base, method = 'GET', payload } = req;
  const input = new URL(path, base);
  let body: string | undefined = undefined;
  switch (method) {
    case 'GET':
      for (const prop in payload) {
        input.searchParams.append(prop, payload[prop]?.toString() || '');
      }
      break;
    case 'POST':
      body = JSON.stringify(payload);
  }
  return {
    input,
    init: { method, body }
  };
}
