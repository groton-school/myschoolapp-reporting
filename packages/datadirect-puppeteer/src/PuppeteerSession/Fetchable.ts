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

export class Fetchable extends Authenticated {
  protected bindEndpoint<
    P extends Endpoint.Payload,
    R extends Endpoint.Response
  >(module: Endpoint.Module<P>): BoundEndpoint<P, R> {
    return async ({ payload, pathParams = {} }: EndpointOptions<P>) => {
      const { input, init } = module.prepare(payload, this.page.url());
      return (await this.fetch(Endpoint.preparePath(input, pathParams), init))
        .body as R;
    };
  }
}
