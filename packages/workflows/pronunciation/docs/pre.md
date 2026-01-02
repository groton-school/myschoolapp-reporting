# @msar/pronunciation

A component of [msar](https://www.npmjs.com/package/msar): Scan users for name pronunciation recordings

![NPM Version](https://img.shields.io/npm/v/@msar/pronunciation)

Scan users for name pronunciation recordings. Include the URL of the LMS instance as `instanceURL` (required) and path to a CSV file of Blackbaud User IDs to analyze as `pathToSourceCsvFile` (optional if `--user` is set). Intended to receive a generic `UserWorkList.csv` export from the LMS as input, outputting the same CSV file to `--outputPath` with data columns appended.

## Install

This workflow is a subcommand of the [msar](https://www.npmjs.com/package/msar) tool, which can be installed using `npm` (or your preferred equivalent):

```bash
npm install -g msar
```

It depends on [Node.js](https://nodejs.org/) which provides the `npm` package manager tool when installed.
