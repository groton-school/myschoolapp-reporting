# Changelog

All notable changes to this project will be documented in this file. See [commit-and-tag-version](https://github.com/absolute-version/commit-and-tag-version) for commit guidelines.

## [0.3.1](https://github.com/groton-school/myschoolapp-reporting/compare/snapshot-multiple/0.3.0...snapshot-multiple/0.3.1) (2025-03-20)

### Features

- **snapshot:** capture Audio, Video, Media albums in Topics and on Bulletin Board ([dae555f](https://github.com/groton-school/myschoolapp-reporting/commit/dae555f154c8350b7af93870be369aca73007d20))
- **snapshot:** capture photo album files ([4c4d167](https://github.com/groton-school/myschoolapp-reporting/commit/4c4d167879841c1d6fff2987878ec096ff55bd4d))

### Bug Fixes

- **snapshot:** remove incorrect merge of multiple items to same cell ([9143ec4](https://github.com/groton-school/myschoolapp-reporting/commit/9143ec4bdb1037ca5ec73d1fe26c00b56fb1aff9))

## [0.3.0](https://github.com/groton-school/myschoolapp-reporting/compare/snapshot-multiple/0.2.1...snapshot-multiple/0.3.0) (2025-03-17)

### ⚠ BREAKING CHANGES

- **snapshot-multiple:** remove load() method

### revert

- **snapshot-multiple:** remove load() method ([d797c87](https://github.com/groton-school/myschoolapp-reporting/commit/d797c87dd395d02a61ff3ed3d25e960f505327a6))

## [0.2.1](https://github.com/groton-school/myschoolapp-reporting/compare/snapshot-multiple/0.2.0...snapshot-multiple/0.2.1) (2025-03-11)

### Features

- **snapshot-multiple:** apply logRequests at session-level ([78865b4](https://github.com/groton-school/myschoolapp-reporting/commit/78865b4fb82343ef43a192a04ed8aef8786f8856))
- **snapshot-multiple:** resume a failed/canceled snapshot sequence using the UUID of the temp dir ([d761115](https://github.com/groton-school/myschoolapp-reporting/commit/d7611150abb785a3539da1c9a2010b4b4ee41e80))
- **snapshot,snapshot-multiple,archive:** shared rate-limiting queue ([335d143](https://github.com/groton-school/myschoolapp-reporting/commit/335d143b8a22fcd28964c30a09bd821dc544cdf7))

### Bug Fixes

- **snapshot-multiple:** relax peer dependency versioning ([37fe600](https://github.com/groton-school/myschoolapp-reporting/commit/37fe600bf517c9eefcf423936ef942f9c8a4c4f2))
- **snapshot-multiple:** remove extraneous writeJSON outputs ([2818326](https://github.com/groton-school/myschoolapp-reporting/commit/2818326987bca4fae102ea66e507b2e4009912ee))

## [0.2.0](https://github.com/battis/myschoolapp-reporting/compare/snapshot-multiple/0.1.2...snapshot-multiple/0.2.0) (2025-03-09)

### Features

- **snapshot:** merge SKY API assignment with scraped assignment ([a846a8b](https://github.com/battis/myschoolapp-reporting/commit/a846a8b2aae5b563acf818d722613638658043b6))

## [0.1.2](https://github.com/battis/myschoolapp-reporting/compare/snapshot-multiple/0.1.1...snapshot-multiple/0.1.2) (2025-03-05)

### Bug Fixes

- **snapshot:** honor outputPath ([9283d21](https://github.com/battis/myschoolapp-reporting/commit/9283d218bc90363956b154f28e15fd591daf152b))

## [0.1.1](https://github.com/battis/myschoolapp-reporting/compare/snapshot-multiple/0.1.0...snapshot-multiple/0.1.1) (2025-03-05)

### Features

- **snapshot-multiple:** load() data from file ([82252d0](https://github.com/battis/myschoolapp-reporting/commit/82252d07c0b6e6fbe6968c92b0bafd4dc1c5a799))

## 0.1.0 (2025-03-05)

### Features

- **snapshot,snapshot-multiple:** improved output feedback ([1400257](https://github.com/battis/myschoolapp-reporting/commit/1400257e0151edfcf1dfea6c13822672e3dee49b))

### Bug Fixes

- **snapshot-multiple:** inverted logic on groupsPath ([40eabcb](https://github.com/battis/myschoolapp-reporting/commit/40eabcb048f895dab8176d2b2582694adfe4918a))
- **snapshot-multiple:** suppress metadata ([7bf3e20](https://github.com/battis/myschoolapp-reporting/commit/7bf3e20912ed4b91d7b300b48be02cd34e6ad17b))
