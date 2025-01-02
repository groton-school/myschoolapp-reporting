import { Mutex } from 'async-mutex';
import { Endpoint } from 'datadirect';
import { Authenticated, Options } from './Authenticated.js';
import { InitializationError } from './InitializationError.js';

export type EndpointOptions<P extends Endpoint.Payload> = {
  payload: P;
  pathParams?: Record<string, string | number | boolean>;
  logBodyOnError?: boolean;
};

export type Binding<P extends Endpoint.Payload, R extends Endpoint.Response> = (
  options: EndpointOptions<P>
) => Promise<R>;

const initializing = new Mutex();
const ready = await initializing.acquire();
let root: Authenticated;

export async function init(url: URL | string, options?: Options) {
  root = await Authenticated.getInstance(url, options);
  ready();
  return root;
}

export function bind<P extends Endpoint.Payload, R extends Endpoint.Response>(
  module: Endpoint.Module<P>,
  session?: Authenticated
): Binding<P, R> {
  return async ({ payload, pathParams = {} }: EndpointOptions<P>) => {
    session = session || root;
    if (!session) {
      throw new InitializationError('bind requires initialized session');
    }
    const { input, init } = module.prepare(
      payload,
      (await session.url()).toString()
    );
    const url = Endpoint.preparePath(input, pathParams);

    const response = await session.fetch(url, init);
    console.log({ url, init, response });
    return response.body as R;
  };
}
