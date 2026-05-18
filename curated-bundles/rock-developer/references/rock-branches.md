---
description: "Use when asking about Rock's Git branching strategy, develop vs pre-alpha-release branches, or risks of running bleeding-edge Rock versions"
source: "https://community.rockrms.com/developer/rock-branches"
sourceLabel: Rock Branches
---
> **Path:** Rock Branches

# Rock Branches

## Rock’s Git Branches

**Note:** [Rock adheres to the Gitflow branching strategy](https://github.com/SparkDevNetwork/Rock/wiki/Git-Branching-Strategy).

There are two important branches we want you to be aware of in Rock: develop and pre-alpha-release.

![pre-alpha-release-diagram.png](https://community.rockrms.com/Content/RockExternal/Images/Developer/Git-Branching-Strategy-3-Weeks.png)

develop

This branch is the next major version of Rock, and commits from other branches are frequently getting merged here. It is the wild west and can be very unstable. This is suitable only for advanced testing & next-version development.

pre-alpha-release

Every two weeks the develop branch is merged to the pre-alpha-release branch and it is deployed to several sites including https://prealpha.rocksolidchurchdemo.com/.

This is also the branch Spark Development Network runs on, and it powers this site. This is how Spark gets to 'eat our own dog food'. Pre-alpha-release is a dangerous, risky, place to live but we want to encounter issues before anyone else does.

If your organization has developers and wants to live on the risky, bleeding edge, you *could* use this branch in your production environment, but wait until it's been tagged with a release number (i.e., 1.17.0.23). Once the pre-alpha-release branch has been used successfully (by Spark, etc.) for about 10 days, we will tag the branch with a pre-alpha release number.

## Why Use pre-alpha-release?

The main reasons are:

- You'll have access to the latest and, often, greatest version of Rock.
- You'll get bug fixes almost as soon as they're written.
- You're doing a service to others by using this code base because you will catch, report and [possibly fix issues](https://github.com/SparkDevNetwork/Rock/wiki/Creating-Pull-Requests) before anyone else.

There are a few cons to be aware of:

1. New features will appear that are not yet documented.
2. New bugs will appear that have not been reported yet.
3. You could miss a database change (aka "data migration") that the core team had to manually fix.
4. You could really, really mess up your system if you do something wrong with your branching practices.

It's item number 3 that keeps us up at night. We want to make sure this doesn't happen to you so we want you to **let us know each time you pull from the pre-alpha-release branch:**

[Just Pulled From pre-alpha-release](https://community.rockrms.com/developer/pulled-prealpha)

