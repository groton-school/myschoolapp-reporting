# Changelog

All notable changes to this project will be documented in this file. See [commit-and-tag-version](https://github.com/absolute-version/commit-and-tag-version) for commit guidelines.

## [0.3.2](https://github.com/groton-school/myschoolapp-reporting/compare/snapshot/0.3.1...snapshot/0.3.2) (2025-03-25)


### Bug Fixes

* **snapshot:** include datadirect.ImportAssignmentsGet in Assignment snapshot, as intended ([3fff145](https://github.com/groton-school/myschoolapp-reporting/commit/3fff145d6956f256d79070481e5f72bd03bb3af9))

## [0.3.1](https://github.com/groton-school/myschoolapp-reporting/compare/snapshot/0.3.0...snapshot/0.3.1) (2025-03-20)

### Features

- **snapshot:** capture Audio, Video, Media albums in Topics and on Bulletin Board ([dae555f](https://github.com/groton-school/myschoolapp-reporting/commit/dae555f154c8350b7af93870be369aca73007d20))
- **snapshot:** capture photo album files ([4c4d167](https://github.com/groton-school/myschoolapp-reporting/commit/4c4d167879841c1d6fff2987878ec096ff55bd4d))

### Bug Fixes

- **snapshot:** remove incorrect merge of multiple items to same cell ([9143ec4](https://github.com/groton-school/myschoolapp-reporting/commit/9143ec4bdb1037ca5ec73d1fe26c00b56fb1aff9))

## [0.3.0](https://github.com/groton-school/myschoolapp-reporting/compare/snapshot/0.2.1...snapshot/0.3.0) (2025-03-17)

### ⚠ BREAKING CHANGES

- **snapshot:** remove load() method

### revert

- **snapshot:** remove load() method ([5f7e096](https://github.com/groton-school/myschoolapp-reporting/commit/5f7e096f72e8aab2aec756c42120bd08dc7abd70))

## [0.2.1](https://github.com/groton-school/myschoolapp-reporting/compare/snapshot/0.2.0...snapshot/0.2.1) (2025-03-11)

### Features

- **snapshot,snapshot-multiple,archive:** shared rate-limiting queue ([335d143](https://github.com/groton-school/myschoolapp-reporting/commit/335d143b8a22fcd28964c30a09bd821dc544cdf7))
- **snapshot:** apply logRequests at session level ([406a42f](https://github.com/groton-school/myschoolapp-reporting/commit/406a42f329087cd7185d46561423a7e6c7437c2c))
- **snapshot:** capture topic layout ([4a12030](https://github.com/groton-school/myschoolapp-reporting/commit/4a120301f0ab8262eb0d7f608c1a68319ca28cae))

### Bug Fixes

- **snapshot:** relax peer dependency versioning ([26314de](https://github.com/groton-school/myschoolapp-reporting/commit/26314de624e6c2cc7a27325678e56a8cc737b509))
- **snapshot:** so long as TopicIndexId is sent, id value doesn’t matter ([1bdaafc](https://github.com/groton-school/myschoolapp-reporting/commit/1bdaafc48af2f9fd40905eeef31f60bbd6641c4c)), closes [#53](https://github.com/groton-school/myschoolapp-reporting/issues/53)

## [0.2.0](https://github.com/battis/myschoolapp-reporting/compare/snapshot/0.1.2...snapshot/0.2.0) (2025-03-09)

### Features

- **snapshot:** merge SKY API assignment with scraped assignment ([a846a8b](https://github.com/battis/myschoolapp-reporting/commit/a846a8b2aae5b563acf818d722613638658043b6))

## [0.1.2](https://github.com/battis/myschoolapp-reporting/compare/snapshot/0.1.1...snapshot/0.1.2) (2025-03-05)

### Bug Fixes

- **snapshot:** honor outputPath ([9283d21](https://github.com/battis/myschoolapp-reporting/commit/9283d218bc90363956b154f28e15fd591daf152b))

## [0.1.1](https://github.com/battis/myschoolapp-reporting/compare/snapshot/0.1.0...snapshot/0.1.1) (2025-03-05)

### Features

- **snapshot:** load() index file ([a6e741d](https://github.com/battis/myschoolapp-reporting/commit/a6e741d3d72b6a7da6780a8e95e818f66ba3a36c))

## 0.1.0 (2025-03-05)

### Features

- **snapshot,snapshot-multiple:** improved output feedback ([1400257](https://github.com/battis/myschoolapp-reporting/commit/1400257e0151edfcf1dfea6c13822672e3dee49b))

### Bug Fixes

- **snapshot:** actually store user args ([1fa47c4](https://github.com/battis/myschoolapp-reporting/commit/1fa47c4d69a0dcb737b4f29d1a6ec2e4bb4800e3))
- **snapshot:** honor Workflow.ignoreErrors ([cf0c32e](https://github.com/battis/myschoolapp-reporting/commit/cf0c32efd890ad0258c62038b4714cbe2a4ea90c))
- **snapshot:** restore local outputPath to prevent unnecessary output during snapshot-multiple ([0352e11](https://github.com/battis/myschoolapp-reporting/commit/0352e11dd2cde6719a3716651823056bea5891eb))
- **snapshot:** suppress ContentId 78, 79, and 80 errors ([1287670](https://github.com/battis/myschoolapp-reporting/commit/1287670a978ecf6650d596939e746e216350f865))
