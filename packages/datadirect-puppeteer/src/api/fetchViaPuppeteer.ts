import { Endpoint } from 'datadirect/dist/api.js';
import { Page } from 'puppeteer';

type FetchError = {
  error: unknown;
  response: Response;
  body: string;
} & Endpoint.FetchParams;

function isFetchError(e: unknown): e is FetchError {
  return e != null && typeof e === 'object' && 'error' in e && 'body' in e;
}

export function fetchViaPuppeteer<
  P extends Endpoint.Payload,
  R extends Endpoint.Response
>(module: Endpoint.Module<P>) {
  return async (
    page: Page,
    payload: P,
    pathParams: Record<string, string | number | boolean> = {},
    logBodyOnError = false
  ) => {
    const { input, init } = module.prepare(payload, page.url());
    const result: R | FetchError = await page.evaluate(
      async (params) => {
        const { input, init } = params;
        let body: R | undefined | string = undefined;
        let response: Response | undefined = undefined;
        try {
          response = await fetch(input, init);
          body = await response.text();
          return JSON.parse(body) as R;
        } catch (error) {
          return {
            error,
            input,
            init,
            response: {
              url: response?.url,
              redirected: response?.redirected,
              type: response?.type,
              status: response?.status,
              statusText: response?.statusText,
              headers: response?.headers
            },
            body
          } as FetchError;
        }
      },
      { input: Endpoint.preparePath(input, pathParams), init }
    );
    if (isFetchError(result)) {
      const { error, body, ...rest } = result;
      if (logBodyOnError) {
        console.error(rest);
        console.error(body);
      }
      throw error;
    }
    return result;
  };
}
