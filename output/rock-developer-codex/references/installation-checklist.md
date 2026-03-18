> **Path:** Developer Codex > Coding Standards > Installation Checklist

# Installation Checklist

*1.* SQL Server – Developer Edition (*Rock supports SQL Server 2016 and above so at least one person should be using 2016*)

-   SQL Server Management Studio (v18.11.1) see [https://community.rockrms.com/developer/book/19/55/content#installingyourmicrosoftsqlserverdatabaseenvironment](https://community.rockrms.com/developer/book/19/55/content#installingyourmicrosoftsqlserverdatabaseenvironment)) You might also verify your "Retain CR/LF on copy or save" for the results grid.

![](https://community.rockrms.com/GetImage.ashx?Id=66708)

Optional: Azure Data Studio

2\. Visual Studio

-   Visual Studio 2022 \[Version 17.7.4\] (for Rock v14 and newer)
    -   Extension: GhostDoc
    -   Extension: Visual Studio Spell Checker (VS2022)
    -   Extension: Git Web Links (allows you to right-click in code and copy a link to the line in Github. (Be sure your have Git installed for Windows and that it is in your PATH). You can install it using the Visual Studio Extension Manager or from: [https://github.com/reduckted/GitWebLinks/tree/master/visual-studio](https://github.com/reduckted/GitWebLinks/tree/master/visual-studio))
-   You will need to install these workloads: "ASP.NET and web development", "Node.js development", and maybe (??) ".NET desktop development" (try without it).

![](https://community.rockrms.com/GetImage.ashx?Id=66709)

3. SmartGit \[Version 22.1.7\] - see [these installation instructions](https://triumph.slab.com/posts/installing-smart-git-on-windows-vrshc3xc)

-   You will also need to get your `license.lic` file from your manager or IT.
-   In your Rock project's .git/config file, please add this line in bold:

> \[remote "origin"\]url = https://github.com/SparkDevNetwork/Rock.gitfetch = +refs/heads/\*:refs/remotes/origin/\*fetch = +refs/tags/\*:refs/tags/\*

4\. Other things to install

-   Ngrok
-   PaperCut ([https://github.com/ChangemakerStudios/Papercut](https://github.com/ChangemakerStudios/Papercut)) or SMTP4Dev
-   [Zpl Printer Emulator (Chrome app/plugin)](https://chrome.google.com/webstore/detail/zpl-printer/phoidlklenidapnijkabnfdgmadlcmjo) for certain printer testing without using paper
-   Node.js ([https://nodejs.org/en/download/](https://nodejs.org/en/download/))
-   Optional
    -   VS Code
        -   Extension: REST Client by Huachao Mao

5. Update Windows Defender - Exclude your development directory from Windows Defender. This will increase your build and load times.

  How To: [https://www.youtube.com/watch?v=BonLkFNnO9w](https://www.youtube.com/watch?v=BonLkFNnO9w)
