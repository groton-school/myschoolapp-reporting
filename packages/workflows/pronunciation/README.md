# @msar/pronunciation

A component of [msar](https://www.npmjs.com/package/msar): Capture name pronunciation recordings

![NPM Version](https://img.shields.io/npm/v/@msar/pronunciation)

## Usage:

```bash
  msar pronunciation -h --o=<outputPath> --u=<username> --p=<password> --ignoreErrors --logRequests --pretty --headless --devtools --quit --download --concurrency=<concurrency> --rate=<rate> --logFilePath=<logFilePath> --stdoutLevel=<stdoutLevel> --fileLevel=<fileLevel> --serviceAccountToken=<serviceAccountToken> --sso=<sso> --mfa=<mfa> --viewportWidth=<viewportWidth> --viewportHeight=<viewportHeight> --column=<column> --user=<user> instanceURL [pathToSourceCsvFile]
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

### Name pronunciation options

Scan users for name pronunciation recordings. Include the URL of the LMS instance as instanceURL (required) and path to a CSV file of Blackbaud User IDs to analyze as pathToSourceCsvFile (optional if --user is set). Intended to receive a generic UserWorkList.csv export from the LMS as input, outputting the same CSV file to --outputPath with data columns appended.

Due to the number of impersonated clicks necessary for this workflow, running --headless reduces the likelihood of stray user actions interfering with the script.

#### `--column=<column>`

Column label for CSV input (pathToSourceCsvFile) column containing Blackbaud Usesr IDs to scan for name pronunciations. Required if opening a CSV file. (Default: "User ID")

#### `--user=<user>`

A Blackbaud user ID to scan. May be set multiple times to scan multiple individual users. If set, pathToSourceCsvFile path to CSV file is not required. (Default: ) Can be set multiple times

#### `--download`

Download name pronunciation recordings (Default: true, use --no-download to disable)
