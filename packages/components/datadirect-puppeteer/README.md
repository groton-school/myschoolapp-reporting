# datadirect-puppeteer

![NPM Version](https://img.shields.io/npm/v/@msar%2Fdatadirect-puppeteer)

An implementation of scraping Blackbaud's front-end APIs using Puppeteer

## Install

```sh
npm install @msar/datadirect-puppeteer datadirect puppeteer
```

Realistically, you'll want access to the `datadirect` types and will need to configure `puppeteer`, so they are peer dependencies.

## Usage

```ts
import { api as types } from 'datadirect';
import { api, PuppeteerSession } from '@msar/datadirect-puppeteer';

const session = await PuppeteerSession.Authenticated.getInstance(
  'https://example.myschoolapp.com',
  {
    username: 'admin@example.com',
    password: 's00p3rS3kre7'
  }
);

// optional to explicitly type `groups`, as the `datadirect-puppeteer` method maps types correctly!
const groups: types.datadirect.groupFinderByYear.Response =
  await api.datadirect.groupFinderByYear({
    session,
    payload: {
      schoolYearLabel: '2024 - 2025'
    }
  });

const topics = await api.datadirect.sectiontopicsget({
  session,
  payload: {
    format: 'json',
    active: true,
    future: false,
    expired: false,
    sharedTopics: true
  },
  pathParams: { Id: 12345678 }
});
```

## Headless Impersonation

If you are using a `PuppeteerSession.Impersonation`, I recommend running your script with Puppeteer in headless mode. Empirically, this seems to make it less likely that stray user activity will interfere with the Puppeteer-controlled UI actions necessary to make the impersonation work in the browser.

```ts
import { api, PuppeteerSession } from '@msar/datadirect-puppeteer';
const session = await PuppeteerSession.Impersonation.getInstance(
  'https://example.myschoolapp.com',
  {
    username: 'admin@example.com',
    password: 's00p3rS3kre7',
    headless: true,
    val: '12345678',
    searchIn: 'UserID'
  }
);
const conversations = await api.message.inbox({
  session,
  payload: {
    format: 'json',
    pageNumber: 1,
    toDate: '01/20/2025'
  }
});
```

## Known Issues

Actual error-generating issues are tagged [bug](https://github.com/battis/myschoolapp-reporting/issues?q=is%3Aissue%20state%3Aopen%20label%3Adatadirect-puppeteer%20label%3Abug%20), [all others](https://github.com/battis/myschoolapp-reporting/issues?q=is%3Aissue%20state%3Aopen%20label%3Adatadirect-puppeteer%20label%3Abug%20) are improvements or documentation issues.

```

```
