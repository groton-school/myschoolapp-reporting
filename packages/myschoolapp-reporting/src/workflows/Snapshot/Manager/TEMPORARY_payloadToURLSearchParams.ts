import { api as types } from 'datadirect';

// FIXME remove TEMPORARY_payloadToURLSearchParams
export function TEMPORARY_payloadToURLSearchParams(
  payload: types.datadirect.common.ContentItem.Payload
) {
  const result = new URLSearchParams();
  if (payload) {
    let key: keyof typeof payload;
    for (key in payload) {
      if (payload && payload[key]) {
        result.append(key, payload[key]?.toString() || '');
      }
    }
  }

  return result;
}
