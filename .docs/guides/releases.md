---
title: Releases and public handover
description: How to version, publish and verify the ngpel packages and documentation.
---

# Releases and public handover

The five libraries share one Nx release group. Package names and published versions stay in
the `@pixel-brewery` scope on GitHub Packages. The workspace manifest is private; only the
library distributions are released.

## Prepare the private repository

1. Seed a new private `pixel-brewery/ngpel` repository from the reviewed source snapshot.
   Push only its root commit to `main`. Do not import old tags, pull request refs or
   releases. Verify the new repository's refs and CI before enabling public visibility.
2. In [GitHub Packages](https://github.com/orgs/pixel-brewery/packages), inventory the five
   `ngpel-*` packages. Under **Manage Actions access**, grant `pixel-brewery/ngpel`
   **Write** on each existing package in the release group. The first release creates the
   missing packages. The publication workflow uses the repository's scoped `GITHUB_TOKEN`.
3. Restrict the `release-main` and `github-pages` environments to `main`.

## Finish the public handover

The repository owner changes the repository visibility to **Public**.

1. Apply the [main ruleset](https://github.com/pixel-brewery/ngpel/blob/main/.github/repository-rules/main-protection.json).
2. On each existing package's landing page, connect `pixel-brewery/ngpel` as the source
   repository if it is still unlinked. Preserve existing versions and download permissions.
3. For the [documentation site](https://pixel-brewery.github.io/ngpel/), set Pages source to
   **GitHub Actions**, set `NGPEL_PAGES_ENABLED=true` as a repository Actions variable and run
   **Publish documentation** on `main`. After that, pushes to public `main` refresh the site.

GitHub manages npm package visibility separately from repository visibility. New packages
default to **Private**. Check that all five packages are **Public** before announcing the
release. Public GitHub npm packages still require an authenticated registry client.

## Continuous package releases

A push to `main`, including a pull request merge, starts **Release ngpel packages** in the public
`pixel-brewery/ngpel` repository. The workflow prepares the next patch version with Nx, updates the
internal peer ranges and lockfile, and verifies the versioned sources. An Angular consumer builds
against the same five tarballs that the workflow later uploads to GitHub Packages.

The publisher checks that `main` still points to the triggering commit before pushing the verified
metadata commit and tag together. It checks each registry version, downloads the published archives
and compares their bytes with the tested tarballs before creating the GitHub Release.

The publication job runs in the main-only `release-main` environment. The repository token can push
the metadata commit when branch rules permit it. For protected `main`, configure the approved
release GitHub App using `RELEASE_APP_ID` and the `RELEASE_APP_PRIVATE_KEY` environment secret.
Package publication continues to use the workflow token.

Dependabot refreshes its pull request branches. After CI verifies a current Dependabot commit,
the merge workflow squash-merges that commit and requests a release for the resulting revision.

## Recover a release

If publication is interrupted, rerun the failed job from the same run while its verified artifact
is available and `main` still points to the release commit. The publisher reuses matching registry
uploads and stops if a published version has different bytes.

An owner can dispatch the workflow for a specific increment or exact next version. Use
`yarn release:first:dry-run` before the first tag or `yarn release:dry-run` afterwards to preview local
version changes. Use `yarn release:verify` to verify the published versions from an authenticated
registry client.
