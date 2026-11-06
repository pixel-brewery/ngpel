/**
 * Source-agnostic lifecycle phases of an application update. The vocabulary is distilled from the
 * desktop update state so a service worker, an Electron auto-updater or a mobile channel can report
 * through the same {@link IUpdateStatus}.
 *
 * - `disabled` — the source cannot deliver updates (no service worker, unsupported platform, ...).
 * - `idle` — no update activity; the running version is the latest one known.
 * - `checking` — a check is in flight.
 * - `downloading` — a newer version was detected and is being fetched.
 * - `ready` — a newer version is fully downloaded and can be activated.
 * - `failed` — the last check, download or installation failed.
 *
 * @public
 */
export type UpdateStatusKind = 'disabled' | 'idle' | 'checking' | 'downloading' | 'ready' | 'failed';
