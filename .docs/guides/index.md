---
title: Guides
description: Getting started with ngpel packages.
---

# Guides

## Getting started

1. Configure the `@pixel-brewery` scope for GitHub Packages in your `.npmrc`:

    ```ini
    @pixel-brewery:registry=https://npm.pkg.github.com
    //npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}
    ```

2. Set `NODE_AUTH_TOKEN` to a GitHub personal access token (classic) with `read:packages`. GitHub
   requires authentication even for public npm packages. For Yarn 4, see the
   [registry configuration in the README](https://github.com/pixel-brewery/ngpel#configure-package-access).
3. Install the packages you need, for example `@pixel-brewery/ngpel-core`.
4. Compose providers in your application configuration with the `provide<Feature>(...with<Option>())` pattern.

## Migration

- [Migrate presentation and reactive helpers to ngpel](patterns-and-practices).

## Maintenance

- [Prepare and verify a package release](releases).
