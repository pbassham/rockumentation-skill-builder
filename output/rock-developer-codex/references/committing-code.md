> **Path:** Developer Codex > Coding Standards > Committing Code

# Committing Code

Committing code is one of the most important things that we do as developers. Keep in mind these standards:

-   Atomic Commits: A commit should only address one issue, fix, or addition. Do not blend changes in a single commit.
-   Commit Often: Do not leave without pushing your work to the repo. If your work is not in a buildable/runnable state, consider using a feature branch (see feature branches below).
-   The readme generator does not pick up anything after a line break. If there are multiple lines of awesome information only the first one is shown. Keep EVERYTHING on one line.
-   When merging a feature branch into develop be sure to squash commits to a single commit.
-   After pushing a commit to a hotfix branch the change should be merged to all unreleased higher versions including develop. After merging, compile and run the branch and ensure functionality.
