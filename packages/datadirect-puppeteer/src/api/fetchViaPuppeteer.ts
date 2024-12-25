import { Endpoint } from 'datadirect/dist/api.js';
import { Page } from 'puppeteer';

export function fetchViaPuppeteer<
  P extends Endpoint.Payload,
  R extends Endpoint.Response
>(module: Endpoint.Module<P>) {
  return async (
    page: Page,
    payload: P,
    pathParams: Record<string, string | number | boolean> = {}
  ) => {
    const { input, init } = module.prepare(payload, page.url());
    return await page.evaluate(
      async (params) => {
        const { input, init } = params;
        return (await (await fetch(input, init)).json()) as R;
      },
      { input: Endpoint.preparePath(input, pathParams), init }
    );
  };
}
