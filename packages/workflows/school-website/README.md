# @msar/school-website

A component of [msar](https://www.npmjs.com/package/msar): Analyze the message inbox data

![NPM Version](https://img.shields.io/npm/v/@msar/school-website)

## Install

This workflow is a subcommand of the [msar](https://www.npmjs.com/package/msar) tool, which can be installed using `npm` (or your preferred equivalent):

```bash
npm install -g msar
```

It depends on [Node.js](https://nodejs.org/) which provides the `npm` package manager tool when installed.

## Usage:

```bash
  msar schoolWebsite -h --o=<outputPath> --ignoreErrors --logRequests --commands --silent --pretty --photoalbums --logFilePath=<logFilePath> --stdoutLevel=<stdoutLevel> --fileLevel=<fileLevel> --opAccount=<example.1password.com> --opItem=<1Password unique identifier> --opToken=<token value> --serviceAccountToken=<token value> --clientId=<clientId> --clientSecret=<clientSecret> --redirectUri=<"http://localhost:XXXX/path/to/redirect"> --subscriptionKey=<subscriptionKey> outputPath
```

## Arguments

#### `-h --help`

Get usage information

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

### Output options

#### `-o<outputPath> --outputPath=<outputPath>`

Path to output directory or file to save command output, will use the value in environment variable OUTPUT_PATH if present

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

#### `--photoalbums`

Download photo albums (Default: true, use --no-photoalbums to disable)
