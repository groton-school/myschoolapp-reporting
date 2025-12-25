# @msar/pronunciation

A component of [msar](https://www.npmjs.com/package/msar): Capture name pronunciation recordings

![NPM Version](https://img.shields.io/npm/v/@msar/pronunciation)

## Install

This workflow is a subcommand of the [msar](https://www.npmjs.com/package/msar) tool, which can be installed using `npm` (or your preferred equivalent):

```bash
npm install -g msar
```

It depends on [Node.js](https://nodejs.org/) which provides the `npm` package manager tool when installed.

## Usage:

```bash
  msar pronunciation -h --u=<username> --p=<password> --o=<outputPath> --ignoreErrors --logRequests --commands --silent --headless --devtools --quit --pretty --download --concurrency=<concurrency> --rate=<rate> --logFilePath=<logFilePath> --stdoutLevel=<stdoutLevel> --fileLevel=<fileLevel> --opAccount=<example.1password.com> --opItem=<1Password unique identifier> --opToken=<token value> --serviceAccountToken=<token value> --sso=<sso> --mfa=<mfa> --viewportWidth=<viewportWidth> --viewportHeight=<viewportHeight> --column=<column> --user=<user> instanceURL [pathToSourceCsvFile]
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

Path to output directory or file to save command output, will use the value in environment variable OUTPUT_PATH if present

#### `--pretty`

Pretty print output to file (if --outputPath option is used)

### Name pronunciation options

Scan users for name pronunciation recordings. Include the URL of the LMS instance as instanceURL (required) and path to a CSV file of Blackbaud User IDs to analyze as pathToSourceCsvFile (optional if --user is set). Intended to receive a generic .UserWorkList.csv export from the LMS as input, outputting the same CSV file to --outputPath with data columns appended.

Due to the number of impersonated clicks necessary for this workflow, running --headless reduces the likelihood of stray user actions interfering with the script.

#### `--column=<column>`

Column label for CSV input (pathToSourceCsvFile) column containing Blackbaud Usesr IDs to scan for name pronunciations. Required if opening a CSV file. (Default: "User ID")

#### `--user=<user>`

A Blackbaud user ID to scan. May be set multiple times to scan multiple individual users. If set, pathToSourceCsvFile path to CSV file is not required. (Default: ) Can be set multiple times

#### `--download`

Download name pronunciation recordings (Default: true, use --no-download to disable)
