# Shared library

This folder contains generic support code that does not render pages directly.

## File documentation

| File             | Description                                                                        |
| ---------------- | ---------------------------------------------------------------------------------- |
| `backend.ts`     | Resolves the local static public catalog; it is not an active Supabase connection. |
| `config.ts`      | Centralizes application configuration and paths.                                   |
| `siteAssets.ts`  | Resolves public images and other assets.                                           |
| `useResource.ts` | Provides a hook for asynchronous resources.                                        |

Visual components belong in `components/`; editorial content belongs in `content/`; larger product functionality belongs in `features/`. This library should remain small, generic, and free of page-rendering responsibility.
