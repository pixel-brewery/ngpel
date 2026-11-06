---
applyTo: 'libs/frontend/**'
name: 'ViewPresenter Behaviors'
description: 'Design rules for composable ViewPresenter behaviors (mixins) using the WeakMap + standalone factory function pattern.'
---

# ViewPresenter Behavior Design Rules

ViewPresenter behaviors are composable mixins that add reusable capabilities (close, undo/redo, etc.) to `ViewPresenter` subclasses. Import them from `@pixel-brewery/ngpel-mvp`.

---

## Core Principles

1. **Behavior interfaces expose only Commands, Signals, and extension-point methods.** An `ICloseable` interface exposes `closeCommand`, `canClose`, and overridable methods like `onClose()` and `setCanClose()`. An `ITrackable` interface exposes only `Command` properties and `Signal` getters — never methods.
2. **Two patterns coexist depending on complexity:**
    - **Override pattern** (simpler): The mixin provides default method implementations that subclasses override. Used by `Closeable`.
    - **WeakMap + standalone factory pattern** (complex state): State is stored in module-scoped `WeakMap`s. Standalone functions accept the host as the first parameter. Used by `Trackable`.
3. **Constructor-scoped setup.** Standalone factory functions must be called inside the concrete presenter's constructor (or a method called from the constructor). This guarantees Angular injection context for `command()` and `effect()`.
4. **Every Command gets a paired `canX` Signal.** If a behavior exposes a `closeCommand`, it must also expose `canClose: Signal<boolean>`. The signal is used as the command's `canExecute` gate.

---

## Architecture

### Type Foundation (`PresenterBehaviorBase.ts` and `PresenterBehaviorReturn.ts`)

```typescript
// Abstract constructor type constrained to ViewPresenter
export type PresenterBehaviorBase = abstract new (...args: Array<any>) => ViewPresenter;

// Combined constructor return type
export type PresenterBehaviorReturn<TBase, TBehavior> = (abstract new (...args: Array<any>) => TBehavior) & TBase;
```

### Mixin Pattern

```typescript
export function MyBehavior<T extends PresenterBehaviorBase>(base: T): PresenterBehaviorReturn<T, IMyBehavior> {
    abstract class MyBehaviorPresenter extends base implements IMyBehavior {
        // Internal fields, constructor, properties, methods
    }
    return MyBehaviorPresenter as PresenterBehaviorReturn<T, IMyBehavior>;
}
```

### WeakMap + Factory Function Pattern (for complex state like undo/redo)

```typescript
// Module-scoped state
const MY_STATE = new WeakMap<IMyBehavior, SomeState>();

// Pure read-only interface
export interface IMyBehavior {
    readonly myCommand: Command<void>;
    readonly canDoSomething: Signal<boolean>;
}

// Standalone factory for setup
export function setupMyBehavior(host: IMyBehavior, config: Config): void {
    MY_STATE.set(host, createState(config));
}
```

### Override Pattern (for simple extension points like close)

```typescript
export interface ICloseable {
    readonly closeCommand: Command<void>;
    readonly canClose: Signal<boolean>;
    onClose(): void;
    setCanClose(value: boolean): void;
}

export function Closeable<T extends PresenterBehaviorBase>(base: T): PresenterBehaviorReturn<T, ICloseable> {
    abstract class CloseablePresenter extends base implements ICloseable {
        // Default noop onClose() — subclasses override
        public onClose(): void {
            /* noop */
        }
        public setCanClose(value: boolean): void {
            this._canClose.set(value);
        }
    }
    return CloseablePresenter as PresenterBehaviorReturn<T, ICloseable>;
}
```

---

## Composition

Behaviors are composed via function nesting on the base class:

```typescript
class MyDialogPresenter extends Trackable(Closeable(ViewPresenter)) {
    public constructor() {
        super();
        // Trackable: standalone factory
        this._model = withUndoRedo(this, { name: '', value: 0 });
    }

    // Closeable: override pattern
    public override onClose(): void {
        this._drawerRef.close();
    }
}
```

Composition order reads inside-out: `Closeable` is applied first (innermost), then `Trackable` wraps it.

---

## Rules for Creating New Behaviors

### Interface Rules

- Prefix with `I` (e.g., `ICloseable`, `ITrackable`).
- `readonly` properties of type `Command<T>` or `Signal<T>` for the view.
- Override-pattern behaviors may additionally expose methods (`onClose()`, `setCanClose()`) as extension points for subclasses.
- WeakMap-pattern behaviors keep interfaces pure read-only (no methods).

### Factory Function Rules

- Exported as named functions from their own files, following the one-public-export-per-file rule.
- First parameter is always `host: IBehavior`.
- Name describes the action: `onClose`, `setCanClose`, `withUndoRedo`.
- Store state in a module-scoped `WeakMap` keyed by the behavior interface.
- May return a value (e.g., `withUndoRedo` returns `ITrackableSignal<TModel>`).

### Mixin Class Rules

- Always `abstract class` inside the mixin function.
- Constructor must call `super(...args)` first.
- Use `eslint-disable` for the `any` in the constructor spread (required by the type system).
- Getters read from the `WeakMap` — never store references as class fields when the WeakMap pattern is used.
- Override `dispose()` to clean up WeakMap state when needed (call `super.dispose()`).
- Follow standard region ordering: Fields → Ctor → Properties → Methods.
- Member visibility ordering: `public` → `protected` → `private`.

### Barrel Export Rules

- Export the mixin function, the interface (as `type`), and all standalone factory functions.
- Group exports by behavior with a comment header.

```typescript
// Closeable
export { Trackable } from './behaviors/Trackable';
export type { ITrackable } from './behaviors/ITrackable';
export { withUndoRedo } from './behaviors/withUndoRedo';
```

---

## Existing Behaviors

| Behavior    | Interface    | Pattern           | Factories / Extension Points                 | Purpose                                |
| ----------- | ------------ | ----------------- | -------------------------------------------- | -------------------------------------- |
| `Closeable` | `ICloseable` | Override          | `onClose()`, `setCanClose(value)`            | Close command with enable/disable gate |
| `Trackable` | `ITrackable` | WeakMap + factory | `withUndoRedo(host, initialValue, options?)` | Undo/redo for a tracked model          |

---

## Anti-Patterns (NEVER)

```typescript
// ❌ Calling factory functions outside constructor
ngOnInit() {
    withUndoRedo(this, { ... });  // Too late — no injection context
}

// ❌ Direct WeakMap access from consumer code
TRACKABLE_STATE.get(presenter);  // WeakMaps are module-private

// ❌ State stored as class fields in WeakMap-pattern mixins
abstract class TrackablePresenter extends base {
    private _ref: ITrackableSignal<unknown>;  // Lost through PresenterBehaviorReturn cast
}

// ❌ Mixing patterns in one behavior — pick override OR WeakMap, not both
```

---

**End of ViewPresenter Behavior Design Rules**
