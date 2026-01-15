import { SkyAPIPlugin } from './SkyAPI.js';

export * from './SkyAPI.js';

const sky = new SkyAPIPlugin();

export const name = sky.name;
export const configure = sky.configure.bind(sky);
export const options = sky.options.bind(sky);
export const init = sky.init.bind(sky);

export const getToken: typeof sky.getToken = sky.getToken.bind(sky);
export const getClient: typeof sky.getClient = sky.getClient.bind(sky);

export const request: typeof sky.request = sky.request.bind(sky);
export const requestJSON: typeof sky.requestJSON = sky.requestJSON.bind(sky);
export const fetch: typeof sky.fetch = sky.fetch.bind(sky);
export const fetchJSON: typeof sky.fetchJSON = sky.fetchJSON.bind(sky);
