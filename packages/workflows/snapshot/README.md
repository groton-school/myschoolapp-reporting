# @msar/snapshot

A component of [msar](https://www.npmjs.com/package/msar): Capture JSON snapshots of LMS course data

![NPM Version](https://img.shields.io/npm/v/@msar/snapshot)

## Install

This workflow is a subcommand of the [msar](https://www.npmjs.com/package/msar) tool, which can be installed using `npm` (or your preferred equivalent):

```bash
npm install -g msar
```

It depends on [Node.js](https://nodejs.org/) which provides the `npm` package manager tool when installed.

## Usage:

```bash
  msar snapshot -hbtagA --u=<username> --p=<password> --o=<outputPath> --ignoreErrors --logRequests --commands --silent --headless --devtools --quit --pretty --active --future --expired --studentData --metadata --concurrency=<concurrency> --rate=<rate> --logFilePath=<logFilePath> --stdoutLevel=<stdoutLevel> --fileLevel=<fileLevel> --opAccount=<example.1password.com> --opItem=<1Password unique identifier> --opToken=<token value> --serviceAccountToken=<token value> --sso=<sso> --mfa=<mfa> --viewportWidth=<viewportWidth> --viewportHeight=<viewportHeight> --clientId=<clientId> --clientSecret=<clientSecret> --redirectUri=<"http://localhost:XXXX/path/to/redirect"> --subscriptionKey=<subscriptionKey> --fromDate=<fromDate> --toDate=<toDate> --association=<"Activities", "Advisories", "Classes", "Community Groups", "Dorms", and "Teams"> --termsOffered=<termsOffered> --groupsPath=<groupsPath> --year=<year> --csv=<csv> --resume=<resume> url
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

#### `--stdoutLevel=<stdoutLevel>`

Log level to console stdout: "all", "trace", "debug", "info", "warning", "error", "fatal", or "off" (Default: "info")

#### `--fileLevel=<fileLevel>`

Log level to log file (if --logFilePath provided): "all", "trace", "debug", "info", "warning", "error", "fatal", or "off" (Default: "all")

#### `--commands`

Include shell commands in log (Default: true, use --no-commands to disable)

#### `--silent`

Hide command output (Default: false)

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

### Output options

#### `-o<outputPath> --outputPath=<outputPath>`

Path to output directory or file to save command output (default: /Users/sbattis/Documents/GitHub/myschoolapp-reporting/:Snapshot.json, where :Snapshot is either the name of the course in ":Year - :Teacher - :CourseTitle - :SectionId" format for a single section or group or "snapshot" if the --all flag is set. .:Snapshot.metadata.json is also output, recording the parameters of the snapshot command. Will use the value in environment variable OUTPUT_PATH if present)

#### `--pretty`

Pretty print output to file (if --outputPath option is used)

### Sky API options

#### `--clientId=<clientId>`

OAuth 2.0 client ID (defaults to environment variable SKY_CLIENT_ID)

#### `--clientSecret=<clientSecret>`

OAuth 2.0 client secret (defaults to environment variable SKY_CLIENT_SECRET

#### `--redirectUri=<"http://localhost:XXXX/path/to/redirect">`

OAuth 2.0 redirect URI (must be to host localhost, defaults to environment variables SKY_REDIRECT_URI)

#### `--subscriptionKey=<subscriptionKey>`

Blackbaud subscription access key; will use environment variable SKY_SUBSCRIPTION_KEY if present

### Snapshot options

Capture a JSON snapshot of an individual course. In addition to relevant flags and options, the only argument expected is a url to a page within the target course.

#### `--active`

Show currently active items (Default: true, use --no-active to disable)

#### `--future`

Show future items (Default: true, use --no-future to disable)

#### `--expired`

Show expired items (Default: true, use --no-expired to disable)

#### `-b --bulletinBoard`

Include the course Bulletin Board in the snapshot (Default: true, use --no-bulletinBoard to disable)

#### `-t --topics`

Include the course Topics in the snapshot (Default: true, use --no-topics to disable)

#### `-a --assignments`

Include the course Assignments in the snapshot (Default: true, use --no-assignments to disable)

#### `-g --gradebook`

Include the course Gradebook in the snapshot (Default: true, use --no-gradebook to disable)

#### `--studentData`

Include student data in the course snapshot (Default: true, use --no-studentData to disable)

#### `--metadata`

Include additional .:Snapshot.metadata.json recording the parameters of the snapshot command. (Default: true, use --no-metadata to disable)

#### `-A --all`

Capture all sections; positional argument url is used to identify MySchoolApp instance (Default: false)

#### `--fromDate=<fromDate>`

Starting date for date-based filter where relevant (Default: "12/27/2025")

#### `--toDate=<toDate>`

ending date for data-based filter where relevant

#### `--association=<"Activities", "Advisories", "Classes", "Community Groups", "Dorms", and "Teams">`

Comma-separated list of group associations to include if --all flag is used.

#### `--termsOffered=<termsOffered>`

Comma-separated list of terms to include if --all flag is used

#### `--groupsPath=<groupsPath>`

Path to output directory or file to save filtered groups listing (include placeholder "%TIMESTAMP%" to specify its location, otherwise it is added automatically when needed to avoid overwriting existing files)

#### `--year=<year>`

If --all flag is used, which year to download (Default: "2025 - 2026")

#### `--csv=<csv>`

Path to CSV file of group IDs to snapshot (must contain a column named GroupId)

#### `--resume=<resume>`

If --all flag is used,UUID name of temp directory (/tmp/msar/snapshot/:uuid) for which to resume collecting snapshots
