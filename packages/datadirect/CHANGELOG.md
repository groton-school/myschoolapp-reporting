# Changelog

All notable changes to this project will be documented in this file. See [commit-and-tag-version](https://github.com/absolute-version/commit-and-tag-version) for commit guidelines.

## [0.4.7](https://github.com/groton-school/myschoolapp-reporting/compare/datadirect/0.4.6...datadirect/0.4.7) (2025-12-26)


### Features

* add Photo endpoint ([fcdbf44](https://github.com/groton-school/myschoolapp-reporting/commit/fcdbf44a47d2783e64add0a7534c500ed26899a9))
* add Photocategory endpoint ([106b41e](https://github.com/groton-school/myschoolapp-reporting/commit/106b41e4a3bfbf0ef415114041d4fc08765f1641))
* add videocategory and video/list endpoints ([e0cdf10](https://github.com/groton-school/myschoolapp-reporting/commit/e0cdf101e91d751afd7c67aa4c3725aa6a5bb7ab))
* audio content endpoints ([a8c6ff6](https://github.com/groton-school/myschoolapp-reporting/commit/a8c6ff692de5a164098c5b068ebd030227e1f837))


### Bug Fixes

* replace any with generic JSONValue ([5c2ca40](https://github.com/groton-school/myschoolapp-reporting/commit/5c2ca40d2b6f520c4748f6842c783cea01bffa06))
* update to latest @qui-cli/* ([9abc514](https://github.com/groton-school/myschoolapp-reporting/commit/9abc514e58489409b9d7f1a888ffe254d9822df3))

## [0.4.6](https://github.com/groton-school/myschoolapp-reporting/compare/datadirect/0.4.5...datadirect/0.4.6) (2025-03-25)


### Features

* **datadirect:** api.Rubric.AssignmentRubric ([df3d7f3](https://github.com/groton-school/myschoolapp-reporting/commit/df3d7f398da951f673cec2c836c16560b0ff40d4))

## [0.4.5](https://github.com/groton-school/myschoolapp-reporting/compare/datadirect/0.4.4...datadirect/0.4.5) (2025-03-20)


### Features

* **datadirect:** api.media.AlbumFilesGet ([8994a8d](https://github.com/groton-school/myschoolapp-reporting/commit/8994a8d9eefadef2547eb00af3027e94a54ee041))

## [0.4.4](https://github.com/groton-school/myschoolapp-reporting/compare/datadirect/0.4.3...datadirect/0.4.4) (2025-03-17)


### Features

* api.datadirect.topicget ([ea85cab](https://github.com/groton-school/myschoolapp-reporting/commit/ea85cabba7d171a16c60988c77466a546723b614))
* **datadirect:** api.Assignment2.UserAssignmentDetailsGetAllData.LinkItem & DownloadItem ([a340d9f](https://github.com/groton-school/myschoolapp-reporting/commit/a340d9f5a4fe6876de6202c2556d64455ad24f69))


### Bug Fixes

* add topicget :TopicID path param ([c88d7e1](https://github.com/groton-school/myschoolapp-reporting/commit/c88d7e122e16e987205323d8dce0fee6da1c7f8c))
* **datadirect:** identified a few more static ContentTypes ([8084325](https://github.com/groton-school/myschoolapp-reporting/commit/80843251e4729ea452d96b42d1d290806166925e))
* **datadirect:** update api.datadirect.sectiontopicsget.Item to reflect actual response ([04ba6f7](https://github.com/groton-school/myschoolapp-reporting/commit/04ba6f75239c6b83667fb23d3e16519502b603c8))

## [0.4.3](https://github.com/battis/myschoolapp-reporting/compare/datadirect/0.4.2...datadirect/0.4.3) (2025-03-09)


### Features

* **datadirect:** ContentItem.Text.Photos ([adbbf9a](https://github.com/battis/myschoolapp-reporting/commit/adbbf9ae189f73ce857a0daebd061be2b4589947))

## [0.4.2](https://github.com/battis/myschoolapp-reporting/compare/datadirect/0.4.1...datadirect/0.4.2) (2025-03-05)

- bump dependencies

## [0.4.1](https://github.com/battis/myschoolapp-reporting/compare/datadirect/0.4.0...datadirect/0.4.1) (2025-01-20)

### Features

- **datadirect:** /api/message/conversation/:ConversationId ([e5f83c8](https://github.com/battis/myschoolapp-reporting/commit/e5f83c8c29edde768e209414cde234917096c849))

## [0.4.0](https://github.com/battis/myschoolapp-reporting/compare/datadirect/0.3.0...datadirect/0.4.0) (2025-01-19)

### Features

- **datadirect:** add downloads to assignment creation ([64d0941](https://github.com/battis/myschoolapp-reporting/commit/64d09413769e9b86b1a2121dbe401aedfcb515db))
- **datadirect:** Add optional pageSize prop to endpoint ([e5aed05](https://github.com/battis/myschoolapp-reporting/commit/e5aed051f06f5d68da483888324cf968d7fb3816))
- **datadirect:** add recurring assignments to assignment creation ([16fc8fc](https://github.com/battis/myschoolapp-reporting/commit/16fc8fc03432261c8fe274c1f2a8f8fc88b46a5a))
- **datadirect:** assignment creation endpoints ([183feec](https://github.com/battis/myschoolapp-reporting/commit/183feecd4fcce1e6acb3a44f24553aed5bff1739))
- **datadirect:** create assignment for specific users ([4d67f79](https://github.com/battis/myschoolapp-reporting/commit/4d67f79eda680c3e8fd5234d61889c5e8fe87c29))
- **datadirect:** Endpoint method PUT ([09f5afe](https://github.com/battis/myschoolapp-reporting/commit/09f5afe8e67f78a12163dac8b96b29a1257854c2))

### Bug Fixes

- **datadirect:** assessment/AssessmentGetSpa import ([4903538](https://github.com/battis/myschoolapp-reporting/commit/490353851936aade7bbc1ee8647ad4d5e245f131))
- **datadirect:** Conversation.Messages possibly undefined ([f1b7a63](https://github.com/battis/myschoolapp-reporting/commit/f1b7a635305f39a1e6a8c67223bccf8e6260594f)), closes [#196](https://github.com/battis/myschoolapp-reporting/issues/196)
- **datadirect:** document pageSize ([93c00cd](https://github.com/battis/myschoolapp-reporting/commit/93c00cd6f30f20836cb3b8d4285ac51ea21bb49d)), closes [#193](https://github.com/battis/myschoolapp-reporting/issues/193)

## [0.3.0](https://github.com/battis/myschoolapp-reporting/compare/datadirect/0.2.2...datadirect/0.3.0) (2025-01-10)

### ⚠ BREAKING CHANGES

- **datadirect:** Endpoint moves to root
- abstract types and Puppeteer session management

- **datadirect:** Endpoint moves to root ([f7b9533](https://github.com/battis/myschoolapp-reporting/commit/f7b9533df65a3f47150d82b7f32a465e1bb50d7a))

### Features

- abstract types and Puppeteer session management ([bf1916d](https://github.com/battis/myschoolapp-reporting/commit/bf1916d2b6f8460d430e3caf0341f2810240ae23))
- Add LtiTool API ([7c0e35e](https://github.com/battis/myschoolapp-reporting/commit/7c0e35e1254805098117a531ebc035fad243304d))
- Add schoolinfo API ([019a960](https://github.com/battis/myschoolapp-reporting/commit/019a960848300f66afbf69fb2a6e18c31b65cfb4))
- ContentItem.Content types ([6d99701](https://github.com/battis/myschoolapp-reporting/commit/6d99701dbe30cb93d0a481c3da3f19e1b7b7383f)), closes [#73](https://github.com/battis/myschoolapp-reporting/issues/73)
- **datadirect:** Add message/inbox endpoint ([e717c46](https://github.com/battis/myschoolapp-reporting/commit/e717c468a2c0de72b7bfc3ef708edbd43b213bdf))
- **datadirect:** Add Security/ImpersonateStart endpoint ([1e8bdc1](https://github.com/battis/myschoolapp-reporting/commit/1e8bdc1437f1ca2d569ece0a2f8592612fc4a2f1))
- **datadirect:** Add Security/ImpersonateStop endpoint ([c0c1f05](https://github.com/battis/myschoolapp-reporting/commit/c0c1f05474d6ffb98eeeea33b23a0807cd167313))
- **datadirect:** api.webapp.context ([b3132b4](https://github.com/battis/myschoolapp-reporting/commit/b3132b4c834c930d1e1843b6c0bf13a259c96296))
- Handle topic cover info ([bc5cadf](https://github.com/battis/myschoolapp-reporting/commit/bc5cadffe6b07fbb1e3142f4295b5bd7297fcdf0))
- Remove SKY APi dependency, —no-studentData ([92a0902](https://github.com/battis/myschoolapp-reporting/commit/92a0902fd038bfcef5563b6b238c69728ba32b45)), closes [#59](https://github.com/battis/myschoolapp-reporting/issues/59)

### Bug Fixes

- **datadirect:** Events verified ([263959d](https://github.com/battis/myschoolapp-reporting/commit/263959d595877c2e57439d525696e325af813ea4)), closes [#44](https://github.com/battis/myschoolapp-reporting/issues/44)
- **datadirect:** Gradebook types ([8b46b58](https://github.com/battis/myschoolapp-reporting/commit/8b46b58a34d8d8de853aeb4d886f5d581ddc6c1e)), closes [#42](https://github.com/battis/myschoolapp-reporting/issues/42) [#69](https://github.com/battis/myschoolapp-reporting/issues/69) [#52](https://github.com/battis/myschoolapp-reporting/issues/52)
- **datadirect:** Typo ([bf6d2d5](https://github.com/battis/myschoolapp-reporting/commit/bf6d2d578ea31cf9d8a76244e8c2eddb2e915879))
- **datadirect:** Update AssignmentCenterCourseListGet to match actual payload ([26f06ab](https://github.com/battis/myschoolapp-reporting/commit/26f06abac9f3fb38a4a26d7e83e83d586349dcc2))

## 0.2.2

### Patch Changes

- Switch repos (again, returning) ([04ba39a](https://github.com/battis/myschoolapp-reporting/commit/04ba39a1b9dedbbf4866381c359f9a266212a6f6))
