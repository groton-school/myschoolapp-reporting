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
  msar snapshot -hbtagA --o=<outputPath> --u=<username> --p=<password> --ignoreErrors --logRequests --pretty --headless --devtools --quit --active --future --expired --studentData --metadata --concurrency=<concurrency> --rate=<rate> --logFilePath=<logFilePath> --stdoutLevel=<stdoutLevel> --fileLevel=<fileLevel> --serviceAccountToken=<serviceAccountToken> --sso=<sso> --mfa=<mfa> --viewportWidth=<viewportWidth> --viewportHeight=<viewportHeight> --fromDate=<fromDate> --toDate=<toDate> --clientId=<clientId> --clientSecret=<clientSecret> --redirectUri=<http://localhost:XXXX/path/to/redirect> --subscriptionKey=<subscriptionKey> --association=<association> --termsOffered=<termsOffered> --groupsPath=<groupsPath> --year=<year> --csv=<csv> --resume=<resume> url
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

### 1Password integration

#### `--serviceAccountToken=<serviceAccountToken>`

1Password service account token (required if any secret references are present in the environment)

### Output options

#### `-o<outputPath> --outputPath=<outputPath>`

Path to output directory or file to save command output (default: "/Users/sbattis/Documents/GitHub/myschoolapp-reporting:Snapshot.json", where :SnapshotName is either the name of the course in ":Year - :Teacher - :CourseTitle - :SectionId" format for a single section or group or "snapshot" if the --all flag is set. :SnapshotName.metadata.json is also output, recording the parameters of the snapshot command. Will use the value in environment variable OUTPUT_PATH if present)

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

Include additional :SnapshotName.metadata.json recording the parameters of the snapshot command. (Default: true, use --no-metadata to disable)

#### `-A --all`

Capture all sections (default: false, positional argument url is used to identify MySchoolApp instance) (Default: false)

#### `--fromDate=<fromDate>`

Starting date for date-based filter where relevant (Default: "11/12/2025")

#### `--toDate=<toDate>`

ending date for data-based filter where relevant

#### `--clientId=<clientId>`

SKY API app client ID, will use value in environment variable SKY_CLIENT_ID if present

#### `--clientSecret=<clientSecret>`

SKY API app client secret, will use value in environment variable SKY_CLIENT_SECRET if present

#### `--redirectUri=<http://localhost:XXXX/path/to/redirect>`

SKY API app redirect URI, will use value in environment variable SKY_REDIRECT_URI if present

#### `--subscriptionKey=<subscriptionKey>`

SKY API subscription access key, will use value in environment variable SKY_SUBSCRIPTION_KEY if present

#### `--association=<association>`

Comma-separated list of group associations to include if --all flag is used. Possible values: "Activities", "Advisories", "Classes", "Community Groups", "Dorms", and "Teams"

#### `--termsOffered=<termsOffered>`

Comma-separated list of terms to include if --all flag is used

#### `--groupsPath=<groupsPath>`

Path to output directory or file to save filtered groups listing (include placeholder "%TIMESTAMP%" to specify its location, otherwise it is added automatically when needed to avoid overwriting existing files)

#### `--year=<year>`

If --all flag is used, which year to download. (Default: "2025 - 2026") (Default: "2025 - 2026")

#### `--csv=<csv>`

Path to CSV file of group IDs to snapshot (must contain a column named GroupId)

#### `--resume=<resume>`

If --all flag is used,UUID name of temp directory (/tmp/msar/snapshot/:uuid) for which to resume collecting snapshots
