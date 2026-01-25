- [Git Usage Guide](#git-usage-guide)
  - [Prerequisites](#prerequisites)
  - [Creating or Cloning Repositories](#creating-or-cloning-repositories)
  - [Working with Changes](#working-with-changes)
    - [Checking Status](#checking-status)
  - [Staging and Committing](#staging-and-committing)
    - [Add Files](#add-files)
    - [Commit Changes](#commit-changes)
  - [Syncing with Remotes](#syncing-with-remotes)
    - [Push Changes](#push-changes)
    - [Pull Changes](#pull-changes)
  - [Remotes and Origin URL](#remotes-and-origin-url)
    - [View Current Remotes](#view-current-remotes)
    - [Change Origin URL](#change-origin-url)
  - [Exploring History](#exploring-history)
    - [Log](#log)
    - [Diff](#diff)
    - [Show](#show)
  - [Branching and Merging](#branching-and-merging)
  - [Undoing and Recovery](#undoing-and-recovery)
    - [Stash](#stash)
    - [Reset](#reset)
    - [Revert](#revert)
  - [Tags](#tags)
  - [Useful Global Configs](#useful-global-configs)
  - [Common Tips](#common-tips)
  - [Forward Thinking](#forward-thinking)
  - [References](#references)

---

# Git Usage Guide

This guide provides a concise but useful reference for daily Git operations. It includes commit workflows, remote management, history exploration, and recovery strategies.

---

## Prerequisites

* Install Git [https://git-scm.com/downloads](https://git-scm.com/downloads)
* Configure your user (one time):

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

---

## Creating or Cloning Repositories

Initialize a new repository:

```bash
git init
```

Clone an existing repository:

```bash
git clone <repository-url>
```

Common clone flags:

* `--branch <name>` clone a specific branch
* `--depth <n>` shallow clone for speed

Example:

```bash
git clone --branch develop --depth 1 <repository-url>
```

---

## Working with Changes

### Checking Status

```bash
git status
```

Flags:

* `-s` short format
* `-b` show branch info (helpful in scripts)

---

## Staging and Committing

### Add Files

```bash
git add <file>
git add .            # add everything
git add -p            # interactive patch
```

Useful flags:

* `-p` (patch mode to select hunks)
* `-A` stage all tracked + untracked

### Commit Changes

```bash
git commit -m "Message"
```

Common flags:

* `-a` auto-stage tracked files (skip `add`)
* `--amend` modify last commit

Example:

```bash
git commit --amend -m "Refined message"
```

---

## Syncing with Remotes

### Push Changes

```bash
git push
```

Useful variants:

```bash
git push -u origin main     # set upstream tracking
git push --force-with-lease # safe forced push
```

Prefer `--force-with-lease` over `--force` to avoid overwriting others.

### Pull Changes

```bash
git pull
```

Flags:

* `--rebase` applies local commits after remote ones (cleaner history)

Recommended:

```bash
git pull --rebase
```

---

## Remotes and Origin URL

### View Current Remotes

```bash
git remote -v
```

### Change Origin URL

```bash
git remote set-url origin <new-url>
```

Add new remote:

```bash
git remote add upstream <url>
```

---

## Exploring History

### Log

```bash
git log
```

Useful flags:

* `--oneline` compact format
* `--graph` ascii branch graph
* `--decorate` show refs
* `--author=<name>` filter
* `--since=<date>` filter by recency

Example:

```bash
git log --oneline --graph --decorate --all
```

### Diff

Check unstaged changes:

```bash
git diff
```

Compare staged changes:

```bash
git diff --cached
```

Compare commits:

```bash
git diff <commit1> <commit2>
```

Useful flags:

* `--name-only` just filenames
* `--stat` summary by file
* `--color-words` compact wording diff

### Show

Display a specific commit or object:

```bash
git show <commit>
```

Flags:

* `--stat` summary
* `--name-only` file names only

Example:

```bash
git show --name-only HEAD
```

---

## Branching and Merging

Create branch:

```bash
git branch feature-x
```

Switch branch:

```bash
git switch feature-x     # recommended
```

Or with checkout:

```bash
git checkout feature-x
```

Create and switch:

```bash
git switch -c feature-x
```

Merge:

```bash
git merge feature-x
```

Forward-thinking: consider using `git switch` and `git restore` as they are the modern replacements for many `checkout` tasks.

---

## Undoing and Recovery

### Stash

Temporarily save changes:

```bash
git stash
```

Useful flags:

* `git stash push -m "message"` name the stash
* `git stash list` list stashes
* `git stash show -p` view patch
* `git stash apply` apply (keep stash)
* `git stash pop` apply and remove

### Reset

Moves HEAD pointer and optionally modifies working files.

Modes:

* `--soft` keep staged + working changes
* `--mixed` (default) keep working, unstage
* `--hard` discard everything (danger)

Examples:

```bash
git reset --soft HEAD~1
git reset --hard HEAD~1
```

Useful flags:

* `--merge` attempt safe reset during merges
* `--keep` keep local changes when possible

### Revert

Create a new commit that undoes a previous commit (safe for shared branches):

```bash
git revert <commit>
```

Flags:

* `--no-edit` skip editor
* `--no-commit` stage changes only

Example:

```bash
git revert --no-edit HEAD
```

---

## Tags

Create a lightweight tag:

```bash
git tag v1.0.0
```

Annotated (recommended):

```bash
git tag -a v1.0.0 -m "Release 1.0.0"
```

Push tags:

```bash
git push --tags
```

---

## Useful Global Configs

Better diffs:

```bash
git config --global color.ui auto
```

Cleaner pulls:

```bash
git config --global pull.rebase true
```

Default main branch:

```bash
git config --global init.defaultBranch main
```

---

## Common Tips

* Prefer `rebase` for linear history
* Use `stash` for interrupted work
* Use `revert` for undoing public commits
* Use `reset` only in your own local history
* Use `--force-with-lease` instead of `--force`

---

## Forward Thinking

* Modern Git favors `switch` and `restore` for clarity
* `git worktree` allows multiple branch checkouts at once
* `git sparse-checkout` optimizes huge monorepos
* Future workflows increasingly rely on signed commits (GPG/SSH signing)

---

## References

* Git Official Docs [https://git-scm.com/doc](https://git-scm.com/doc)
* Pro Git Book [https://git-scm.com/book/en/v2](https://git-scm.com/book/en/v2)
