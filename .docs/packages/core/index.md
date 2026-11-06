---
title: '@pixel-brewery/ngpel-core'
description: 'Application foundation: the provide<Feature>(...with<Option>()) composition kernel, the RFC 9457 result envelope and the cross-cutting runtime services every product re-solves.'
package: '@pixel-brewery/ngpel-core'
category: 'Foundation'
order: 0
---

# @pixel-brewery/ngpel-core

Application foundation: the composition kernel every other package builds on, the RFC 9457 result envelope, and the cross-cutting runtime services each product used to re-solve.

## Entry points

| Entry point                                 | Public symbols | Peer dependencies                                  |
| ------------------------------------------- | -------------- | -------------------------------------------------- |
| `@pixel-brewery/ngpel-core`                 | 37             | `@angular/core`                                    |
| `@pixel-brewery/ngpel-core/rx`              | 13             | `@angular/core`, `rxjs`                            |
| `@pixel-brewery/ngpel-core/storage`         | 35             | `@angular/core`                                    |
| `@pixel-brewery/ngpel-core/browser`         | 26             | `@angular/core`                                    |
| `@pixel-brewery/ngpel-core/notification`    | 29             | `@angular/core`, `rxjs`                            |
| `@pixel-brewery/ngpel-core/update`          | 31             | `@angular/core`, `@angular/service-worker`, `rxjs` |
| `@pixel-brewery/ngpel-core/audio`           | 50             | `@angular/core`, `rxjs`                            |
| `@pixel-brewery/ngpel-core/search`          | 37             | `@angular/core`, `rxjs`                            |
| `@pixel-brewery/ngpel-core/operation-queue` | 31             | `@angular/core`, `rxjs`                            |

Every entry point is tree-shakable on its own: importing one never pulls the code of another.

## Quick start

```typescript
import { type ApplicationConfig } from '@angular/core';
import { composeProviders, createFeature, featureKind, type IFeature } from '@pixel-brewery/ngpel-core';

type ThemeKind = 'palette';
const ThemeKinds = { Palette: featureKind<ThemeKind>('palette') } as const;

export function withPalette(name: string): IFeature<ThemeKind> {
    return createFeature('palette', ThemeKinds.Palette, [{ provide: PALETTE, useValue: name }]);
}

export function provideTheme(...features: ReadonlyArray<IFeature<ThemeKind>>): EnvironmentProviders {
    return makeEnvironmentProviders(composeProviders([ThemeService], features));
}

// Composed once in the application configuration:
export const appConfig: ApplicationConfig = { providers: [provideTheme(withPalette('joy'))] };
```

## What stays in the application

Environment values, API roots, themes, translation keys, permission catalogues and every product feature registration stay in the application.

## API reference

The generated reference lives under [api/](./api/) and is rebuilt with `yarn nx run core:docs`.
