# @msar/inbox

A component of [msar](https://www.npmjs.com/package/,msar): Analyze the message inbox data

![NPM Version](https://img.shields.io/npm/v/@msar/inbox)

## Usage:

```bash
  msar inbox -h --o=<outputPath> --u=<username> --p=<password> --v=<val> --ignoreErrors --logRequests --pretty --headless --devtools --quit --serviceAccountToken=<serviceAccountToken> --concurrency=<concurrency> --rate=<rate> --logFilePath=<logFilePath> --stdoutLevel=<stdoutLevel> --fileLevel=<fileLevel> --sso=<sso> --mfa=<mfa> --viewportWidth=<viewportWidth> --viewportHeight=<viewportHeight> --column=<column> --searchIn=<searchIn> url csv
```

## Arguments

#### `-h --help`

Get usage information

### 1Password integration

#### `--serviceAccountToken=<serviceAccountToken>`

1Password service account token (defaults to OP_SERVICE_ACCOUNT_TOKEN} environment variable, if present)

#### `--concurrency=<n>`

The number of concurrent threads to run (default 1)

#### `--rate=<n>`

The number of server requests allowed per second

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

### Output options

#### `-o<outputPath> --outputPath=<outputPath>`

Path to output directory or file to save command output (default: "/Users/sbattis/Documents/GitHub/myschoolapp-reporting", will use the value in environment variable OUTPUT_PATH if present)

#### `--pretty`

Pretty print output to file (if --outputPath option is used)

### Puppeteer options

#### `--headless`

Run Puppeteer's Chrome instance headless (default: true)

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

### Inbox options

Analyze inbox contents for a user or users. Include the URL of the LMS instance as url (required) and path to a CSV file of user identifiers to analyze as csv (optional if --val is set). Intended to receive a generic UserWorkList.csv export from the LMS as input, outputting the same CSV file to --outputPath with analysis columns appended.

Due to the number of impersonated clicks necessary for this workflow, running --headless reduces the likelihood of stray user actions interfering with the script.

#### `--column=<column>`

Column label for CSV input (csv) column containing user identifier for inboxes to analyze. Required if opening a CSV of user identifiers. (default: "User ID")

#### `--searchIn=<searchIn>`

Field to search for user identifier. Required for all uses. One of "LastName", "FirstName", "Email", "MaidenName", "PreferredName", "BusinessName", "UserID", "HostID", "lastname", "firstname", "email", "maidenname", "nickname", "business_name", "pk" or "conversion_string" (default: "UserID")

#### `-v<val> --val=<val>`

A user identifier to query. Requires corresponding --searchIn. If set, csv path to CSV file is not required. Can be set multiple times
