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
  msar schoolWebsite -h --o=<outputPath> --u=<username> --p=<password> --ignoreErrors --logRequests --commands --silent --logging --pretty --headless --devtools --quit --announcements --audio --news --photoAlbums --videos --concurrency=<concurrency> --rate=<rate> --logFilePath=<logFilePath> --stdoutLevel=<all|trace|debug|info|warning|error|fatal|off> --fileLevel=<all|trace|debug|info|warning|error|fatal|off> --opAccount=<example.1password.com> --opItem=<1Password unique identifier> --opToken=<token value> --serviceAccountToken=<token value> --sso=<sso> --mfa=<mfa> --viewportWidth=<viewportWidth> --viewportHeight=<viewportHeight> --skyClientId=<skyClientId> --skyClientSecret=<skyClientSecret> --skyRedirectUri=<"https://localhost:3000/redirect"> --subscriptionKey=<subscriptionKey> --url=<https://example.myschoolapp.com> [...]
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

#### `--commands`

Include shell commands in log (Default: true, use --no-commands to disable)

#### `--silent`

Hide command output (Default: false)

#### `--logging`

Log commands and output at level debug (Default: true, use --no-logging to disable)

### 1Password environment integration

Store 1Password secret references in your environment, rather than the actual secrets.

If 1Password secret references are stored in the environment, a 1Password service account token is required to access the secret values, which will be loaded into process.env. The service account token can be passed directly as the --opToken argument (e.g. example --opToken "$(op item get myToken)") or, if the 1Password CLI tool is also installed, by simply passing the name or ID of the API Credential in your 1Password vault that holds the service account token (e.g. example --opItem myToken). If you are signed into multiple 1Password account, use the --opAccount argument to specify the account containing the token.

https://developer.1password.com/docs/cli

#### `--opAccount=<example.1password.com>`

1Password account to use (if signed into multiple); will use environment variable OP_ACCOUNT if present

#### `--opItem=<1Password unique identifier>`

Name or ID of the 1Password API Credential item storing the 1Password service account token; will use environment variable OP_ITEM if present

#### `--opToken=<token value>`

1Password service account token; will use environment variable OP_TOKEN if present

#### `--serviceAccountToken=<token value>`

1Password service account token (deprecated, use --opToken)

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
