# datadirect-puppeteer

![NPM Version](https://img.shields.io/npm/v/datadirect-puppeteer)

An implementation of scraping Blackbaud's front-end APIs using Puppeteer

## Install

```sh
npm install datadirect-puppeteer datadirect puppeteer
```

Realistically, you'll want access to the `datadirect` types and will need to configure `puppeteer`, so they are peer dependencies.

## Usage

```ts
import { api } from 'datadirect-puppeteer';
import { api as types } from 'datadirect';
import { Page } from 'puppeteer';

let page: Page;
// create an authorized Blackbaud LMS web session (https://example.myschoolapp.com) that page refers to

// optional to explicitly type `groups`, as the `datadirect-puppeteer` method maps types correctly!
const groups: types.datadirect.groupFinderByYear.Response = await api.datadirect.groupFinderByYear(page, {
  schoolYearLabel: '2024 - 2025'
});
const topics = await api.datadirect.sectiontopicsget(page, {
    format: 'json';
    active: true;
    future: false;
    expired: false;
    sharedTopics: true;
  }, { Id: 12345678 });
```
