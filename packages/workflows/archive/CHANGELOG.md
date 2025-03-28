# Changelog

All notable changes to this project will be documented in this file. See [commit-and-tag-version](https://github.com/absolute-version/commit-and-tag-version) for commit guidelines.

## [0.1.6](https://github.com/groton-school/myschoolapp-reporting/compare/archive/0.1.5...archive/0.1.6) (2025-03-25)


### Features

* **archive:** replace process.cwd() with Root.path() for better reusability ([b2cec4c](https://github.com/groton-school/myschoolapp-reporting/commit/b2cec4cf6a15d483290e26be2e3582632e7901ec))


### Bug Fixes

* **archive:** redundant spinner ([6712d3e](https://github.com/groton-school/myschoolapp-reporting/commit/6712d3ec034abdb6a28bf3273e8f9340bec65c77))

## [0.1.5](https://github.com/groton-school/myschoolapp-reporting/compare/archive/0.1.4...archive/0.1.5) (2025-03-20)


### Bug Fixes

* **archive:** archive *.myschoolcdn.com paths ([82dbc35](https://github.com/groton-school/myschoolapp-reporting/commit/82dbc35f8e3a88612d9a97a5ff63c70425dc35d2))
* **archive:** avoid name collisions ([1424bcb](https://github.com/groton-school/myschoolapp-reporting/commit/1424bcb5bbd41e252867bf2433d5e834c2b24078))

## [0.1.4](https://github.com/groton-school/myschoolapp-reporting/compare/archive/0.1.3...archive/0.1.4) (2025-03-17)


### Features

* **archive:** archive topic downloads ([c2003d2](https://github.com/groton-school/myschoolapp-reporting/commit/c2003d2965d0e0ab059721f72e74898ec8685e5d))

## [0.1.3](https://github.com/groton-school/myschoolapp-reporting/compare/archive/0.1.2...archive/0.1.3) (2025-03-17)


### Features

* **archive:** lazy load downloaders ([4de7c03](https://github.com/groton-school/myschoolapp-reporting/commit/4de7c03fbca0ae6661fa308e290d08cac36b9890))
* **archive:** retry partial or reconfigured archive ([0e9d809](https://github.com/groton-school/myschoolapp-reporting/commit/0e9d809e0b47348a60325ab7ef965890ca69500c))


### Bug Fixes

* **archive:** download attachments, topic cover images ([d3d54b2](https://github.com/groton-school/myschoolapp-reporting/commit/d3d54b22b531103921553a20a2ce26bacf60bb63)), closes [#256](https://github.com/groton-school/myschoolapp-reporting/issues/256) [#257](https://github.com/groton-school/myschoolapp-reporting/issues/257)

## [0.1.2](https://github.com/groton-school/myschoolapp-reporting/compare/archive/0.1.1...archive/0.1.2) (2025-03-12)


### Bug Fixes

* **archive:** honor include/exclude directives ([62b36fe](https://github.com/groton-school/myschoolapp-reporting/commit/62b36feadad43965b6f820b9c5cbcb390c4280a4))
* **archive:** stop rate-limiting building the download queue ([11a6ddd](https://github.com/groton-school/myschoolapp-reporting/commit/11a6dddb6f30b0ba6fecf2410868a37f3106827b))
* **archive:** suppress extraneous cache file output ([0f3f50e](https://github.com/groton-school/myschoolapp-reporting/commit/0f3f50e5a533d020bd20dc71d7d35022d4707d6a))

## [0.1.1](https://github.com/groton-school/myschoolapp-reporting/compare/archive/0.1.0...archive/0.1.1) (2025-03-11)


### Features

* **snapshot,snapshot-multiple,archive:** shared rate-limiting queue ([335d143](https://github.com/groton-school/myschoolapp-reporting/commit/335d143b8a22fcd28964c30a09bd821dc544cdf7))


### Bug Fixes

* **archive:** relax peer dependency versioning ([df1d9fb](https://github.com/groton-school/myschoolapp-reporting/commit/df1d9fba855c7e2f6aef01c8dee4fa1eab6b8264))

## 0.1.0 (2025-03-05)


### Bug Fixes

* **download:** host detection error ([6033783](https://github.com/battis/myschoolapp-reporting/commit/6033783c07cc887ea1bbae0e19a07947fa97af7c))
* **download:** more flexible user/topic thumbnail names ([72fad87](https://github.com/battis/myschoolapp-reporting/commit/72fad87f8c7e4f158794dcc76d86cfd5c87860f2))
