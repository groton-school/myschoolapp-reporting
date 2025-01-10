# Changelog

All notable changes to this project will be documented in this file. See [commit-and-tag-version](https://github.com/absolute-version/commit-and-tag-version) for commit guidelines.

## 0.4.3

### Patch Changes

Switch repos (again, returning)

- Updated dependencies [9606767]
  - datadirect@0.2.2

* bump dependencies ([1b27a78](https://github.com/battis/myschoolapp-reporting/commit/1b27a7855e5f9cdcf1495e50c3f3f12814bdc673))
* download progress bar ([f62dd84](https://github.com/battis/myschoolapp-reporting/commit/f62dd84f51eb15a46286cb9ad9199fc1fb103d82))
* further download cynicism ([0f7934b](https://github.com/battis/myschoolapp-reporting/commit/0f7934befcf1cc6dfd9d69ced8e06fff7b186e62))
* update recipes ([bcf9647](https://github.com/battis/myschoolapp-reporting/commit/bcf964768c77e8022fee69c950a5d15082dabf3a))

## 0.4.2

### Patch Changes

Fix normalize (again)

- Fix normalize ([13fb67a](https://github.com/battis/myschoolapp-reporting/commit/13fb67a7f00693243f249eda110c1ad27bc32213))
- close devTools ([6a6bf12](https://github.com/battis/myschoolapp-reporting/commit/6a6bf12a7723d1586f4c8cbaa9478de5914a5dcc))
- hide docs in release ([410d070](https://github.com/battis/myschoolapp-reporting/commit/410d0705a393be5954bb454b03f82bd1beee8886))

## 0.4.1

### Patch Changes

Download Fixes

- Download fixes ([a5c9c45](https://github.com/battis/myschoolapp-reporting/commit/a5c9c4500a23f31efb085b57dc4c5450575c1cb7))
  - Fix broken URL normalization in Cache
  - Handle pre-2021 courses that store paths in *FilePath fields as well as/instead of *Url fields
- pre-2021 FilePath in addition to Url ([11f5b11](https://github.com/battis/myschoolapp-reporting/commit/11f5b1107484bb588bd128b0a67a81a0fd096f17))
- okay, eslint, okay ([b915f3c](https://github.com/battis/myschoolapp-reporting/commit/b915f3c06a35f2dd8e1e985471dc587b79d602f9))
- Theoretical catch ([1b70218](https://github.com/battis/myschoolapp-reporting/commit/1b70218743522fd74ca9c519ea8f16be5657d677))
- tidier ([52dba3f](https://github.com/battis/myschoolapp-reporting/commit/52dba3fee67868eb91f9d8648b9deb72ee2fbc07))
- more cautious URL normalization ([b593150](https://github.com/battis/myschoolapp-reporting/commit/b593150555b15f5869aa00700ac9f36269c3bae5)), closes [#28](https://github.com/battis/myschoolapp-reporting/issues/28)

## 0.4.0

### Minor Changes

Improved reliability

- docs ([07737d3](https://github.com/battis/myschoolapp-reporting/commit/07737d3))
- Retry failed snapshots recipe ([0911e9a](https://github.com/battis/myschoolapp-reporting/commit/0911e9a))
- clean up errors.json ([1a77982](https://github.com/battis/myschoolapp-reporting/commit/1a77982))
- bump to-do-issue to v5 ([156ee23](https://github.com/battis/myschoolapp-reporting/commit/156ee23))
- Acceding to my own wisdom ([161cf49](https://github.com/battis/myschoolapp-reporting/commit/161cf49)), closes [#20](https://github.com/battis/myschoolapp-reporting/issues/20)
- reduce complexity of options (for user) ([5a5ab62](https://github.com/battis/myschoolapp-reporting/commit/5a5ab62)), closes [#19](https://github.com/battis/myschoolapp-reporting/issues/19)
- externalize datadirect ([155a109](https://github.com/battis/myschoolapp-reporting/commit/155a109))
- even more cynically effective downloading ([680a215](https://github.com/battis/myschoolapp-reporting/commit/680a215))
- progress bar ([78db177](https://github.com/battis/myschoolapp-reporting/commit/78db177))
- reduced spinner, refactor Snapshot.Manager ([613e8a5](https://github.com/battis/myschoolapp-reporting/commit/613e8a5))
- simplify Data, ignoreErrors ([e461d75](https://github.com/battis/myschoolapp-reporting/commit/e461d75))
- Blackbaud API todos ([714b017](https://github.com/battis/myschoolapp-reporting/commit/714b017))
- remove TODOs (temporarily) ([240a5ed](https://github.com/battis/myschoolapp-reporting/commit/240a5ed))
- output accompanying metadata file ([61a7ea4](https://github.com/battis/myschoolapp-reporting/commit/61a7ea4))
- abstract snapshot output ([921360d](https://github.com/battis/myschoolapp-reporting/commit/921360d))
- timeouts ([fe6afe5](https://github.com/battis/myschoolapp-reporting/commit/fe6afe5))
- ignore source maps ([a264662](https://github.com/battis/myschoolapp-reporting/commit/a264662))
- cleaning —help ([c2cd142](https://github.com/battis/myschoolapp-reporting/commit/c2cd142))
- enable snapshotting specific years ([32123b2](https://github.com/battis/myschoolapp-reporting/commit/32123b2))
- Quit browser ([f14428a](https://github.com/battis/myschoolapp-reporting/commit/f14428a)), closes [#17](https://github.com/battis/myschoolapp-reporting/issues/17)

## 0.3.3

### Patch Changes

Significantly more robust download

- docs(changeset): Significantly more robust download ([660f96e](https://github.com/battis/myschoolapp-reporting/commit/660f96e))
- boost maxListeners ([31aad50](https://github.com/battis/myschoolapp-reporting/commit/31aad50))
- even more improved download tracking down ([b6a4b35](https://github.com/battis/myschoolapp-reporting/commit/b6a4b35))
- timestamp downloads ([5496585](https://github.com/battis/myschoolapp-reporting/commit/5496585))

## 0.3.2

### Patch Changes

remove extraneous dependencies

- clean up dependencies ([7bb2133](https://github.com/battis/myschoolapp-reporting/commit/7bb2133))
- ignore eslint in publish ([e1c38da](https://github.com/battis/myschoolapp-reporting/commit/e1c38da))

## 0.3.1

### Patch Changes

Improved, but not perfect, downloading

It turns out that even if you tell Chrome to download to a specific directory, it's possible that it... just won't. Unclear if this is someting erroneous in this script or in Chrome. Many, but not all, downloads are now recovered from the ~/Downloads folder (on macOS). Error messages remaining in the download index provide information about how to merge in the files not captured from ~/Downloads.

- sometimes one path redirects to the CDN, sloppily ([43edecc](https://github.com/battis/myschoolapp-reporting/commit/43edecc))
- fine, just collect it from ~/Downloads, jeez ([fdb7130](https://github.com/battis/myschoolapp-reporting/commit/fdb7130))
- mocking out interactive download queue ([3074285](https://github.com/battis/myschoolapp-reporting/commit/3074285))
- simplify ([35e884f](https://github.com/battis/myschoolapp-reporting/commit/35e884f))
- no retries ([c99f254](https://github.com/battis/myschoolapp-reporting/commit/c99f254))
- configurable retries ([bfe4bb8](https://github.com/battis/myschoolapp-reporting/commit/bfe4bb8))
- sometimes… it fails. ([3c44134](https://github.com/battis/myschoolapp-reporting/commit/3c44134))
- fix PDF ([c1223ee](https://github.com/battis/myschoolapp-reporting/commit/c1223ee))
- clearer debugging messages ([23625cc](https://github.com/battis/myschoolapp-reporting/commit/23625cc))
- hunting async errors ([3904455](https://github.com/battis/myschoolapp-reporting/commit/3904455))
- Clean up interactive download, break PDF ([eba2bd3](https://github.com/battis/myschoolapp-reporting/commit/eba2bd3))
- reduce default output ([ccf0335](https://github.com/battis/myschoolapp-reporting/commit/ccf0335))
- working on cache ([d6b5776](https://github.com/battis/myschoolapp-reporting/commit/d6b5776))
- Update README.md ([2539c48](https://github.com/battis/myschoolapp-reporting/commit/2539c48))
- language ([ae8e50b](https://github.com/battis/myschoolapp-reporting/commit/ae8e50b))
- all snapshots format ([9be2f0c](https://github.com/battis/myschoolapp-reporting/commit/9be2f0c))
- Snapshot format ([7ba100c](https://github.com/battis/myschoolapp-reporting/commit/7ba100c))
- more obviously fake ID ([5861c69](https://github.com/battis/myschoolapp-reporting/commit/5861c69))
- output to cwd ([fae07d0](https://github.com/battis/myschoolapp-reporting/commit/fae07d0))
- include output in example ([c820d1b](https://github.com/battis/myschoolapp-reporting/commit/c820d1b))
- 1Password recipe ([c839587](https://github.com/battis/myschoolapp-reporting/commit/c839587))
- typo redux ([4f6c518](https://github.com/battis/myschoolapp-reporting/commit/4f6c518))
- typo ([47e41bb](https://github.com/battis/myschoolapp-reporting/commit/47e41bb))
- improve summary recipe documentation ([063fbd7](https://github.com/battis/myschoolapp-reporting/commit/063fbd7))
- improve zoom link recipe documentation ([9b294bf](https://github.com/battis/myschoolapp-reporting/commit/9b294bf))
- one more ([c5c87d5](https://github.com/battis/myschoolapp-reporting/commit/c5c87d5))
- typo ([b3df530](https://github.com/battis/myschoolapp-reporting/commit/b3df530))
- simplify ([87427ad](https://github.com/battis/myschoolapp-reporting/commit/87427ad))
- boost snapshot timeout ([a29b193](https://github.com/battis/myschoolapp-reporting/commit/a29b193))
- async queue ([ce3fea3](https://github.com/battis/myschoolapp-reporting/commit/ce3fea3)), closes [#10](https://github.com/battis/myschoolapp-reporting/issues/10) [#13](https://github.com/battis/myschoolapp-reporting/issues/13)
- use output methods ([7ff8d27](https://github.com/battis/myschoolapp-reporting/commit/7ff8d27))
- simplify/consistent TEMP behavior ([e3ce0d8](https://github.com/battis/myschoolapp-reporting/commit/e3ce0d8))
- consistent naming ([e75b9d2](https://github.com/battis/myschoolapp-reporting/commit/e75b9d2))
- tmp files in /tmp ([69b111d](https://github.com/battis/myschoolapp-reporting/commit/69b111d)), closes [#11](https://github.com/battis/myschoolapp-reporting/issues/11)
- refactor for clarity/modularity ([7ba69a4](https://github.com/battis/myschoolapp-reporting/commit/7ba69a4))
- wording ([bd94466](https://github.com/battis/myschoolapp-reporting/commit/bd94466))
- Update README ([596493b](https://github.com/battis/myschoolapp-reporting/commit/596493b))

## 0.3.0

### Minor Changes

- Download everything ([a60a981](https://github.com/battis/myschoolapp-reporting/commit/a60a981))
- capture downloads ([7174453](https://github.com/battis/myschoolapp-reporting/commit/7174453)), closes [#9](https://github.com/battis/myschoolapp-reporting/issues/9)
- timestamps, index files ([0f1b5f1](https://github.com/battis/myschoolapp-reporting/commit/0f1b5f1)), closes [#8](https://github.com/battis/myschoolapp-reporting/issues/8)
- foreground download tabs ([f668d0d](https://github.com/battis/myschoolapp-reporting/commit/f668d0d))
- de-glob matches ([0de8bbc](https://github.com/battis/myschoolapp-reporting/commit/0de8bbc)), closes [#7](https://github.com/battis/myschoolapp-reporting/issues/7)
- use @oauth2-cli/sky-api ([beda179](https://github.com/battis/myschoolapp-reporting/commit/beda179))
- working on output ([2b03683](https://github.com/battis/myschoolapp-reporting/commit/2b03683)), closes [#3](https://github.com/battis/myschoolapp-reporting/issues/3) [#4](https://github.com/battis/myschoolapp-reporting/issues/4)
- downloading works ([6d424a7](https://github.com/battis/myschoolapp-reporting/commit/6d424a7)), closes [#1](https://github.com/battis/myschoolapp-reporting/issues/1)
- use CDP to rewrite content-disposition ([daea7f0](https://github.com/battis/myschoolapp-reporting/commit/daea7f0))
- bump deps, debugging ([9b6b802](https://github.com/battis/myschoolapp-reporting/commit/9b6b802))
- fix subscription key destryction ([4f2e0fa](https://github.com/battis/myschoolapp-reporting/commit/4f2e0fa))
- fix —sso arg ([bbc5872](https://github.com/battis/myschoolapp-reporting/commit/bbc5872))
- bump qui-cli to v0.8 ([d6679f3](https://github.com/battis/myschoolapp-reporting/commit/d6679f3))
- case-sensitive HTTP header ([3390033](https://github.com/battis/myschoolapp-reporting/commit/3390033))
- oauth2-cli ([f819473](https://github.com/battis/myschoolapp-reporting/commit/f819473))
- fewer tabs ([b13efbf](https://github.com/battis/myschoolapp-reporting/commit/b13efbf)), closes [#2](https://github.com/battis/myschoolapp-reporting/issues/2)
- noodling in prep for fixing download ([9f36eee](https://github.com/battis/myschoolapp-reporting/commit/9f36eee))

## 0.2.6

### Patch Changes

- fix qui-cli dependency ([cc78253](https://github.com/battis/myschoolapp-reporting/commit/cc78253))
- fix qui-cli dep ([2081e8f](https://github.com/battis/myschoolapp-reporting/commit/2081e8f))
- cleaning ([a75e9bb](https://github.com/battis/myschoolapp-reporting/commit/a75e9bb))

## 0.2.5

### Patch Changes

- more documentation tweaks ([a143c0c](https://github.com/battis/myschoolapp-reporting/commit/a143c0c))
- keywords ([09245dc](https://github.com/battis/myschoolapp-reporting/commit/09245dc))
- one more typo ([772c396](https://github.com/battis/myschoolapp-reporting/commit/772c396))

## 0.2.4

### Patch Changes

- tweak wording ([ccd2bdb](https://github.com/battis/myschoolapp-reporting/commit/ccd2bdb))
- wording tweak ([4903571](https://github.com/battis/myschoolapp-reporting/commit/4903571))

## 0.2.3

### Patch Changes

- improve documentation ([088d632](https://github.com/battis/myschoolapp-reporting/commit/088d632))
- update help (redux) ([54b83f4](https://github.com/battis/myschoolapp-reporting/commit/54b83f4))
- update help ([cc5ccbc](https://github.com/battis/myschoolapp-reporting/commit/cc5ccbc))

## 0.2.2

### Patch Changes

- fix credentials error ([f837bc4](https://github.com/battis/myschoolapp-reporting/commit/f837bc4))
- fix missing credentials message ([246bf5a](https://github.com/battis/myschoolapp-reporting/commit/246bf5a))

## 0.2.1

### Patch Changes

- fix build ([fa3fae3](https://github.com/battis/myschoolapp-reporting/commit/fa3fae3))
- bah ([abd5c6e](https://github.com/battis/myschoolapp-reporting/commit/abd5c6e))

## 0.2.0

### Minor Changes

- assigments, updated snapshot metadata ([bd7eb74](https://github.com/battis/myschoolapp-reporting/commit/bd7eb74))
- saftey frist! ([dca81fa](https://github.com/battis/myschoolapp-reporting/commit/dca81fa))
- update documentation ([b53183a](https://github.com/battis/myschoolapp-reporting/commit/b53183a))
- single command, many verbs ([6e911b8](https://github.com/battis/myschoolapp-reporting/commit/6e911b8))
- passing credentials more successfully ([52f9700](https://github.com/battis/myschoolapp-reporting/commit/52f9700))
- TODO workflow ([ae0812a](https://github.com/battis/myschoolapp-reporting/commit/ae0812a))
- assignments captured (brutally) ([4add244](https://github.com/battis/myschoolapp-reporting/commit/4add244))
- whoops ([794a420](https://github.com/battis/myschoolapp-reporting/commit/794a420))
- refactor ([5f27e50](https://github.com/battis/myschoolapp-reporting/commit/5f27e50))
- include/exclude args ([9d08675](https://github.com/battis/myschoolapp-reporting/commit/9d08675))
- include/exclude ([4a9b74f](https://github.com/battis/myschoolapp-reporting/commit/4a9b74f))
- simpler download ([77cc229](https://github.com/battis/myschoolapp-reporting/commit/77cc229))
- typing for assignments ([a0c06c8](https://github.com/battis/myschoolapp-reporting/commit/a0c06c8))
- fine-tuning export ([4b1e203](https://github.com/battis/myschoolapp-reporting/commit/4b1e203))
- first glimmers of an export ([aec3756](https://github.com/battis/myschoolapp-reporting/commit/aec3756))
- stop renewing session, save partial snapshots taking multiple ([2b9b373](https://github.com/battis/myschoolapp-reporting/commit/2b9b373))
- npx ([e58dfca](https://github.com/battis/myschoolapp-reporting/commit/e58dfca))

## 0.1.3

### Patch Changes

- package info ([3f6547c](https://github.com/battis/myschoolapp-reporting/commit/3f6547c))
- update package info ([5430040](https://github.com/battis/myschoolapp-reporting/commit/5430040))
- tweak ignore ([99b3213](https://github.com/battis/myschoolapp-reporting/commit/99b3213))

## 0.1.2

### Patch Changes

- ix ignores ([ca2433b](https://github.com/battis/myschoolapp-reporting/commit/ca2433b))
- ignoring more ([a511da2](https://github.com/battis/myschoolapp-reporting/commit/a511da2))

## 0.1.1

### Patch Changes

- fix paths ([2085f3b](https://github.com/battis/myschoolapp-reporting/commit/2085f3b))
- simplify paths ([22bd5c5](https://github.com/battis/myschoolapp-reporting/commit/22bd5c5))

## 0.1.0

### Minor Changes

- Initial release ([958db3c](https://github.com/battis/myschoolapp-reporting/commit/958db3c))
- prep changeset ([f2a2586](https://github.com/battis/myschoolapp-reporting/commit/f2a2586))
- update README.md ([fe3476e](https://github.com/battis/myschoolapp-reporting/commit/fe3476e))
- expand globals ([3c3204b](https://github.com/battis/myschoolapp-reporting/commit/3c3204b))
- humanize ([75667a1](https://github.com/battis/myschoolapp-reporting/commit/75667a1))
- no filters = no filters ([13098f9](https://github.com/battis/myschoolapp-reporting/commit/13098f9))
- snapshot classes ([0453df4](https://github.com/battis/myschoolapp-reporting/commit/0453df4))
- bump cli, conditional snapshot part ([2b22680](https://github.com/battis/myschoolapp-reporting/commit/2b22680))
- shebang ([eb31a51](https://github.com/battis/myschoolapp-reporting/commit/eb31a51))
- nodenext for resolveJsonModule ([074a462](https://github.com/battis/myschoolapp-reporting/commit/074a462))
- refactor for modularity ([6c2c5cd](https://github.com/battis/myschoolapp-reporting/commit/6c2c5cd))
- buildable ([67bba1c](https://github.com/battis/myschoolapp-reporting/commit/67bba1c))
- Snapshot bulletin board ([d3e95f1](https://github.com/battis/myschoolapp-reporting/commit/d3e95f1))
- bump deps, pre-commit ([9ebf483](https://github.com/battis/myschoolapp-reporting/commit/9ebf483))
- Clean up ([754755a](https://github.com/battis/myschoolapp-reporting/commit/754755a))
- Create LICENSE.MD ([17555b7](https://github.com/battis/myschoolapp-reporting/commit/17555b7))
- More selective section selector ([199a1e9](https://github.com/battis/myschoolapp-reporting/commit/199a1e9))
- Initial Commit ([880413d](https://github.com/battis/myschoolapp-reporting/commit/880413d))
