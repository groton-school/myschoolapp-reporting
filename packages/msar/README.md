# msar

![NPM Version](https://img.shields.io/npm/v/msar)

(Formerly `myschoolapp-reporting`)

Snapshot course data in Blackbaud's MySchoolApp LMS

This tool was developed to collect the data necessary to generate analytics about how teachers and students are (or are not) using the LMS. It operates by either a) making calls to the old Podium DataDirect front-end API (where possible), or by capturing the data from the updated SKY UX front-end API as it page views are loaded. It does this by using Puppeteer to control Chrome and script all of these interactions. Essentially, you can think of it as "what would happen if I logged in as an admin, clicked around a lot, and took copious notes."

This is a command line tool that depends on [Node.js](https://nodejs.org/) and its (included) `npm` package manager. You need to install Node for this tool to work.

The result of taking a "snapshot" of a course or LMS instance is a JSON file of as much data as can be collected (or as requested).

## Install

You likely want to install this globally:

```sh
npm i -g msar
```

However, you could also sandbox it (and its dependencies) in a directory:

```sh
mkdir path/to/workspace
cd path/to/workspace
echo "{}" > package.json
npm i msar
```

## Usage

This tool uses a command-and-verb model, in which you invoke the command (`msar`: **M**y**S**chool**A**pp **R**eporting) and give it a verb with the arguments that are desired. The command is invoked using the Node command runner `npx`. For example:

```sh
msar snapshot --all https://example.myschoolapp.com
```

At present the following verbs are implemented:

- [`snapshot`](https://github.com/groton-school/myschoolapp-reporting/tree/main/packages/workflows/snapshot#readme) the course data for one or more classes from the LMS to a JSON data file.
- [`archive`](https://github.com/groton-school/myschoolapp-reporting/tree/main/packages/workflows/archive#readme) the supporting files for an existing JSON snapshot file.
- [`inbox`](https://github.com/groton-school/myschoolapp-reporting/tree/main/packages/workflows/inbox#readme) analytics
- [`pronunciation`](https://github.com/groton-school/myschoolapp-reporting/tree/main/packages/workflows/pronunciation#readme) recording downloads

For each command, the `--help` (or `-h`) flag provides usage instructions:

```sh
msar snaphot --help
```

To capture the course information for a single course:

```sh
msar snapshot https://example.myschoolapp.com/app/faculty#academicclass/12345678/0/bulletinboard
```

## Documentation

- [Snapshot Format](./docs/format.md)
- [Cookbook](./docs/cookbook/README.md) of useful data manipulation tricks

## Known Issues

- Actual error-generating issues are tagged [bug](https://github.com/groton-school/myschoolapp-reporting/issues?q=is%3Aissue%20state%3Aopen%20type%3ABug)
- [All other issues](https://github.com/battis/myschoolapp-reporting/issues?q=is%3Aissue%20state%3Aopen%20label%3Amsar%20-label%3Abug) are questions or improvements
- Issues are tagged by command: [snapshot](https://github.com/battis/myschoolapp-reporting/issues?q=is%3Aissue%20state%3Aopen%20label%3Amsar%20label%3Asnapshot), [archive](https://github.com/battis/myschoolapp-reporting/issues?q=is%3Aissue%20state%3Aopen%20label%3Amsar%20label%3Aarchive), [inbox](https://github.com/battis/myschoolapp-reporting/issues?q=is%3Aissue%20state%3Aopen%20label%3Amsar%20label%3Ainbox), [pronunciation](https://github.com/battis/myschoolapp-reporting/issues?q=is%3Aissue%20state%3Aopen%20label%3Amsar%20label%3Apronunciation)
