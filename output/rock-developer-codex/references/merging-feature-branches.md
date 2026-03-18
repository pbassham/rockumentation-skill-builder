> **Path:** Developer Codex > Coding Standards > Feature Branches > Merging Feature Branches

# Merging Feature Branches

When merging feature branches into develop, release-x.y.z, hotfix-x.y.z, always use Merge to Working Tree option in Smart Git. This lets you do a sanity check over what’s changing in your merge before you commit it.

![](https://community.rockrms.com/GetImage.ashx?Id=66691)

Important

Always Squash Merge your feature branch into the final develop/release-/hotfix- branch.  We want to keep the change as atomic as possible for that final merge commit.
