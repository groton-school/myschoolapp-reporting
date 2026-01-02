# @msar/inbox

A component of [msar](https://www.npmjs.com/package/msar): Analyze the message inbox data

![NPM Version](https://img.shields.io/npm/v/@msar/inbox)

Analyze inbox contents for a user or users. Include the URL of the LMS instance as url (required) and path to a CSV file of user identifiers to analyze as csv (optional if `--val` is set). Intended to receive a generic `UserWorkList.csv` export from the LMS as input, outputting the same CSV file to `--outputPath` with analysis columns appended.

## Install

This workflow is a subcommand of the [msar](https://www.npmjs.com/package/msar) tool, which can be installed using `npm` (or your preferred equivalent):

```bash
npm install -g msar
```

It depends on [Node.js](https://nodejs.org/) which provides the `npm` package manager tool when installed.
