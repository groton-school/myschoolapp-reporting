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
  msar inbox -h --u=<username> --p=<password> --o=<outputPath> --v=<val> --ignoreErrors --logRequests --commands --silent --headless --devtools --quit --pretty --concurrency=<concurrency> --rate=<rate> --logFilePath=<logFilePath> --stdoutLevel=<stdoutLevel> --fileLevel=<fileLevel> --opAccount=<example.1password.com> --opItem=<1Password unique identifier> --opToken=<token value> --serviceAccountToken=<token value> --sso=<sso> --mfa=<mfa> --viewportWidth=<viewportWidth> --viewportHeight=<viewportHeight> --column=<column> --searchIn=<searchIn> url csv
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

### Output options

#### `-o<outputPath> --outputPath=<outputPath>`

Path to output directory or file to save command output, will use the value in environment variable OUTPUT_PATH if present

#### `--pretty`

Pretty print output to file (if --outputPath option is used)

### Inbox options

Analyze inbox contents for a user or users. Include the URL of the LMS instance as url (required) and path to a CSV file of user identifiers to analyze as csv (optional if --val is set). Intended to receive a generic UserWorkList.csv export from the LMS as input, outputting the same CSV file to --outputPath with analysis columns appended.

Due to the number of impersonated clicks necessary for this workflow, running --headless reduces the likelihood of stray user actions interfering with the script.

#### `--column=<column>`

Column label for CSV input (csv) column containing user identifier for inboxes to analyze. Required if opening a CSV of user identifiers. (Default: "User ID")

#### `--searchIn=<searchIn>`

Field to search for user identifier. Required for all uses. One of "LastName", "FirstName", "Email", "MaidenName", "PreferredName", "BusinessName", "UserID", "HostID", "lastname", "firstname", "email", "maidenname", "nickname", "business_name", "pk" or "conversion_string" (Default: "UserID")

#### `-v<val> --val=<val>`

A user identifier to query. Requires corresponding --searchIn. If set, csv path to CSV file is not required. (Default: ) Can be set multiple times
