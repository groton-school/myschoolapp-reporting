# @msar/archive

A component of [msar](https://www.npmjs.com/package/msar): Create a local archive from a [@msar/snapshot](https://www.npmjs.com/package/@msar/snapshot)

![NPM Version](https://img.shields.io/npm/v/@msar/archive)

## Usage:

```bash
  msar archive -h --o=<outputPath> --u=<username> --p=<password> --ignoreErrors --logRequests --pretty --headless --devtools --quit --retry --serviceAccountToken=<serviceAccountToken> --logFilePath=<logFilePath> --stdoutLevel=<stdoutLevel> --fileLevel=<fileLevel> --concurrency=<concurrency> --rate=<rate> --sso=<sso> --mfa=<mfa> --viewportWidth=<viewportWidth> --viewportHeight=<viewportHeight> --include=<include> --exclude=<exclude> snapshotPath
```

## Arguments

#### `-h --help`

Get usage information

### 1Password integration

#### `--serviceAccountToken=<serviceAccountToken>`

1Password service account token (defaults to OP_SERVICE_ACCOUNT_TOKEN} environment variable, if present)

### Logging options

#### `--logFilePath=<logFilePath>`

Path to log file (optional)

#### `--stdoutLevel=<stdoutLevel>`

Log level to console stdout: "all", "trace", "debug", "info", "warning", "error", "fatal", or "off" (default: "info")

#### `--fileLevel=<fileLevel>`

Log level to log file (if --logFilePath provided): "all", "trace", "debug", "info", "warning", "error", "fatal", or "off" (default: "all")

### Workflow behavior options

#### `--ignoreErrors`

Continue run even if errors are encountered (default: true, use --no-ignoreErrors to halt on errors)

#### `--logRequests`

Log fetch requests and responses for analysis and debugging (default: false)

#### `--concurrency=<n>`

The number of concurrent threads to run (default 1)

#### `--rate=<n>`

The number of server requests allowed per second

### Output options

#### `-o<outputPath> --outputPath=<outputPath>`

Path to output directory or file to save command output (default: "/Users/sbattis/Documents/GitHub/myschoolapp-reporting", will use the value in environment variable OUTPUT_PATH if present)

#### `--pretty`

Pretty print output to file (if --outputPath option is used)

### Puppeteer options

#### `--headless`

Run Puppeteer's Chrome instance headless (default: false)

#### `--devtools`

Open Chrome DevTools with the window

#### `--quit`

Quit Puppeteer's Chrome instance on successful completion (default: true, --no-quit to leave Puppeteer's Chrome instance open)

#### `-u<username> --username=<username>`

MySchoolApp username

#### `-p<password> --password=<password>`

MySchoolApp password

#### `--sso=<sso>`

MySchoolApp SSO configuration (currently only accepts "entra-id", will use the value in environment variable PUPPETEER_SSO if present)

#### `--mfa=<mfa>`

MySchoolApp MFA configuration (currently only accepts "entra-id", will use the value in environment variable PUPPETEER_MFA if present)

#### `--viewportWidth=<n>`

#### `--viewportHeight=<n>`

### Archive options

Download the supporting files for an existing snapshot JSON file.. This command requires a path to an existing snapshot file (snapshotPath).

#### `--retry`

Retry a previously started archive process. snapshotPath must be the path to an existing archive index.json file.

#### `--include=<include>`

Comma-separated list of regular expressions to match URLs to be included in download (e.g. "^\\/,example\\.com", default: "^\\/.*" to include only URLs that are paths on the LMS's servers)

#### `--exclude=<exclude>`

Comma-separated list of regular expressions to match URLs to exclude from download (e.g. "example\\.com,foo\\..+\\.com", default: "^https?:)
