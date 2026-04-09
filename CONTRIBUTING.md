# Contributing

## Branch Workflow

- `main` is the release branch. Keep it clean and merge-ready.
- `dev` is the default development branch for daily work.
- Create feature branches from `dev`, for example `feat/homepage-copy` or `fix/readme-parser`.
- Merge back into `dev` after local verification.
- Merge `dev` into `main` only when the changes are stable and ready to publish.

## Recommended Flow

1. Start from `dev`.
2. Create a feature branch.
3. Develop and test locally.
4. Merge feature branch into `dev`.
5. Review `dev`.
6. Merge `dev` into `main` with a clean summary commit history.

## Local Safety Rules

- This repo blocks direct commits on `main` via `pre-commit`.
- This repo blocks direct pushes to `main` via `pre-push`.
- Temporary overrides exist for emergencies only:
  - `ALLOW_MAIN_COMMIT=1 git commit ...`
  - `ALLOW_MAIN_PUSH=1 git push ...`

## GitHub Settings To Enable

- Protect `main`.
- Disable direct pushes to `main`.
- Require pull requests before merging.
- Optionally require status checks before merging.

## Automation Branch Policy

- Scheduled automation should write to `dev`, not `main`.
- The daily stars sync workflow is expected to commit only on `dev`.
- Promote automation changes to `main` only through the normal merge flow.

## Dataset Editing Rules

- Canonical dataset lives in `app/data/skills.json`.
- `id`, `slug`, `addedAt`, and `updatedAt` are editorial fields and must be changed manually when content changes.
- The stars sync automation may update only `stars` and top-level `lastSyncedAt`.
- When a skill is first added, set `addedAt` and `updatedAt` to the same date.
- When a skill entry is edited by a human, update `updatedAt` to the edit date and keep `addedAt` unchanged.