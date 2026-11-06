---
title: 'Open decisions'
description: 'Decisions surfaced while porting the packages that need a maintainer signature before the first release.'
---

# Open decisions

Questions raised during the port that a maintainer must settle. Each entry names the packages it
blocks so it can be closed before that surface freezes.

## Contracts

| #   | Decision                                                                                                                                                         | Raised by | Impact                                                                                                       |
| --- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ------------------------------------------------------------------------------------------------------------ |
| 1   | `IProblemDetail.type` and `.detail` are optional here; Archipel's producer requires `type/title/status/detail`.                                                  | `core`    | Agree on the contract before an HTTP package or OpenAPI generator adopts it.                                 |
| 2   | `isProblemDetail` accepts a body with `title` plus a numeric `status` **or** a textual `detail`, in addition to `Content-Type` detection.                        | `core`    | The `http` interceptor and the API generator must use the same rule.                                         |
| 3   | Resolved: `onceOn` keeps its subscription active until completion, error or cancellation, and returns a cancellable `Subscription` with an `.observable` handle. | `core`    | A caller that needs exactly one emission passes `source.pipe(take(1))`.                                      |
| 4   | ngpel does not currently ship an `EventHub`. Archipel has a typed `EventHub` for backend use.                                                                    | `core`    | Any frontend equivalent needs a contract and a home package.                                                 |
| 5   | `rxjs` is a hard peer of `core` although only `./rx` imports it.                                                                                                 | `core`    | Making it optional would spare consumers of `.` and `./angular`; the peer allow-list currently forbids that. |
| 6   | `BusyScopeService` is root-provided; the products previously wired it through `provideCore()`.                                                                   | `core`    | Confirm the default or revert to an explicit provider.                                                       |

## Markdown

| #   | Decision                                                                                                                                                                                           | Impact                                                                                         |
| --- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| 7   | Should `::: button` hrefs pass through `cleanExternalUrl`? It closes a `javascript:` vector for hosts that bypass the sanitizer but drops the relative in-app targets `markdowner-core` documents. | Security versus documented feature.                                                            |
| 8   | `renderPlainMarkdown` overrides `link` but passes `<img src>` through, assuming the host sanitizer stays active.                                                                                   | Five-line change plus two specs to make the plain path self-sufficient.                        |
| 9   | The emitted markup uses the Mosaik element vocabulary as strings while the package has no Mosaik dependency.                                                                                       | Confirm this is acceptable; `renderPlainMarkdown` is the alternative for hosts without Mosaik. |

## Conventions

| #   | Decision                                                                                                                               | Impact                                                                                                         |
| --- | -------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| 10  | Does the `// #region Imports` rule apply to files without imports? Current practice omits the region; no empty region exists anywhere. | Settle once and add a lint rule if it should be enforced.                                                      |
| 11  | Formatting is not one of the four verification gates, so `prettier --check` fails on scaffold-owned files.                             | Either run `yarn format` once at workspace level or make package authors format `libs/<pkg>/**` before review. |

## Process

| #   | Decision                                                                                                                         | Impact                                                                                    |
| --- | -------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| 12  | `tools/fix-docs-frontmatter.mjs` is not wired into any target, and the manifest generator's naive parser tolerates invalid YAML. | Wire the fixer or a `gray-matter` check into the docs target so the defect cannot return. |
