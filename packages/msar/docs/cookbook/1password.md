# Store credential in 1Password

## Use `op` to look up credentials

If you store your login credentials in 1Password, you can pass username and password using the `op` cli tool (`$OP_ITEM` environment variable is the item identifier in 1Password of the desired login):

```sh
msar snapshot -u "$(op item get $OP_ITEM --fields username)" -p "$(op item get $OP_ITEM --fields password --reveal)" --sso "entra-id" https://example.myschoolapp.com/app/faculty#academicclass/97551579/0/bulletinboard
```

The only single sign-on/multi-factor authentication interaction that is currently scripted is Entra ID (for my personal convenience). All other sign-ons and MFA interaction will require running the app _not_ in headless mode (as it is by default, or by invoking it with the `--no-headless` flag) to allow for an interactive login.

Nota bene: you can easily discover the identifier for a login in 1Password by right-clicking the login and copying the private link. The `i` parameter of search query in that URL is your identifier.

## Use a 1Passord Service Account

In an effort to reduce our security exposure, we are storing app and API credentials in 1Password and using a [service account](https://developer.1password.com/docs/service-accounts/) to look them up. This is supported by [@qui-cli/env](https://github.com/battis/qui-cli/tree/main/packages/env#1password-integration).

My current strategy is to store the name of the 1Password account (e.g. `example.1password.com`) to which the service account has access, the ID of the service account (e.g. `h6e4po6umbnpfp9iokryk6ifb1`, discoverable as the `i` search query parameter when you `Copy Private Link` to an item in 1Password -- happily these IDs are meaningless outside of the context of the vaults themselves and therefore kinda safe to leave lying around), and the ID of my regular LMS sign-in credentials all in my `.env` file:

```ini
OP_ACCOUNT="example.1password.com"
OP_TOKEN="h6e4po6umbnpfp9iokryk6ifb1"
OP_USER="y832fa5i91oiuv7325xoiulpxq"
```

Then I can invoke the a command thus:

```sh
source .env
msar snapshot --serviceAccountToken "$(op item get --account $OP_ACCOUNT --reveal --field credential $OP_TOKEN)" -u "$(op item get --account $OP_ACCOUNT --field username $OP_USER)" --password "$(op item get --account $OP_ACCOUNT --reveal --field password $OP_USER)" "https://example.myschoolapp.com/..."
```

Pre-loading my environment file into the actual environment with `source` is necessary so that I can use those environment variables in the command itself. Other environment variables are stored in `.env` as [secret references](https://developer.1password.com/docs/cli/secret-references/) and are parsed by `@qui-cli/env` using the provided service account token.
