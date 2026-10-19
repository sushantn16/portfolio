---
title: 'From ESLint and Prettier to Biome: 60× faster, and what we lost'
description: One Rust binary instead of five packages, the numbers before and after, and the check we had to rebuild.
date: 2026-10-19
draft: true
---

Our Business Hub codebase at Kleinanzeigen is about a thousand TypeScript, React and Astro files. For linting and formatting it used ESLint and Prettier, like most JavaScript projects. I replaced both with [Biome](https://biomejs.dev), one tool written in Rust that does both jobs.

## The numbers

Measured on the same codebase, before and after:

| | Before | After |
|---|---|---|
| Lint and format, locally | ~30 s | ~0.5 s |
| The CI "lint" step | ~70 s | ~34 s |
| `pnpm lint` in total | ~47 s | ~24.5 s |

Locally that's about 60 times faster. The reason is simple. ESLint and Prettier each walk and parse the whole tree, in Node. Biome parses each file once, natively, and lints and formats from the same parse.

In CI the gain is "only" 2×, because the step also runs `astro check`, the TypeScript check for Astro files. That didn't change, and it now takes most of the step's time.

## Where the time and money come back

- **Every developer, many times a day.** Lint-and-format went from half a minute to under a second, so people run it all the time instead of leaving it to CI. The pre-commit hook runs Biome on the staged files and is effectively instant.
- **Every CI run.** About 36 seconds less per push, on every pull request. A busy repo pushes a lot, and CI runners cost money by the minute.
- **Fewer dependencies.** Five dev dependencies became one: `eslint`, our shared ESLint config, `typescript-eslint`, `prettier` and `prettier-plugin-astro` were replaced by `@biomejs/biome`. The lockfile lost **275 packages (−17%)**. That means faster installs, a smaller supply-chain surface, and fewer dependency-update pull requests, each of which runs the full CI pipeline.

## What we lost, and rebuilt

Removing ESLint quietly removed something: a plugin that checked our Tailwind classes against the real Tailwind config. Our design system replaces most stock Tailwind utilities. A class it doesn't support doesn't fail the build. It just generates no CSS, so the element silently loses its styling.

Biome has a rule for arbitrary values, like `w-[320px]`, but it doesn't know which utilities our config actually supports. So I wrote a small standalone checker that loads the real Tailwind config, presets and plugins included, and fails on any class that wouldn't generate CSS. It checks about 770 files in under a second, and it caught real bugs on its first run.

## The lesson that wasn't about Biome

Biome warns about a lot of things. But a lint run that only *warns* exits with code 0, so CI stays green whether a change adds ten warnings or removes them. That was just as true under ESLint, which reported warnings and passed.

So the rule I now follow: **a check either blocks the merge or doesn't belong in CI.** The new class checker reports errors and sits at zero, so it actually gates. The noisy arbitrary-value rule stays a warning on purpose. Making it an error would mean over a hundred suppression comments, and a rule you can only suppress teaches people to suppress rules.

## Would I do it again?

Yes. The speed shows up in daily work, the dependency tree is smaller, and the config fits in one file. Just list what your old setup checked before you delete it. What you lose is usually what nobody wrote down.
