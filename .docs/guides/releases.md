---
title: Releases and public handover
description: Protected dependency updates, immutable package releases and documentation continuation.
---

# Releases and public handover

The four libraries share one Nx release group. Public package names remain in the
`@pixel-brewery` scope on GitHub Packages; the workspace and repository tooling stay
private packages. A normal authorized source merge starts the existing automatic
release. Manual release dispatch, package publication and visibility changes retain
the owner's separate authorization.

## Protection and installation prerequisites

The checked-in [main ruleset](../../.github/repository-rules/main-protection.json)
requires pull requests, resolved review conversations, preserved history and the
strict current `Lint, Typecheck, Test & Build` check from GitHub Actions integration 15368. It has no bypass actors. The automation reads the effective rules and refuses
an automatic merge if the PR rule or this actual strict CI requirement is absent.
The repository's public identity is also checked by immutable ID 1447827206, name,
default branch and visibility; matching a repository name alone grants nothing.

Keep workflow-default token permissions restricted to read. GitHub's combined
**Allow GitHub Actions to create and approve pull requests** repository setting is
needed for the metadata PR to be created with the existing `GITHUB_TOKEN`. The
implementation never requests or submits a review, and this setting does not
replace required reviews, status checks or branch rules. No release App, PAT or new
secret is required by the protected metadata path. The existing main-only
`release-main` and `github-pages` environments remain in use.

Installations retain the repository's package-read access. Existing ngpel package
publication uses the same workflow token and existing package Actions grants.
Package visibility and repository visibility are separate settings; this migration
does not modify either of them or grant new registry credentials.

## One verified artifact and a protected metadata PR

1. A public `main` push or an explicitly authorized release dispatch selects one
   exact source. An automatic request supplies `source_sha`; a different selected
   or superseding main revision stops preparation. A verified release-metadata
   merge is recognized and does not recursively increment another patch version.
2. The read-only preparation job resolves the next version once through Nx,
   updates internal peer ranges, changelogs and the lockfile, and runs full
   `verify:ci`. Its Angular consumer exercises the actual package tarballs.
3. The release owner permits only the existing metadata paths: root changelog and
   lockfile, plus package manifests, changelogs and READMEs. It creates one candidate
   whose sole parent is the source and records that source, candidate, version and
   exact archive checksums in an immutable artifact named for the original run ID.
   The upload is not overwritten by a later preparation attempt.
4. A trusted native-Node metadata job imports and verifies that artifact without
   installing dependencies. It pushes only the source-bound
   `release/ngpel/<source-sha>` branch and creates one GitHub Actions metadata PR.
   Its complete JSON body contains exactly `source`, `candidate`, `version` and
   `runId`; the actor ID, same-repository head/base, branch and record are checked.
5. GitHub creates an approval-pending native PR CI for native-token metadata.
   A separate original-artifact-bound authorization job verifies the same bundle
   and archive hashes, all four record fields and M/B/C against the reviewed CI
   policy. Its token has Contents/PR read and Actions write only. It authorizes
   the actual service-run CI through GitHub's approval endpoint, without a PR
   review, replacement check or diagnostic dispatch. The metadata integration job
   has Actions read and retains its source/PR writes; only it can request a merge.
6. Only the current successful CI attempt, its actual complete job, effective
   protection and unchanged source/head permit a normal SHA-guarded squash merge.
   The final closed/merged PR state is confirmed. The actual main commit must have
   the same tree as the prepared candidate and the original source as its parent;
   a human merge may additionally retain the candidate as its second parent.
7. A separate read-only-source publication-continuation job re-verifies the same
   original artifact and actual merged PR/tree before requesting main CI and
   documentation. The existing `release-main` publisher waits for that accepted
   continuation, verifies the artifact again and binds it
   to that actual merged main commit. It pushes only the version tag, never a
   metadata commit directly to protected `main`. Registry versions with identical
   integrity are resumed; different bytes stop publication. Downloaded registry
   tarballs must match the tested archives before the GitHub Release is announced.

The isolated authorization job can start before the parallel metadata owner uploads
its prepared candidate. It waits only for the exact own-candidate association endpoint
returning `404 Not Found`, or `422` with `No commit found for SHA: <verified-candidate>`.
The original verified artifact supplies that candidate and current main must still be
its source. This consumes the existing bounded ninety polls at thirty seconds; the
deadline is never restarted. Other endpoints, commit IDs, permission errors, malformed
responses and all subsequent provenance/source/run checks retain their failure rules.
Nothing is approved until the complete original-candidate and native-CI proof succeeds.

A superseding source, changed record/head, metadata containing runtime changes,
missing protection, failed real CI, ambiguous association or unequal publication
tree stops the affected candidate without bypassing rules or preparing a hidden
replacement. Its original run/artifact remain available for diagnosis. A newer
ordinary source has its own normal release request.

The canonical private Nx plugin is the existing `infra/nx-plugins` owner. Its
`dependabot` and `release` executors have typed options, schemas and external
operations with caching disabled. Privileged jobs bootstrap the same owned implementations
through native Node so no workspace dependency or PR artifact executes with write
permissions. This preserves the existing plugin layout while mapping to the shared
repository-tooling convention.

## Dependency and documentation continuation

