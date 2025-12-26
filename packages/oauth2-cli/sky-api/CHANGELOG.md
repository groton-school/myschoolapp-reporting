# Changelog

All notable changes to this project will be documented in this file. See [commit-and-tag-version](https://github.com/absolute-version/commit-and-tag-version) for commit guidelines.

## [0.3.1](https://github.com/groton-school/myschoolapp-reporting/compare/oauth2-cli/sky-api/0.3.0...oauth2-cli/sky-api/0.3.1) (2025-12-26)


### Bug Fixes

* include Content-Type header when sending JSON bodies ([b06e18e](https://github.com/groton-school/myschoolapp-reporting/commit/b06e18e5136a08a00e251171348c9cf2325656ca))
* update CategroyRequest typing to match observed reality ([89ad060](https://github.com/groton-school/myschoolapp-reporting/commit/89ad060476e7efed3430aff969b0dbdaa99692d1))
* update Colors usage to match current version ([7a82e9f](https://github.com/groton-school/myschoolapp-reporting/commit/7a82e9f3e624992c8c2a0ba7241d82327913391f))
* update photoalbum.list() to reflect actual behavior, rather than documentation ([e2f1708](https://github.com/groton-school/myschoolapp-reporting/commit/e2f170804f5338c54279b2ca095a075fdbc32fb6))

## [0.3.0](https://github.com/groton-school/myschoolapp-reporting/compare/oauth2-cli/sky-api/0.2.2...oauth2-cli/sky-api/0.3.0) (2025-12-24)


### ⚠ BREAKING CHANGES

* rewritten as cleaner extension of @oauth2-cli/qui-cli-plugin
* re-type section assignments to map more clearly to API documentation
* rename school API to match Blackbaud documentation

### Features

* allow typing fetch response ([e93a758](https://github.com/groton-school/myschoolapp-reporting/commit/e93a7583ca781410ca88f0856ddbdd86ba5a95c5))
* async iterate across paginated responses ([9d0cbfb](https://github.com/groton-school/myschoolapp-reporting/commit/9d0cbfb5e0c72229e44315ede6a0ff4e4d7cecd8))
* content management announcements ([fc724d1](https://github.com/groton-school/myschoolapp-reporting/commit/fc724d1440de4e04b63a8d5b492bec8af28b8e56))
* content management news ([3bc3cd0](https://github.com/groton-school/myschoolapp-reporting/commit/3bc3cd0042f3d20b8779b0ba8bcece482dffd0f0))
* contentmenagement.photoalbums.categories and contentmanagement.photoalbums.list types ([881851f](https://github.com/groton-school/myschoolapp-reporting/commit/881851fcef2b801b622301621789b942b1d39c01))
* expose endpoints as async methods ([b4d40a2](https://github.com/groton-school/myschoolapp-reporting/commit/b4d40a2ffb561c763a8e3b6ee73af85f73560107))
* re-type section assignments to map more clearly to API documentation ([36c8ca9](https://github.com/groton-school/myschoolapp-reporting/commit/36c8ca94e2beb4a3cef95cce42f6a501d134d491))
* rewritten as cleaner extension of @oauth2-cli/qui-cli-plugin ([e623f8a](https://github.com/groton-school/myschoolapp-reporting/commit/e623f8a5b3a08a28a832002176e76d2a4e6d1823))


### Bug Fixes

* rename school API to match Blackbaud documentation ([ba25292](https://github.com/groton-school/myschoolapp-reporting/commit/ba25292e37ec66d1b53b5ca6af6ce88af6e6aea6))

## [0.2.2](https://github.com/battis/oauth2-cli/compare/sky-api/0.2.1...sky-api/0.2.2) (2025-09-11)


### Bug Fixes

* update dependencies to address transient openid-client config error ([f0ca9a8](https://github.com/battis/oauth2-cli/commit/f0ca9a8d2bb4551b80a49e48aa43df5ba66a5a9b))

## [0.2.1](https://github.com/battis/oauth2-cli/compare/sky-api/0.2.0...sky-api/0.2.1) (2025-03-15)


### Features

* **sky-api:** add (some) type support for Sky API responses ([de20cf2](https://github.com/battis/oauth2-cli/commit/de20cf24c5d4de71b6e30a89a5812d8e80af44db))

## [0.2.0](https://github.com/battis/oauth2-cli/compare/sky-api/0.1.2...sky-api/0.2.0) (2025-03-09)

### Features

- **oauth2-cli:** detect and warn about reused localhost ports ([3431d84](https://github.com/battis/oauth2-cli/commit/3431d84d47251dd9fba47b23bbfd3dcf653fc7d3))

### Bug Fixes

- **sky-api:** limit excess subscription key copying ([e8a76c8](https://github.com/battis/oauth2-cli/commit/e8a76c814fe9bcbfb7de0ce3b40f7373b3e9787d))
- **oauth2-configure:** remove redundant caching ([7294e6a](https://github.com/battis/oauth2-cli/commit/7294e6a7aec373f72abc7c9e7c2ce4c659e3cba5))

## [0.1.2](https://github.com/battis/oauth2-cli/compare/sky-api/0.1.1...sky-api/0.1.2) (2025-03-08)

### Features

- **oauth2-cli:** export Credentials type for convenience ([f000b56](https://github.com/battis/oauth2-cli/commit/f000b56a587c021d64a294ff33d42fa3966afd38))

### Bug Fixes

- **sky-api:** update from deprecated TokenManager to Client ([3685ede](https://github.com/battis/oauth2-cli/commit/3685edeacd7d5d2b05e4259dcd6f2ae15babb74a))

## [0.1.1](https://github.com/battis/oauth2-cli/compare/sky-api/0.1.0...sky-api/0.1.1) (2025-03-06)

### Patch Changes

- efd09f9: docs: fix broken package paths

## 0.1.0

### Minor Changes

- 6e6a22a: sky-api, bump deps

### Patch Changes

- Updated dependencies [6e6a22a]
  - oauth2-cli@0.1.2
