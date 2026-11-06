---
title: 'Variable: USER\_PREFERENCE\_STORAGE'
generated: true
editUrl: false
---
# Variable: USER\_PREFERENCE\_STORAGE

```ts
const USER_PREFERENCE_STORAGE: InjectionToken<IUserPreferenceStorage>;
```

Defined in: [storage/preferences/USER\_PREFERENCE\_STORAGE.ts:16](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/storage/preferences/USER_PREFERENCE_STORAGE.ts#L16)

Injection token of the active user-preference storage adapter. It has no default factory on
purpose: importing the token must not pull any adapter into the bundle. Bind it through
`provideUserPreferences(withLocalStorage())`, `withSessionStorage()` or
`withUserPreferenceStorage(() => adapter)`.
