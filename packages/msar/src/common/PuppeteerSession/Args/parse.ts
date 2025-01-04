import { PuppeteerSession } from 'datadirect-puppeteer';

export type Parsed = {
  puppeteerOptions: PuppeteerSession.PuppeteerOptions;
  credentials: PuppeteerSession.Credentials;
  quit: boolean;
};

export function parse(values: Record<string, string>): Parsed {
  const headless = !!values.headless;
  const width = parseInt(values.viewportWidth);
  const height = parseInt(values.viewportHeight);
  const quit = !!values.quit;
  return {
    puppeteerOptions: {
      headless: !!(headless && values.username && values.password),
      defaultViewport: { width, height }
    },
    credentials: {
      username: values.username,
      password: values.password,
      sso: values.sso
    },
    quit
  };
}
