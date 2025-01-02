import { Endpoint } from 'datadirect';
import { Authenticated, Options } from './Authenticated.js';
import { InitializationError } from './InitializationError.js';

type EndpointOptions<P extends Endpoint.Payload> = {
  payload: P;
  pathParams?: Record<string, string | number | boolean>;
  logBodyOnError?: boolean;
};

export type Binding<P extends Endpoint.Payload, R extends Endpoint.Response> = (
  options: EndpointOptions<P>
) => Promise<R>;

let root: Authenticated;

export async function init(url: URL | string, options?: Options) {
  root = await Authenticated.getInstance(url, options);
  return root;
}

export function bind<P extends Endpoint.Payload, R extends Endpoint.Response>(
  module: Endpoint.Module<P>,
  session = root
): Binding<P, R> {
  if (!session) {
    throw new InitializationError('bindEndpoint');
  }
  return async ({ payload, pathParams = {} }: EndpointOptions<P>) => {
    const { input, init } = module.prepare(
      payload,
      (await session.url()).toString()
    );
    return (await session.fetch(Endpoint.preparePath(input, pathParams), init))
      .body as R;
  };
}
