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

## Usage:

```bash
  msar pronunciation -h --o=<outputPath> --u=<username> --p=<password> --ignoreErrors --logRequests --pretty --headless --devtools --quit --download --concurrency=<concurrency> --rate=<rate> --logFilePath=<logFilePath> --stdoutLevel=<all|trace|debug|info|warning|error|fatal|off> --fileLevel=<all|trace|debug|info|warning|error|fatal|off> --sso=<sso> --mfa=<mfa> --viewportWidth=<viewportWidth> --viewportHeight=<viewportHeight> --column=<column> --user=<user> instanceURL [pathToSourceCsvFile]
```

## Arguments

#### `-h --help`

Get usage information

#### `--concurrency=<n>`

The number of concurrent threads to run (Default: 1)

#### `--rate=<n>`

The number of server requests allowed per second

### Workflow behavior options

#### `--ignoreErrors`

Continue run even if errors are encountered (Default: true, use --no-ignoreErrors to disable)

#### `--logRequests`

Log fetch requests and responses for analysis and debugging (Default: false)

### Logging options

#### `--logFilePath=<logFilePath>`

Path to log file (optional)

#### `--stdoutLevel=<all|trace|debug|info|warning|error|fatal|off>`

Log level to console stdout (Default: "info")

#### `--fileLevel=<all|trace|debug|info|warning|error|fatal|off>`

Log level to log file if --logFilePath provided (Default: "all")

### Output options

#### `-o<outputPath> --outputPath=<outputPath>`

Path to output directory or file to save command output, will use the value in environment variable OUTPUT_PATH if present

#### `--pretty`

Pretty print output to file (if --outputPath option is used)

### Puppeteer options

#### `--headless`

Run Puppeteer's Chrome instance headless (Default: false)

#### `--devtools`

Open Chrome DevTools with the window

#### `--quit`

Quit Puppeteer's Chrome instance on successful completion (Default: true, use --no-quit to disable)

#### `-u<username> --username=<username>`

MySchoolApp username

#### `-p<password> --password=<password>`

MySchoolApp password

#### `--sso=<sso>`

MySchoolApp SSO configuration (currently only accepts "entra-id", will use the value in environment variable PUPPETEER_SSO if present)

#### `--mfa=<mfa>`

MySchoolApp MFA configuration (currently only accepts "entra-id", will use the value in environment variable PUPPETEER_MFA if present)

#### `--viewportWidth=<n>`

Default: 0

#### `--viewportHeight=<n>`

Default: 0

### Name pronunciation options

Scan users for name pronunciation recordings. Include the URL of the LMS instance as instanceURL (required) and path to a CSV file of Blackbaud User IDs to analyze as pathToSourceCsvFile (optional if --user is set). Intended to receive a generic UserWorkList.csv export from the LMS as input, outputting the same CSV file to --outputPath with data columns appended.

Due to the number of impersonated clicks necessary for this workflow, running --headless reduces the likelihood of stray user actions interfering with the script.

#### `--column=<column>`

Column label for CSV input (pathToSourceCsvFile) column containing Blackbaud Usesr IDs to scan for name pronunciations. Required if opening a CSV file. (Default: "User ID")

#### `--user=<user>`

A Blackbaud user ID to scan. May be set multiple times to scan multiple individual users. If set, pathToSourceCsvFile path to CSV file is not required. (Default: ) Can be set multiple times

#### `--download`

Download name pronunciation recordings (Default: true, use --no-download to disable)
