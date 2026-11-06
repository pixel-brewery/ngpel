# ngpel — Agent Guide

ngpel is an Nx monorepo of published Angular libraries `@pixel-brewery/ngpel-<name>` — the frontend sister of Archipel.

## Git delivery and completion

- Implementation and fix requests include task-scoped commits and pushes to the permitted
  integration branch, unless the owner requests analysis, a draft or local-only work.
  Inspect protection and workflow effects first; use a `codex/` branch and PR when required,
  and remain responsible through the requested merge. Extra clones or worktrees need a
  specific request. Releases and package publication remain owner-controlled.
- Assign one owner for staging, commits and refs. Parallel agents may edit disjoint files
  under that owner's coordination. Inspect and preserve existing unrelated work before
  staging; never silently include another task's changes.
- Run an available local Ship-it review before creating a PR, resolve blockers and verify
  checks at its current head. Do not bypass checks or weaken protection. A requested merge
  requires GitHub's `MERGED` state and its result on the destination branch.
- Finish with no staged, unstaged or non-ignored untracked changes, and safely synchronize
  retained local branches with their own upstreams. Remove temporary branches or worktrees
  only after proving integration and preserving unique commits and necessary local data.
  Keep permanent integration branches and the designated checkout; never discard work.
- Report unfinished delivery and its concrete blocker. This policy does not authorize
  releases, deployment, visibility changes or protected-history rewrites.

## Issue tracking

- Use the [ngpel GitHub project board](https://github.com/orgs/pixel-brewery/projects/13) as the backlog for confirmed defects and approved follow-up work. File tickets as issues in `pixel-brewery/ngpel` and add each issue to the board explicitly.
- Check the board and existing open and closed issues for duplicates before filing. Read the board's current status options and verify that each issue appears once with the intended status.

## Quick reference

| Action                              | Command                                                                    |
| ----------------------------------- | -------------------------------------------------------------------------- |
| Install                             | `yarn install --immutable`                                                 |
| Build / test / lint / typecheck all | `yarn build` / `yarn test` / `yarn lint` / `yarn typecheck`                |
| One package                         | `yarn nx run <name>:build` (also `:test`, `:lint`, `:typecheck`, `:docs`)  |
| Scaffold a package or entry point   | edit `tools/packages.json`, then `node tools/scaffold-packages.mjs <name>` |
| Re-render a package's docs          | edit `tools/docs-content.mjs`, then `node tools/render-package-docs.mjs`   |
| Verify everything                   | `yarn verify`                                                              |

## Packages

| Layer | Package  | Entry points                                                                        |
| ----- | -------- | ----------------------------------------------------------------------------------- |
| 0     | `core`   | `.`, `/rx`, `/storage`, `/browser`, `/notification`, `/update`, `/audio`, `/search` |
| 0     | `mvp`    | `.`                                                                                 |
| 1     | `forms`  | `.`                                                                                 |
| 1     | `router` | `.`, `/navigation`, `/shell`                                                        |
| 2     | `ui`     | `.`, `/markdown`, `/widget`                                                         |

## Invariants

- Sibling product and library repositories are read-only references. Never modify them from this workspace.
- Layering: a package imports only packages of a strictly lower layer (`layer:N` tags, enforced by ESLint). `core` and `mvp` import nothing from ngpel; `ui` sits above the platform services because its navigation components use `router`.
- Mosaik (`@pixel-brewery/mosaik-elements-angular`, `-foundation`) and CodeMirror are optional peers of `ui` only; no other package may import them. `tools/postbuild-package.mjs` enforces it.
- `@pixel-brewery/mosaik-themes` supplies SCSS only. It is a devDependency: `ui` sets `inlineStyleLanguage: 'scss'`, so the theme mixins are compiled into the published stylesheet.
- A secondary entry point earns its place only when a consumer would import it on its own and would otherwise pay for code it never uses. Everything else lives in the package's primary entry point.
- All code lives in `libs/<pkg>/src/`. A secondary entry point is a marker directory `libs/<pkg>/<entry>/` holding only an `ng-package.json` whose `entryFile` points at `../src/<entry>/index.ts`.
- ngpel ships no test doubles: there is no `./testing` entry point and no `spec-support/` directory. A helper a spec needs lives in that spec file.
- A file never imports its own entry point's specifier (ng-packagr calls that a circular entry point): relative inside an entry point, package specifier across entry points.
- Angular cannot resolve interface-typed constructor parameters. Declare such collaborators through the `useFactory` of the `@Injectable` decorator, which also keeps the class constructible in specs without TestBed.
- `sideEffects: false` everywhere: no module-level side effects, no prototype extensions, lazy-memoised singletons.
- One public export per file, `I`-prefixed interfaces, `_`-prefixed private fields, `#region Fields/Ctor/Properties/Methods`, TSDoc on public members, standalone components with inline templates and inline styles, signals, `inject()`. Selector prefix `ngp` — for elements, attributes, pipes, CSS custom properties, animation names and data attributes alike.
- Specs run just in time, and the JIT compiler never sees an `input()` initialiser: `ComponentRef.setInput` and a parent template binding both fail silently. Substitute the field with a signal the spec owns, **before the first change detection**.
- Mosaik's runtime bundle cannot be loaded outside a browser build, so a spec that touches a Mosaik control mocks the module with `vi.mock`.
- Every package ships specs (Vitest, AAA, one act per test), a README with "Import Options", and `.docs/packages/<name>/index.md` — both rendered by `tools/render-package-docs.mjs`.

## Key files

- `tools/packages.json` — package map (layers, entry points, peers). Single source of truth.
- `tools/docs-content.mjs` — the hand-written prose of each package; rendered into READMEs and docs pages.
- `.github/instructions/ngpel-project.instructions.md` — package/entry-point lockstep checklists.
- `.github/instructions/frontend-coding-standards.instructions.md`, `viewpresenter-behaviors.instructions.md` — coding rules.
- `.docs/architecture/index.md` — layering and composition convention.
