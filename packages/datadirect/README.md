# datadirect

![NPM Version](https://img.shields.io/npm/v/datadirect)

Types for working with Blackbaud's front-end APIs

An idiosyncratic collection of TypeScript types for the front-end APIs of Blackbaud's LMS. This functionally serves as my notes for scripting interactions with the LMS.

## Install

```sh
npm install datadirect
```

## Usage

```ts
import { api } from 'datadirect';

const payload: api.datadirect.groupFinderByYear.Payload = {
  schoolYearLabel: '2024 - 2025'
};
const { input, init } = api.datadirect.groupFinderByYear.prepare(payload);
const response: api.datadirect.groupFinderByYear.Response = await fetch(
  input,
  init
);
```

Each endpoint has a `Payload` and a `Response` type, as well as a method to `prepare()` the `fetch()` parameters. Given that the endpoint needs to be called with suitable authentication (e.g. with authorized session cookies), these are not immediately actionable. [`datadirect-puppeteer`](../datadirect-puppeteer) tackles one approach to this, by assuming an authenticated browser session in a Puppeteer-controlled browser, through which the fetch requests can be passed.

In the case of endpoints that include path parameters, some additional preparation is required.

```ts
const payload: api.datadirect.sectiontopicsget.Payload = {
  format: 'json';
  active: true;
  future: false;
  expired: false;
  sharedTopics: true;
}
let {input, init} = api.datadirect.sectiontopicsget.prepare(payload);
input = api.Endpoint.preparePath(input, {Id: 12345678})
// ...
```

## Known Issues

- There are a fair number of as-yet undocumented [typing issues](https://github.com/battis/myschoolapp-reporting/issues?q=is%3Aissue%20state%3Aopen%20label%3Adatadirect%20label%3Atypes) that don't prevent compilation and execution, but it would be _better_ if they were resolved.
- Actual error-generating issues are tagged [bug](https://github.com/battis/myschoolapp-reporting/issues?q=is%3Aissue%20state%3Aopen%20label%3Adatadirect%20label%3Abug).
- All [other issues](https://github.com/battis/myschoolapp-reporting/issues?q=is%3Aissue%20state%3Aopen%20label%3Adatadirect%20-label%3Abug%20%20-label%3Atypes) are improvements and questions.

## Notes

- Capitalization is "as-found" in the Blackbaud LMS, without corrections. Where multiple sources differ, I have tended towards what seems to be the most common approach.
- Payloads for `GET` and `POST` requests are treated identically (at the moment), with the `prepare()` method determining the proper encoding and REST method to use for each endpoint. Should I encounter a situation where that doesn't work, things will change.
- There are no types for path parameters right now, but aspirationally there will be soon!
