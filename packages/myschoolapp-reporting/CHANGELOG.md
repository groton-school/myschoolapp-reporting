# myschoolapp-reporting

## 0.4.3

### Patch Changes

- Updated dependencies [9606767]
  - datadirect@0.2.2
- 1b27a78: bump dependencies
- 04ba39a: subsume datadirect back into monorepo
- f62dd84: download progrss bar
- 0f7934b: further download cynicism
- bcf9647: update recipes

## 0.4.2

### Patch Changes

- fce6d2d: docs(changeset): Fix normalize (again)
- 13fb67a: Fix normalize
- 6a6bf12: close devTools
- 410d070: hide docs in release

## 0.4.1

### Patch Changes

- a5c9c45: Download fixes
  - Fix broken URL normalization in Cache
  - Handle pre-2021 courses that store paths in *FilePath fields as well as/instead of *Url fields
- 11f5b11: pre-2021 FilePath in addition to Url
- b915f3c: okay, eslint, okay
- 1b70218: Theoretical catch
- 52dba3f: tidier
- b593150: more cautious URL normalization

## 0.4.0

### Minor Changes

- 0c78b35: docs(changeset): Improved reliability
- 07737d3: docs
- 0911e9a: Retry failed snapshots recipe
- 1a77982: clean up errors.json
- 156ee23: bump to-do-issue to v5
- 161cf49: Acceding to my own wisdom
- 5a5ab62: reduce complexity of options (for user)
- 155a109: externalize datadirect
- 680a215: even more cynically effective downloading
- 78db177: progress bar
- 613e8a5: reduced spinner, refactor Snapshot.Manager
- e461d75: simplify Data, ignoreErrors
- 714b017: Blackbaud API todos
- 240a5ed: remove TODOs (temporarily)
- 61a7ea4: output accompanying metadata file
- 921360d: abstract snapshot output
- fe6afe5: timeouts
- a264662: ignore source maps
- c2cd142: cleaning —help
- 32123b2: enable snapshotting specific years
- f14428a: Quit browser
- 5c6e312: icon

## 0.3.3

### Patch Changes

- 660f96e: docs(changeset): Significantly more robust download
- 31aad50: boost maxListeners
- b6a4b35: even more improved download tracking down
- 5496585: timestamp downloads

## 0.3.2

### Patch Changes

- a8efcbf: docs(changeset): remove extraneous dependencies
- 7bb2133: clean up dependencies
- e1c38da: ignore eslint in publish

## 0.3.1

### Patch Changes

- 409431c: Improved, but not perfect, downloading

  It turns out that even if you tell Chrome to download to a specific directory, it's possible that it... just won't. Unclear if this is someting erroneous in this script or in Chrome. Many, but not all, downloads are now recovered from the ~/Downloads folder (on macOS). Error messages remaining in the download index provide information about how to merge in the files not captured from ~/Downloads.

- 43edecc: sometimes one path redirects to the CDN, sloppily
- fdb7130: fine, just collect it from ~/Downloads, jeez
- 3074285: mocking out interactive download queue
- 35e884f: simplify
- c99f254: no retries
- bfe4bb8: configurable retries
- 3c44134: sometimes… it fails.
- c1223ee: fix PDF
- 23625cc: clearer debugging messages
- 3904455: hunting async errors
- eba2bd3: Clean up interactive download, break PDF
- ccf0335: reduce default output
- 21c7518: Merge branch 'origin/main'
- d6b5776: working on cache
- 2539c48: Update README.md
- ae8e50b: language
- 9be2f0c: all snapshots format
- 7ba100c: Snapshot format
- 5861c69: more obviously fake ID
- fae07d0: output to cwd
- c820d1b: include output in example
- c839587: 1Password recipe
- 4f6c518: typo redux
- 47e41bb: typo
- 063fbd7: improve summary recipe documentation
- 9b294bf: improve zoom link recipe documentation
- c5c87d5: one more
- b3df530: typo
- 87427ad: simplify
- a29b193: boost snapshot timeout
- ce3fea3: async queue
- 7ff8d27: use output methods
- e3ce0d8: simplify/consistent TEMP behavior
- e75b9d2: consistent naming
- 69b111d: tmp files in /tmp
- 7ba69a4: refactor for clarity/modularity
- bd94466: wording
- 596493b: Update README

