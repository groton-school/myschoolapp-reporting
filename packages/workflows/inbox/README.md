# @msar/inbox

A component of [msar](https://www.npmjs.com/package/msar): Analyze the message inbox data

![NPM Version](https://img.shields.io/npm/v/@msar/inbox)

## Install

This workflow is a subcommand of the [msar](https://www.npmjs.com/package/msar) tool, which can be installed using `npm` (or your preferred equivalent):

```bash
npm install -g msar
```

It depends on [Node.js](https://nodejs.org/) which provides the `npm` package manager tool when installed.

## Usage:

```bash
  msar inbox -h --o=<outputPath> --u=<username> --p=<password> --v=<val> --ignoreErrors --logRequests --pretty --headless --devtools --quit --concurrency=<concurrency> --rate=<rate> --logFilePath=<logFilePath> --stdoutLevel=<stdoutLevel> --fileLevel=<fileLevel> --serviceAccountToken=<serviceAccountToken> --sso=<sso> --mfa=<mfa> --viewportWidth=<viewportWidth> --viewportHeight=<viewportHeight> --column=<column> --searchIn=<searchIn> url csv
```

## Arguments

#### `-h --help`

Get usage information

## `--concurrency=<n>`

The number of concurrent threads to run (Default: 1)

## `--rate=<n>`

The number of server requests allowed per second

### Workflow behavior options

#### `--ignoreErrors`

Continue run even if errors are encountered (Default: true, use --no-ignoreErrors to disable)

#### `--logRequests`

Log fetch requests and responses for analysis and debugging (Default: false)

### Logging options

#### `--logFilePath=<logFilePath>`

Path to log file (optional)

#### `--stdoutLevel=<stdoutLevel>`

Log level to console stdout: "all", "trace", "debug", "info", "warning", "error", "fatal", or "off" (Default: "info")

#### `--fileLevel=<fileLevel>`

Log level to log file (if --logFilePath provided): "all", "trace", "debug", "info", "warning", "error", "fatal", or "off" (Default: "all")

### 1Password integration

#### `--serviceAccountToken=<serviceAccountToken>`

1Password service account token (required if any secret references are present in the environment)

### Output options

#### `-o<outputPath> --outputPath=<outputPath>`

Path to output directory or file to save command output, will use the value in environment variable OUTPUT_PATH if present

#### `--pretty`

Pretty print output to file (if --outputPath option is used)

### Puppeteer options

#### `--headless`

Run Puppeteer's Chrome instance headless (Default: true, use --no-headless to disable)

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

### Inbox options

Analyze inbox contents for a user or users. Include the URL of the LMS instance as url (required) and path to a CSV file of user identifiers to analyze as csv (optional if --val is set). Intended to receive a generic UserWorkList.csv export from the LMS as input, outputting the same CSV file to --outputPath with analysis columns appended.

Due to the number of impersonated clicks necessary for this workflow, running --headless reduces the likelihood of stray user actions interfering with the script.

#### `--column=<column>`

Column label for CSV input (csv) column containing user identifier for inboxes to analyze. Required if opening a CSV of user identifiers. (Default: "User ID")

#### `--searchIn=<searchIn>`

Field to search for user identifier. Required for all uses. One of "LastName", "FirstName", "Email", "MaidenName", "PreferredName", "BusinessName", "UserID", "HostID", "lastname", "firstname", "email", "maidenname", "nickname", "business_name", "pk" or "conversion_string" (Default: "UserID")

#### `-v<val> --val=<val>`

A user identifier to query. Requires corresponding --searchIn. If set, csv path to CSV file is not required. (Default: ) Can be set multiple times
