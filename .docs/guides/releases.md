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

To start the first release when the owner makes the source public, set `NGPEL_LAUNCH_SHA` to
the exact verified commit after the existing packages have granted Actions write access. The
`public` event is bound to that commit in the Pixel Brewery repository. Without that variable,
use the manual release dispatch after the settings are ready.

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

## Prepare a release

The public source snapshot already prepares `0.0.2` for all five libraries. Before publishing
it, confirm that version is still unused across the group. Existing `0.0.1` archives remain
available under their original package names.

Once the public repository has a version tag, prepare the next version locally:

```sh
yarn release:dry-run
yarn release:nx --specifier=patch
```

For a snapshot without a preceding tag, preview the next version with
`yarn release:first:dry-run`. Version preparation updates the manifests, internal peer ranges,
lockfile and changelogs without creating a commit, tag or package release. Merge the reviewed
version through the usual pull request and CI checks.

## Publish and verify

1. Run **Publish Packages** on public `main` with the prepared version or use
   `yarn release:patch`, `yarn release:minor` or `yarn release:major` for the corresponding
   version increment. The workflow checks the successful CI run and current public `main`,
   then publishes and downloads the same archives for byte comparison.
2. Set newly created packages to Public and rerun the announcement job if it is waiting for
   visibility. Install all five packages in a consumer using a classic token
   with `read:packages` that has no special access to the organization, and check that the
   documentation site and API reference load.
3. The workflow creates the GitHub Release and its tag after confirming package visibility.
   Use `yarn release:verify` for a read-only registry check. `yarn release:publish` is a live
   maintainer recovery command and requires explicit publication authorization.

If a publish is interrupted, retry the failed job from the same run while the artifacts
are available and `main` still points to that release. The job reuses matching uploads and
stops if a registry version has different bytes.
