---
title: Packages
description: Browse all ngpel packages by layer and category.
---

# Packages

Every ngpel package is independently installable from GitHub Packages under the `@pixel-brewery` scope
(`@pixel-brewery/ngpel-<name>`). Packages are cut vertically per concern, and a concern a caller would import
on its own gets a subpath entry point of its own (`/rx`, `/storage`, `/markdown`, …), so consumers only pull
what they import. There is no `/testing` entry point: ngpel ships no test doubles.

<PackagesOverview />
