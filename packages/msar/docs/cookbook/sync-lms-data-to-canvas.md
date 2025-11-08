# Sync LMS data to Canvas

Assumes that not-yet-released [@msar/canvas-import](https://github.com/groton-school/canvas-cli/tree/main/packages/msar/canvas-import) is installed:

```sh
npm install 'https://gitpkg.vercel.app/groton-school/canvas-cli/packages/msar/canvas-import?main'
```

And, because likely it's convenient to do this for more than one course at once, prepare a CSV file `groups.csv` with a column named `GroupId` that contains the Blackbaud group IDs for the groups to be synced.

In your environment, make sure that the following values have been set:

```env
SKY_CLIENT_ID="<UUID>"
SKY_CLIENT_SECRET="<cryptographic hash>"
SKY_SUBSCRIPTION_KEY="<cryptographic hash>"
SKY_REDIRECT_URI="http://localhost:3001/skyapi"
SKY_TOKEN_STORE=path/to/stored/sky-api-tokens.json

CANVAS_CLIENT_ID="<ID Number>"
CANVAS_CLIENT_SECRET="<cryptographic hash>"
CANVAS_REDIRECT_URI="http://localhost:3000/canvas"
CANVAS_TOKEN_STORE=path/to/stored/canvas-tokens
```

This requires [setting up a SKY API app in Blackbaud](https://gist.github.com/battis/1f5961dc2871386b0ba5eb9a5ec51e03) to get the `SKY_*` values and [setting up a Developer Key in Canvas](https://community.canvaslms.com/t5/Admin-Guide/How-do-I-add-a-developer-API-key-for-an-account/ta-p/259) to get the `CANVAS_*` values.

_N.B. that the `SKY_TOKEN_STORE` value is a path to a JSON file, while the `CANVAS_TOKEN_STORE` is a path to a *directory*, as the script will store tokens by Canvas instance (production, beta, test)._

_N.B. also that the `*_REDIRECT_URI` values *must* point to different ports. This is a known issue in [oauth2-cli](https://github.com/battis/oauth2-cli/issues/22)_

Then…

```sh
msar snapshot --outputPath path/to/snapshot --csv path/to/groups.csv "https://example.myschoolapp.com"
msar archive --outputPath path/to/archive path/to/snapshot.json
canvas-import --duplicates reset --canvasInstanceUrl "https://example.instructure.com" path/to/archive/index.json
```

_CAUTION: the script above uses the `--duplicates reset` flag for `canvas-import`. This will reset the contents of any affected courses and replace them with the imported content from Blackbaud._