## 0.3.0

### Minor Changes

- a60a981: Download everything
- 7174453: capture downloads
- 0f1b5f1: timestamps, index files
- f668d0d: foreground download tabs
- 0de8bbc: de-glob matches
- beda179: use @oauth2-cli/sky-api
- 2b03683: working on output
- 6d424a7: downloading works
- daea7f0: use CDP to rewrite content-disposition
- 9b6b802: bump deps, debugging
- 4f2e0fa: fix subscription key destryction
- bbc5872: fix —sso arg
- d6679f3: bump qui-cli to v0.8
- 3390033: case-sensitive HTTP header
- f819473: oauth2-cli
- b13efbf: fewer tabs
- 9f36eee: noodling in prep for fixing download

## 0.2.6

### Patch Changes

- cc78253: fix qui-cli dependency
- 2081e8f: fix qui-cli dep
- a75e9bb: cleaning

## 0.2.5

### Patch Changes

- a143c0c: more documentation tweaks
- 09245dc: keywords
- 772c396: one more typo

## 0.2.4

### Patch Changes

- ccd2bdb: tweak wording
- 4903571: wording tweak

## 0.2.3

### Patch Changes

- 088d632: improve documentation
- 54b83f4: update help (redux)
- cc5ccbc: update help

## 0.2.2

### Patch Changes

- f837bc4: fix credentials error
- 246bf5a: fix missing credentials message

## 0.2.1

### Patch Changes

- fa3fae3: fix build
- abd5c6e: bah

## 0.2.0

### Minor Changes

- bd7eb74: assigments, updated snapshot metadata
- dca81fa: saftey frist!
- b53183a: update documentation
- 6e911b8: single command, many verbs
- 52f9700: passing credentials more successfully
- ae0812a: TODO workflow
- 4add244: assignments captured (brutally)
- 794a420: whoops
- 5f27e50: refactor
- 9d08675: include/exclude args
- 4a9b74f: include/exclude
- 77cc229: simpler download
- a0c06c8: typing for assignments
- 4b1e203: fine-tuning export
- aec3756: first glimmers of an export
- 2b9b373: stop renewing session, save partial snapshots taking multiple
- e58dfca: npx

## 0.1.3

### Patch Changes

- 3f6547c: package info
- 5430040: update package info
- 99b3213: tweak ignore

## 0.1.2

### Patch Changes

- ca2433b: ix ignores
- a511da2: ignoring more

## 0.1.1

### Patch Changes

- 2085f3b: fix paths
- 22bd5c5: simplify paths

## 0.1.0

### Minor Changes

- 958db3c: Initial release
- f2a2586: prep changeset
- fe3476e: update README.md
- 3c3204b: expand globals
- 75667a1: humanize
- 13098f9: no filters = no filters
- 0453df4: snapshot classes
- 2b22680: bump cli, conditional snapshot part
- eb31a51: shebang
- 074a462: nodenext for resolveJsonModule
- 6c2c5cd: refactor for modularity
- 67bba1c: buildable
- d3e95f1: Snapshot bulletin board
- ccb0f6c: vscode -> nova
- 9ebf483: bump deps, pre-commit
- 13eedad: tweak color coding
- fbb204d: Merge commit '9813c7612f725667916371da4cf98b275ab2ebb7'
- 33f650c: Nova icons
- 3a0e2f8: Nova icons
- 754755a: Clean up
- 17555b7: Create LICENSE.MD
- a86084c: pnpm
- 199a1e9: More selective section selector
- 880413d: Initial Commit
