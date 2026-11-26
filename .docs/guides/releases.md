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
5. The native token's branch/PR writes do not start ordinary push/PR workflows.
   The job explicitly dispatches full read-only CI with `expected_head_sha` for
   that candidate. CI rejects another selected revision before checkout. Existing
   genuine queued, running or failed exact-head attempts are retained.
6. Only the current successful CI attempt, its actual complete job, effective
   protection and unchanged source/head permit a normal SHA-guarded squash merge.
   The final closed/merged PR state is confirmed. The actual main commit must have
   the same tree as the prepared candidate and the original source as its parent;
   a human merge may additionally retain the candidate as its second parent.
7. The existing `release-main` publisher verifies the artifact again and binds it
   to that actual merged main commit. It pushes only the version tag, never a
   metadata commit directly to protected `main`. Registry versions with identical
   integrity are resumed; different bytes stop publication. Downloaded registry
   tarballs must match the tested archives before the GitHub Release is announced.

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
Related package families are grouped rather than ignored. A bounded reconciler
refreshes stale same-repository Dependabot branches with `expected_head_sha`, waits
for the replacement and explicitly verifies its exact new head. Conflicts block one
candidate while the remaining inventory continues. Approval-pending PR runs do not
suppress explicit verification; genuine failed attempts remain visible.

A manually dispatched verification must map uniquely to the actual current
same-repository bot PR. The merger re-reads its run, attempt, PR, tested head and
current main before asking GitHub to merge. The final merged state is confirmed.
Strict branch protection remains the atomic guard if main moves during that request.

A native-token merge explicitly continues main CI with `expected_head_sha`, the
existing patch release with `source_sha`, and the existing documentation workflow
with `expected_head_sha`. Workflow IDs, positive run IDs/attempts, repository, branch,
path and exact source are checked before treating a run as an existing request.
Existing successful, failed and cancelled runs are not replaced by duplicate
publication requests. A superseding main revision stops a new dispatch.
Documentation keeps its original all-main-push behavior and the existing
`NGPEL_PAGES_ENABLED` gate; it checks the selected revision and current main before
deployment. The actual metadata merge also continues main CI/documentation, so
native token suppression does not leave the published version without those hooks.
Release completion and an hourly fallback reconcile dependency PRs after release
metadata advances the base.

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
