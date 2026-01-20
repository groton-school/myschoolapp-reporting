# @msar/school-website

A component of [msar](https://www.npmjs.com/package/msar): Archive content from the School Website

![NPM Version](https://img.shields.io/npm/v/@msar/school-website)

Archive content from the School Website. Output is organized as named JSON index files for each downloaded content type, with the files themselves stored in the same directory mirroring the CDN paths. Relative file paths to content are inserted into the index files alongside the original URLs.

## Install

This workflow is a subcommand of the [msar](https://www.npmjs.com/package/msar) tool, which can be installed using `npm` (or your preferred equivalent):

```bash
npm install -g msar
```

It depends on [Node.js](https://nodejs.org/) which provides the `npm` package manager tool when installed.

## Usage:

```bash
  msar schoolWebsite -h --o=<outputPath> --u=<username> --p=<password> --ignoreErrors --logRequests --pretty --headless --devtools --quit --announcements --audio --news --photoAlbums --videos --concurrency=<concurrency> --rate=<rate> --logFilePath=<logFilePath> --stdoutLevel=<all|trace|debug|info|warning|error|fatal|off> --fileLevel=<all|trace|debug|info|warning|error|fatal|off> --sso=<sso> --mfa=<mfa> --viewportWidth=<viewportWidth> --viewportHeight=<viewportHeight> --skyClientId=<skyClientId> --skyClientSecret=<skyClientSecret> --skyScope=<skyScope> --skyRedirectUri=<"https://localhost:3000/redirect"> --subscriptionKey=<subscriptionKey> --url=<https://example.myschoolapp.com> [...]
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

### Sky API options

#### `--skyClientId=<skyClientId>`

OAuth 2.0 client ID. Defaults to environment variable SKY_CLIENT_ID, if present.

#### `--skyClientSecret=<skyClientSecret>`

OAuth 2.0 client secret. Defaults to environment variable SKY_CLIENT_SECRET, if present.

#### `--skyScope=<skyScope>`

OAuth 2.0 scope. Defaults to environment variable SKY_SCOPE, if present.

#### `--skyRedirectUri=<"https://localhost:3000/redirect">`

OAuth 2.0 redirect URI, must be to host localhost. Defaults to environment variable SKY_REDIRECT_URI, if present.

#### `--subscriptionKey=<subscriptionKey>`

Blackbaud subscription access key; will use environment variable SKY_SUBSCRIPTION_KEY if present

### School Website options

Archive content from the School Website. Output is organized as named JSON index files for each downloaded content type, with the files themselves stored in the same directory mirroring the CDN paths. Relative file paths to content are inserted into the index files alongside the original URLs.

#### `--url=<https://example.myschoolapp.com>`

URL of MySchoolApp instance (required if capturing --audio or --videos})

#### `--announcements`

Download announcements (Default: true, use --no-announcements to disable)

#### `--audio`

Download audio items, requires --url) (Default: true, use --no-audio to disable)

#### `--news`

Download news items (Default: true, use --no-news to disable)

#### `--photoAlbums`

Download photo albums (Default: true, use --no-photoAlbums to disable)

#### `--videos`

Download videos, requires --url) (Default: true, use --no-videos to disable)
