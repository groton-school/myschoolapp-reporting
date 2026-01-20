# @msar/archive

A component of [msar](https://www.npmjs.com/package/msar): Create a local archive from a [@msar/snapshot](https://www.npmjs.com/package/@msar/snapshot)

![NPM Version](https://img.shields.io/npm/v/@msar/archive)

## Install

This workflow is a subcommand of the [msar](https://www.npmjs.com/package/msar) tool, which can be installed using `npm` (or your preferred equivalent):

```bash
npm install -g msar
```

It depends on [Node.js](https://nodejs.org/) which provides the `npm` package manager tool when installed.

## Usage:

```bash
  msar archive -h --o=<outputPath> --u=<username> --p=<password> --ignoreErrors --logRequests --pretty --headless --devtools --quit --retry --concurrency=<concurrency> --rate=<rate> --logFilePath=<logFilePath> --stdoutLevel=<all|trace|debug|info|warning|error|fatal|off> --fileLevel=<all|trace|debug|info|warning|error|fatal|off> --sso=<sso> --mfa=<mfa> --viewportWidth=<viewportWidth> --viewportHeight=<viewportHeight> --include=<"^\\/,example\\.com"> --exclude=<"example\\.com,foo\\..+\\.com"> snapshotPath
```

## Arguments

#### `-h --help`

Get usage information

### Workflow behavior options

#### `--ignoreErrors`

Continue run even if errors are encountered (Default: true, use --no-ignoreErrors to disable)

#### `--logRequests`

Log fetch requests and responses for analysis and debugging (Default: false)

#### `--concurrency=<n>`

The number of concurrent threads to run (Default: 1)

#### `--rate=<n>`

The number of server requests allowed per second

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

### Archive options

Download the supporting files for an existing snapshot JSON file. This command requires a path to an existing snapshot file (snapshotPath).

#### `--retry`

Retry a previously started archive process. snapshotPath must be the path to an existing archive index.json file.

#### `--include=<"^\/,example\.com">`

Comma-separated list of regular expressions to match URLs to be included in download (Default: "^\\/.*")

#### `--exclude=<"example\.com,foo\..+\.com">`

Comma-separated list of regular expressions to match URLs to exclude from download (Default: "^https?:")