All npm and GitHub Actions update types, including majors, TypeScript and published
Pixel Brewery packages, use the complete real CI and ordinary protected merge.
Related package families are grouped rather than ignored. The private
`infra/nx-plugins` owner shares this proof for dependency PRs and source-bound
release metadata PRs. The latter additionally require the verified original
artifact's exact source/candidate/version/runId record, fixed metadata paths,
sole-parent prepared commit and equivalent actual publication tree.

The privileged controller executes only the trusted default-branch Nx owner,
without installing workspace dependencies or executing PR code or PR artifacts.
Its `merge`, `reconcile`, `authorize` and `continue` operations are non-cacheable.
Branch refresh and merge have Contents/PR write with Actions read. A separate
`authorize` job has only Contents read, PR read and Actions write. It approves
workflow execution through GitHub's native run-approval endpoint; it creates no
PR review, status, check or branch-rule exemption.

Reconciliation after verification/release completion and hourly checks bounded
same-repository bot inventories. A stale branch uses `expected_head_sha` and waits
for the replacement. Only real `pull_request` CI is merge proof. If it is waiting
for execution approval, the isolated authorizer verifies the exact Dependabot or
GitHub Actions service identity of both run actors before one approval request.
A missing native run remains pending. Manual diagnostic `workflow_dispatch` runs
remain available but cannot satisfy protected PR checks or shadow a native run.
Conflicts, real failures and rejected approvals retain the affected PR and attempt.

The isolated authorization job waits for branch reconciliation before reading the
complete bounded current open bot inventory. Every permitted maintenance trigger,
including completed own CI and release runs, inspects those current candidates;
the triggering run's old head, conclusion or attempt does not replace any
candidate's source and native-attempt proof. Approval after a refresh therefore
does not depend on another workflow notification. The hourly pass remains a
fallback for an interrupted event or a not-yet-visible native run.

For every approval and merge, M is current protected main, B the unchanged bot
head, and C GitHub's actual `refs/pull/<number>/merge` commit. The owner checks
unique own-repository PR association, M as ancestor of B, C's ordered parents
[M, B] and C's tree equal to B. Source blobs are verified by Git object digest.
Only the fixed reviewed read-only CI baseline in trusted-main
`verificationPolicy.reviewedCiSha256` authorizes execution: its normalized main
SHA-256 must match that constant, and normalized PR CI must equal normalized main.
Normalization changes only full 40-character action pins with the same action
owner/path and optional SemVer comments. CI logic, scopes, secrets or syntax edits
require a conscious read-only review and explicit policy-digest update; no runtime
or PR input learns a new baseline. This positive review proof does not rely on a
partial YAML parser.

The latest eligible native run is selected independently of diagnostics and its
actual current `run_attempt` is reloaded. All actual jobs must succeed. Ordinary
maintainer-triggered native CI on the bot PR is valid after the same complete
source proof. A later reconciliation re-enters the full merger after a transient
skip, never a reduced path. Workflow/run/PR/M/B/C/protection are re-read immediately
before the ordinary SHA-guarded squash request. GitHub's strict required checks
remain the final merge authority; the actual closed, merged PR is then confirmed.

Confirmed merge outputs from either reconciliation or the CI event reach a
separate continuation job. Recovery resolves the current main commit association
and reads the full PR with `merged: true`; missing confirmation starts nothing.
Main verification receives `expected_head_sha`, and the existing patch release
retains `source_sha`. Existing exact-source main `push` or `workflow_dispatch` runs
are retained in every state, including queued, failed and cancelled. Diagnostic
branch runs do not suppress them. Every new request rechecks current main; a
superseding revision stops it. Interrupted requests can therefore be retried
without merging twice or preparing a duplicate release. Failed releases retain
their original source and artifact instead of receiving a blind new dispatch.

Documentation preserves its all-main-push trigger and `NGPEL_PAGES_ENABLED` gate.
The publication continuation uses a separate minimal-scope job, not the metadata
mutator. Both the metadata authorizer and continuation download the exact original
run's artifact; neither installs dependencies, prepares versions or publishes.

## Recover the retained run

The metadata job waits for at most 90 polls separated by 30 seconds. If real CI is
still pending, the specifically named pending step fails and preserves the PR,
artifact and source. When that exact canonical CI attempt subsequently succeeds,
the trusted continuation checks its complete job, metadata provenance, current
protection, original source, original pending failure and unexpired source-bound
artifact. It reruns only failed jobs and their dependents in the original release
run. It never dispatches another release or repeats successful version preparation.
Release completion and the hourly fallback also inspect the single current-source
metadata branch and the current main commit association. This covers CI completing
just before the pending job becomes failed, and a later human metadata merge.
Recovery and direct CI notifications share one serialization group; only the
latest actual candidate CI attempt is considered. A previously merged candidate
is resolved through its verified closed PR even when GitHub has automatically
deleted its branch; recovery never recreates that branch.
[GitHub preserves the original source/ref and successful job outputs for these retries](https://docs.github.com/en/actions/how-tos/manage-workflow-runs/re-run-workflows-and-jobs).

Cancelled runs, preparation failures, publication failures, real failed checks,
expired artifacts, changed candidates and superseding sources are retained for
inspection. They are not blindly retried or approved. An owner can recover the
original failed publication job while its verified artifact is available and main
still points to the actual publication commit; matching registry uploads are reused.

An explicitly authorized owner may dispatch a specific increment or exact next
version. `yarn release:dry-run` previews versioning and `yarn release:verify` checks
the served package versions with an authenticated registry client. Neither command
is substituted for the protected automatic source path.
