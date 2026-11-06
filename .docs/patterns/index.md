---
title: Patterns
description: Design rules shared by all ngpel packages.
---

# Patterns

- Ports are abstract classes (contract and DI token in one); adapters are concrete classes.
- Composition: `provide<Feature>(config?, ...features)` plus `with<Option>()` feature factories.
- Views are thin components extending `View<TPresenter>`; presenters own state as signals and expose actions as commands.
- Behaviors are mixins over `ViewPresenter` following the rules in the ViewPresenter Behaviors instruction file.
