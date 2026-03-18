> **Path:** Developer Codex > Coding Standards > Performance

# Performance

## Overview

Performance should be at the forefront of our minds whenever we are writing code. Rock is used by churches of all sizes. Some with congregations as small as a hundred, and some as large as hundreds of thousands. So just because something is fast on your small test database; does not mean it will be fast on a database of 50GB.

## Observability

One of the ways we can do performance testing is with Observability. This is a feature of Rock that is built on top of the standard Open Telemetry system. This allows you as a developer to both add "spans" to wrap sections of code that you think might take a long time to run as well as view the data.

In Rock and C# these are called activities, though most reporting tools will refer to them as spans with the root span of a request being referred to as an activity.

### External Tool

The core team uses Microsoft's [Aspire](https://learn.microsoft.com/en-us/dotnet/aspire/get-started/aspire-overview) tool during development. There is a [private repository](https://github.com/Triumph-Tech/docker-tools) that has some bat files to quickly get Aspire started in Docker, but there is nothing magic so non-core teams can launch Aspire any way they prefer.

Installing Aspire requires three general steps. Once these steps are done you can start and stop Aspire from inside the Docker Desktop GUI.

1.  Enable WSL if you haven't already by running this from an Administrator PowerShell: `wsl --install`
2.  Install [Docker Desktop](https://docs.docker.com/desktop/setup/install/windows-install/). During installation make sure to use the WSL backend.
3.  Start up Aspire in Docker using either the above repository file or by manually entering the command: `docker run --name aspire --detach --env DOTNET_DASHBOARD_UNSECURED_ALLOW_ANONYMOUS=true -p 18888:18888 -p 4317:18889 -p 4318:18890 mcr.microsoft.com/dotnet/aspire-dashboard:latest`

Rock should then be configured to use Aspire by going to the System Configuration page. In the Observability panel, set the URL to `http://localhost:4317/` and the Endpoint Protocol to `Grpc`. Finally enable the all features: Traces, Metrics, Logs.

![](https://community.rockrms.com/GetImage.ashx?Id=72485)

### Internal Tracing

Starting in Rock v19 you can also show much of the same information without configuring any external tool. To do this, click the "Page Load Time" message in the admin footer bar. This will reload the page and then open a modal that shows you the Observability data of the page load.

The request for the initial page load will be displayed along with any additional requests from API calls or block actions that were executed by the page. If you need to test a block action or API call triggered by a user interaction, you can close the modal and perform the action. Then back in the admin footer bar, next to the Page Load Time there will be an "open external" icon. You can click this to open the modal again to view the additional requests.

![](https://community.rockrms.com/GetImage.ashx?Id=72486)

The column with the database icon will tell you how many database queries were executed by that span, including all descendant spans.
