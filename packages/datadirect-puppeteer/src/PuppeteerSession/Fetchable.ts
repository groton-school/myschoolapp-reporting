import { Endpoint } from 'datadirect';
import { Authenticated } from './Authenticated.js';

type EndpointOptions<P extends Endpoint.Payload> = {
  payload: P;
  pathParams?: Record<string, string | number | boolean>;
  logBodyOnError?: boolean;
};

export type BoundEndpoint<
  P extends Endpoint.Payload,
  R extends Endpoint.Response
> = (options: EndpointOptions<P>) => Promise<R>;

type FetchError = {
  error: Error;
  response: Response;
  body: string;
} & Endpoint.FetchParams;

function isFetchError(e: unknown): e is FetchError {
  return e != null && typeof e === 'object' && 'error' in e && 'body' in e;
}

export class Fetchable extends Authenticated {
  protected bindEndpoint<
    P extends Endpoint.Payload,
    R extends Endpoint.Response
  >(module: Endpoint.Module<P>): BoundEndpoint<P, R> {
    return async ({
      payload,
      pathParams = {},
      logBodyOnError = false
    }: EndpointOptions<P>) => {
      const { input, init } = module.prepare(payload, this.page.url());
      const result: R | FetchError = await this.page.evaluate(
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
              error: error as Error,
              input,
              init,
              // TODO There has got to be some type magic that makes this manual copying unnecessary
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
}
