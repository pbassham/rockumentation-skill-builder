---
description: "Use when developing Rock plugins with the rock-dev-tool CLI, setting up development environments, understanding plugin directory structures, or configuring multi-plugin development workflows"
source: "https://community.rockrms.com/developer/obsidian"
sourceLabel: Obsidian
---
> **Path:** 

Plugin development is driven by a command line tool called `rock-dev-tool`. While you can certainly build a plugin completely by hand without using this tool, it will drastically reduce the time to get started and help you setup your environment the right way.

Tip

In the documentation below, you will find references to specific Rock versions. Not all Rock versions are available. Until the tool is updated to check which versions are available for you, you can use this link to find which versions have been published for use by the tool: [https://www.nuget.org/packages/RockRMS.Rock#versions-body-tab](https://www.nuget.org/packages/RockRMS.Rock#versions-body-tab)

## Directory Structure

Before we get started with the steps you need to perform, lets cover some terminology and directory structures of plugins during development.

First off, you are going to see us use the term "development environment". This generally refers to a special directory (usually its own git repository) that contains your plugins and an instance of Rock. An environment primarily defines the Rock version that will be used during development and debugging. Each environment can have multiple plugins.

A plugin refers to a directory (again usually its own git repository) that contains all the code required to build and deploy that plugin. It does not contain a Rock instance. Instead, the instance from the environment is used. Each plugin can belong to multiple environments, which allows you to quickly test a plugin on a different version of Rock during development without having to upgrade your entire development environment.

Lets take a look at what the directory structure of an environment with two plugins might look like.

```
Environment
|- PluginA
|  |- com.rocksolidchurchdemo.PluginA
|  \- com.rocksolidchurchdemo.PluginA.Obsidian
|- PluginB
|  |- com.rocksolidchurchdemo.PluginB
|  \- com.rocksolidchurchdemo.PluginB.Obsidian
\- Rock
   \- RockWeb
```

If you are used to the old "Rockit SDK" style, you might be wondering why there is only a RockWeb and where all the other Rock projects are. In this new environment format you have a pre-built instance of Rock rather than the full source repository. This makes your development environment much smaller since you have a roughly 250MB binary instance of Rock instead of a 2.5GB git repository of Rock.

Now, pictured above we just see the directories and not any files. There are some files scattered around but this should be enough to give you an idea of how things are setup. In this picture we actually have 3 git repositories in play.

1. The root directory of the environment is a repository that contains a few files in the root folder. These files tell the CLI tool how to get the environment setup, such as which Rock version to install into Rock\\RockWeb.
2. The PluginA directory is a second repository and contains just the source code related to this plugin.
3. The PluginB directory, as you might guess, is the third repository and contains just the source code related to this plugin.

We mentioned it in point 1, but just to clarify, Rock\\RockWeb is not under source control. It is downloaded and placed in the environment automatically. There are some reasons this is all separated into different repositories which will become more apparent as we work through the tool. But two major reasons are disk space (this setup will be roughly 8GB smaller on disk than the old Rockit SDK). The second reason is so that you can more easily automate building plugin packages with CI tools, like GitHub actions.

## Installing the Tool

Installing the CLI tool is very straight forward. Assuming you have the .NET SDK installed (if you have Visual Studio installed, it's almost certainly installed), you just have to run this command.

```
$ dotnet tool install --global sparkdevnetwork.rock.devtool
```

This should come back and tell you the tool was installed and can be run with `rock-dev-tool`. You will probably want to check for updates fairly often until we get a stable version of the tool. You can do this with the following.

```
$ dotnet tool update --global sparkdevnetwork.rock.devtool
```

## Creating an Environment

Creating a new environment will look something like this.

```
$ mkdir rocksolidchurchdemo-env
$ cd rocksolidchurchdemo-env
$ rock-dev-tool env new

Organization Name? Rock Solid Church Demo
Organization Code? com.rocksolidchurchdemo
Rock Version? 1.16.9-rc.1
Initialized environment in C:\Users\...\rocksolidchurchdemo-env
Installing Rock from https://rockrms.../Rock-1.16.9-rc.1.zip

Downloading Rock ---------------------------------------- 100%
Extracting files ---------------------------------------- 100%

Installed Rock 1.16.9-rc.1 into C:\Users\...\rocksolidchurchdemo-env\Rock
```

Running the `rock-dev-tool env new` command will ask you three questions, as you can see above. The first is the name of your organization. The second is the code for your organization. This is usually the reverse DNS of your organization website. Finally it will ask you what Rock version to use for the environment. Once all the tooling is finalized you will just use a normal Rock version, but for now you will need to specify pre-release suffixes along with the versions. For now, stick with `1.16.9-rc.1`.

This will create a new environment in the directory you ran the command from. It will setup a Visual Studio solution file, all the default VS Code settings, and a special file that identifies the environment information. Then it will download the binary installation of Rock and install it into the environment directory.

At this point, you can open up the solution file and click Run to start Rock. Though you don't have a plugin yet.

Note

Remember that you will still need to create a web.ConnectionStrings.config file in the Rock\\RockWeb directory just like normal. This step is not done for you since it will be different on every machine.

The environment will already have a new git repository created for it. At this point, you might want to open your new environment in your favorite Git tool and add and commit all those files so you have a clean starting point for adding your plugins.

## Creating Plugins

In a perfect world, this would be just as short as the environment section. But you probably have more complex workflows to deal with then just creating a brand new plugin from scratch. You most likely have some existing plugins that need to be converted. So we are going to cover three different patterns for creating a plugin.

1. Creating a brand new plugin from scratch.
2. Converting an existing plugin by creating a new repository for the plugin.
3. Converting an existing plugin by migrating an existing repository to the new pattern.

#### New Plugin

This is the simplest way to go because you won't have to move any existing files around. Which makes this pretty easy. Starting again in your environment directory, run the following command.

```
$ rock-dev-tool plugin new

Organization? (Rock Solid Church Demo): Rock Solid Church Demo
Organization Code? (com.rocksolidchurchdemo): com.rocksolidchurchdemo
Plugin Name? Plugin A
Rock Version? (1.16.9-rc.1): 1.16.9-rc.1
Path to RockWeb? (Rock/RockWeb): Rock/RockWeb
Create DLL Project? [y/n] (y): y
- Add support for REST endpoints? [y/n] (n): n
Create Obsidian Project? [y/n] (y): y
Create Legacy WebForms Directory? [y/n] (n): n
Copy artifacts to RockWeb? [y/n] (y): y
```

This looks like a lot, but we actually only had to type in one line. All of those prompts with parenthesis will provide default values. Some of these defaults will be taken from the environment and some are just the most common options you will want to select.

The "Organization", "Organization Code", "Rock Version" and "Path to RockWeb" all come from the environment. Normally you will want to just accept the defaults. The one exception might be the "Rock Version". You can build your plugin against a different version of Rock than what will be run in the environment. This essentially lets you target the Rock "SDK" version of 1.16.3, but then run it in the environment against 1.16.9.

Many of these prompts should be pretty self explanatory, but we'll cover the ones you might not have an immediate understanding of. "Add support for REST endpoints" is asking if you intend to provide any new REST APIs in your plugin. This doesn't do any magic, it just adds some additional assembly references to the C# project for you.

Next is "Create Obsidian Project". If your plugin will not have any UI, like it only provides new Workflow Actions, then you don't need to create the Obsidian project. But most plugins will have some UI, so this defaults to Yes.

Then we have "Create Legacy WebForms Directory". If you are creating a brand new plugin, you should say No here and build your UI in Obsidian. But if you are converting an existing plugin that has legacy `.ascx` blocks, you will nee to say Yes to this so your legacy blocks work while you are in the process of converting them.

Finally is the "Copy artifacts to RockWeb" question. Basically, just say yes to this. This will automatically copy all built files into the environments RockWeb directory for you so that when you build your plugin and then refresh Rock, it will see your changes automatically.

Creating a new plugin is also going to add the new projects to the Visual Studio solution file. So at this point all you need to do is open that solution file in Visual Studio and then open the environment directory in VS Code and you can start writing your plugin.

Creating a plugin will also create an empty git repository for the plugin. You will probably want to add all the new files and commit to the newly created plugin repository (unless you are planning to convert to an existing repository).

After you push your plugin repository to GitHub, or wherever you will host your repositories, you will want to update the environment so that it knows where you get your plugin from in the future. You can do so with this command.

```
$ rock-dev-tool plugin configure PluginA --url https://github.com/org/repo --branch main
```

Once again, you might want to then commit any changed files in the environment repository.

### Converting to a New Repository

This pattern isn't too bad, but does take a bit of manual moving of files around. Start by going through the steps in [New Plugin](https://community.rockrms.com/developer/obsidian/plugin-development#new-plugin) to create the empty plugin. It will be important to make sure your organization code and plugin name match your old plugin. If these don't match correctly you are going to have to do some manual work to make things compile and copy to the correct places to maintain backwards compatibility.

Now you need to start copying stuff into the new plugin from the old plugin. All your C# code should just be copied into the `com.rocksolidchurchdemo.PluginA` directory/project. Keep the directory structure the same.

When you get to the `AssemblyInfo.cs` file, don't copy that. Instead just edit the new csproj file and set your new version number there. These C# projects use the new .NET SDK format which drastically reduces the amount of boilerplate in the file. Part of that is it will automatically generate the `AssemblyInfo.cs` file for you during build.

If you have any legacy `.ascx` blocks, then those should be copied into the `WebForms` directory of the plugin repository. The CLI tool will create a Windows Junction to link this folder into the proper `Rock/RockWeb/Plugins` directory.

If you have any legacy WebHandlers (`.ashx` files), you will need to perform some special conversion on those. See the section further down in this document.

Once everything is copied over, build and run and make sure things work just like they did before the conversion. Then you can commit all changes and you are ready to start converting any blocks to the new Obsidian blocks.

## Converting in an Existing Repository

For this, I recommend starting with a new branch in your existing repository rather than trying to update the existing branch. This way you have an easy way to go back and forth until you are ready to deploy your first plugin version built from the new format.

Once again, start by going through the steps in [New Plugin](https://community.rockrms.com/developer/obsidian/plugin-development#new-plugin) to create the empty plugin. Make sure to match the organization code and plugin name to the old plugin.

At this point, you have the files you need for the blank plugin, but not in the right repository. What I recommend is moving all these new plugin files (except `.git`) to another folder. Then delete the now empty plugin directory. Next, clone your existing plugin repository into that same directory name. Create and checkout a new branch to start working in.

Now, move the files that were created by the CLI tool back into this folder. Then follow the steps in [Converting to a New Repository](https://community.rockrms.com/developer/obsidian/plugin-development#converting-to-a-new-repository) to put files in place, except move the files instead of copy then. When you are done, you shouldn't have any of the files in the same place as they were in the legacy plugin repository.

Just like above, once everything is moved into place, build and run to make sure things work. Then commit all the changes on your new branch. Remember to run the `rock-dev-tool plugin configure` command in the environment directory to set the repository URL and branch name of the plugin.

## Special Considerations

When converting an existing plugin, there are a few special considerations that you may need to deal with.

## WebForms Blocks (.ascx)

If your plugin uses legacy `.ascx` blocks then the tool will need to create a Junction directory in `~/Plugins/<org>/<plugin>` back to the `WebForms` directory in your plugin. This is what lets you see your blocks in Visual Studio and edit them under the RockWeb project.

If you notice, the `.gitignore` file in that directory basically says to ignore everything except those files. The reason for this is because under this setup when the compiled files are copied over to RockWeb they will actually land in this `WebForms` directory.

A secondary issue of this is that it breaks Rock's normal cache busting for your plugin. Meaning, when you make a change to an Obsidian file, Rock won't detect the change. This happens because the OS file watcher will not traverse down into Junction directories.

There are two ways around this. First is to disable cache on your browser. However, this requires you to keep the developer tools open which can be annoying. And if you forget you might waste time trying to figure out why your changes aren't showing up.

The second pattern is to effectively disable the cache per page. You can do this by adding an HTML Content block above your own blocks (such as the Feature zone) and put the following content in.

```
<script>
    Obsidian.onReady(() => Obsidian.options.fingerprint = \`v=${Date.now()}\`);
</script>
```

What this does is change the fingerprint used to load all Obsidian files to the current timestamp. Which means every page load will reload every single Obsidian file on the page.

Caution

Do not do this in production, this is a temporary hack until you have finished converted your WebForms blocks over to Obsidian and can remove the WebForms directory from your plugin.

## HTTP Handlers (.ashx)

If you had any custom HTTP handlers in your plugin, these will require a bit of conversion. This is for two reasons.

1. The new world (i.e. .NET Core) does not use HTTP Handlers, so these won't work in the distant future anyway.
2. There isn't a way to get these handler files into the WebHooks directory without running special commands as an Administrator. So we just don't support it, sorry.

Tip

If your .ashx files were originally in the ~/Plugins/org/plugin directory, then you can actually just put these files in the WebForms directory of the new plugin. You will need to update the .gitignore file in that folder to get those .ashx files included.  

But you will need to convert them eventually, so might as well do it now.

Basically, you need to convert these from HTTP Handlers to Owin Middleware. Doing so will mean only a small conversion to a small portion of the handler. Probably 98% of the code will not have to be touched.

First you will need to add a NuGet reference to `Microsoft.Owin`, be sure to use version `4.0.0`.

Next we need a file to initialize our Owin Middleware into the request pipeline.

**Owin/OwinStartup.cs**

```
public class OwinStartup : IRockOwinStartup
{
    /// <inheritdoc/>
    public int StartupOrder => 0;

    /// <inheritdoc/>
    public void OnStartup( IAppBuilder app )
    {
        app.Use( typeof( MyEndpointMiddleware ) );
    }
}
```

That is all that is needed to get our `MyEndpointMiddleware` into the request pipeline. Next we need to define the middleware itself.

```
public class MyEndpointMiddleware : OwinMiddleware
{
    public MyEndpointMiddleware( OwinMiddleware next )
        : base( next )
    {
    }
    
    /// <inheritdoc/>
    public override Task Invoke( IOwinContext context )
    {
        var path = context.Request.Uri.AbsolutePath;

        if ( !path.Equals( "/WebHooks/MyEndpoint.ashx", StringComparison.OrdinalIgnoreCase ) )
        {
            return Next.Invoke( context );
        }
        
        // Your processing code here.
    }
}
```

That is pretty much it. Everything else will be very similar, if not almost identical, to the logic in your original handler.

## Building Obsidian

If you build the solution from inside Visual Studio, it will build the Obsidian project for you. But since you will be doing your Obsidian development in VS Code you will need to know a few extra steps.

First up you need to install all the npm dependencies with the following command.

```
$ npm install
```

You only need to do this once unless you clone the environment and/or plugin to a different computer.

To build, you have two commands that will operate slightly differently. The first is the standard build command.

```
$ npm run build
```

This will do type checking, which means making sure all the TypeScript is valid. In other words, it makes sure you don't try to assign a number to a string and things like that. Because this step only happens during a build, you will want to do a build once in a while. Usually before you commit so that you can be sure everything is valid. After the type check is done it will compile the various source files and copy them to RockWeb.

The second is the watch command.

```
$ npm run watch
```

The watch command does not perform any type checking. It only performs the compile step. Unlike the build command, the watch command will keep running and automatically recompile anytime a source file has changed.

### Supported Files

The build and watch commands support a number of file types.

- .obs
- .ts
- .css, .less, .sass, .scss
- .lava
- .jpg, .jpeg, .png, .apng, .gif, .svg, .webp

The first set of file extensions is the obsidian UI files. The second set of file extensions are standard TypeScript files. Think of these TypeScript files as where you will put any business logic that needs to run on the client side.

Next up we have various CSS formats. Regular `.css` files will just be copied, while `.less`, `.sass` and `.scss` files will be compiled following their implied formats. In the future the output files may be minified automatically. If we do that, we'll provide a way for you to disable it if you don't want that.

After that we have `.lava` files. These will be copied as is over to RockWeb.

Finally we have all our support image extensions. These will also be copied as is over to RockWeb.

### Partial Files

We have two variations of some of the above extensions that change how things work with the compiler. The first is the `.partial` variant. This would be files ending in, for example, `.partial.obs` or `.partial.less`. The extensions that support this variant are `.obs`, `.ts`, `.less`, `.sass`, and `.scss`. These files are ignored by the compiler, but will be bundled into any file that imports them.

For example, in the case of your `.partial.obs` files, this lets you split up your block into multiple files and have them all bundled together into a single file. If you don't do this, and your `myFirstBlock.obs` includes 6 other `.obs` files, you would end up with 7 files total that the browser needs to download. If those 6 other files were `.partial.obs` then you end up with a single file for the browser.

### Library Files

Another variant is the `.lib` variant. This is only supported by `.lib.obs` and `.lib.ts`. The bundler used to compile your files will not normally bundle imports from `node_modules`. This is to make things like `import ... from "vue"` work correctly. Since Rock provides a number of standard imports at runtime for you.

The problem is, if you install a package from npm that you want to use in your plugin, it won't be bundled. You can get around this with a `.lib.ts` file. Any imports to this lib files will be forcefully bundled.

Usually your `.lib.ts` files are just re-export files. Meaning, all you do is import the package and then export it so you have it available in your other files. Doing things this way has a couple benefits over the old page-wide script imports. The major benefit is that you don't need to worry about conflicts. If Rock is using chart.js version 3.7, but you need some new features in version 4.2; you can just bundle chart.js 4.2 into your plugin and not worry about conflicting with the Rock version. Even if a Rock block showing a chart is on the same page as your block. They will both run with their respective versions of chart.js.

These lib files often look as simple as this.

**vendor.lib.ts**

```
export { uuidv4 } from "uuidv4";
```

Then, to use the `uuidv4` function in some other file, it would look like this.

**logic.ts**

```
import { uuidv4 } from "./vendor.lib";

console.log(uuidv4());
```

While the example above is simplistic, in reality you might have a few imports/exports in your vendor file to bundle from various libraries at once.

## Code Generation

The CLI tool supports generating code for you to speed up development and also reduce errors from typos. Currently you can generate view models, which translates some of your C# code into TypeScript. It will also help you generate some boilerplate code for list and detail blocks.

### View Models

Generating view models means taking a C# object and generating the TypeScript file that represents that object. This works with two general types of C# objects:

1. Bags / Boxes
2. Enums

In order for this to work, there is a naming convention that must be followed in C# for both types.

For Bags and Boxes, these classes must be a descendant of a "ViewModels" namespace. The C# class name must also end in either `Bag` or `Box`. This is a terminology thing so that everybody is using the same terms as the core team.

For C# enumerations, these must be a descendant of a "Enums" namespace. The enum itself can be named anything.

The way the files is generated is different from the core Rock project. This is mostly because the number of bags and enums we expect a single plugin to require is far less than the core Rock framework. So instead of each class or enum getting its own file, they are grouped by namespace into a single file. Here is an example of a C# project and how it would be generated into your Obsidian files.

```
com.rocksolidchurchdemo.Plugin
|- Enums
|  |- Codes
|  |  \- Response.cs
|  |- ErrorType.cs
|  \- Status.cs
|- Models
|  |- Widget.cs
|  \- WidgetType.cs
|- ViewModels
|  |- ControlHelpers
|  |  |- WidgetPickerBag.cs
|  |  \- WidgetTypePickerBag.cs
|  |- WidgetBag.cs
|  \- WidgetTypeBag.cs
\- Utility.cs
```

The above project would be look like this when the Obsidan files are generated.

```
com.rocksolidchurchdemo.Plugin.Obsidian
\- src
   |- Enums
   |  \- codes.partial.ts
   |- ViewModels
   |  \- controlHelpers.d.ts
   |- enums.partial.ts
   \- viewModels.d.ts
```

Everything in the `com.rocksolidchurchdemo.Plugin.Enums` namespace, specifically the `ErrorType` and `Status` enums, are placed in `./src/enums.partial.ts`. Then everything in `com.rocksolidchurchdemo.Plugin.Enums.Codes` namespace is placed in `./src/Enums/codes.partial.ts`.

For the view models, a similar thing happens. Everything in `com.rocksolidchurchdemo.Plugin.ViewModels` namespace goes into the `./src/viewModels.d.ts` file. While the bags in `com.rocksolidchurchdemo.Plugin.ViewModels.ControlHelpers` got placed into `./src/ViewModels/controlHelpers.d.ts`.

Now, most plugins are probably not going to have enough bags and enums to warrant separation by namespace. So you will likely just end up with `./src/enums.partial.ts` and `./src/viewModels.d.ts`. But as you can see, if you *do* end up with so many things that you want to separate them into namespaces, that is fully supported.

Note

This brings up an important point. The enums are in a .partial.ts file. This means it will not be compiled by itself but instead embedded into the file that imports it. In other words, if you have two blocks and they both reference enums.partial.ts then you will be duplicating that code into both block JavaScript files.  
Since you aren't likely to have enough enums for this to be a problem, you can most likely just nod, smile and move on. However, there is a chance you might have dozens of enums and most of those are only used by a single block. In that case you can move those enums into their own namespace so that file only needs to be imported by the one block.

The command to generate the view models would look something like this:

```
$ rock-dev-tool generate viewmodels \
        --assembly bin\Debug\net472\com.rocksolidchurchdemo.Plugin.dll \
        -o ..\com.rocksolidchurchdemo.Plugin.Obsidian\src
```

That is certainly a lot. Don't worry, if you generated your plugin from the tool it will have created an npm command for you that does this so you can just run:

```
$ npm run viewmodels
```

Note

The command above will not work until you have created the view model bags and enums in C# and recompiled the C# project. This command will not generate the C# bags from your entity types. It simply takes the bags and enums you have created in C# and synchronizes the TypeScript data to match.

### List Blocks

A list block is a standard style of block in Rock that displays a list of entities in a Rock Grid. This Grid renders as a table and includes standard features such as sorting, pagination and searching. Because there is often little customization involved in displaying the row data, the code generated by the tool will likely get you 80-90% to a complete block.

Note

This command must be run from the environment's plugin directory rather than one of the specific project directories. In other words, the directory with the plugin.jsonfile.  

```
$ rock-dev-tool generate listblock
Reading models from 'com.rocksolidchurchdemo.MyPlugin\bin\Debug\net472\com.rocksolidchurchdemo.MyPlugin.dll'.
Select the entity type to build the list block for: Widget
Select the properties to create columns for: NumberRequired, EntityType, Title
Select the property that will be used for row tooltip: Description
C# Block Namespace (com.rocksolidchurchdemo.MyPlugin.Blocks): com.rocksolidchurchdemo.MyPlugin.Blocks
Block Category (Rock Solid Church Demo > My Plugin): Rock Solid Church Demo > My Plugin
C# ViewModel Namespace (com.rocksolidchurchdemo.MyPlugin.ViewModels): com.rocksolidchurchdemo.MyPlugin.ViewModels
C# block path (com.rocksolidchurchdemo.MyPlugin\Blocks): com.rocksolidchurchdemo.MyPlugin\Blocks
C# view model path (com.rocksolidchurchdemo.MyPlugin\ViewModels): com.rocksolidchurchdemo.MyPlugin\ViewModels
Obsidian block path (com.rocksolidchurchdemo.MyPlugin.Obsidian\src): com.rocksolidchurchdemo.MyPlugin.Obsidian\src
Show delete button [y/n] (y): y
Show security button [y/n] (y): y
Use entity security [y/n] (y): y

Files have been generated. Remember to build the C# project and then generate the Obsidian viewmodels.
```

Important

If you get an error about a missing EntityTypeGuid attribute when you select the entity type, you need to apply a C# attribute to your entity class telling Rock it's entity type. This must match the guid that you originally created the entity type with in your migration when you created the entity type.  
\[EntityTypeGuid(" b95e8f46-d249-4591-94ee-56278e968a37" )\]

There is a lot going on up there, so lets unpack this in smaller chunks.

The first thing it will ask you is to select which entity type you use, you will pick this from a list of presented options. Use up and down arrows and then press enter to select.

After this it will display a list of support properties that can be included on the grid. Don't worry, you can add more later or remove these later if you want. This will just save you time for properties with common data types. Use up and down arrows, but use the space bar to toggle them on and off and then press enter to accept your choices.

Next it will ask if any properties should be used as the row tooltip. A `Description` property is often a good choice, but you can choose another or even not have any tooltip if you want.

The next few questions relate to C# namespaces, paths to files, and the block category. If the defaults are good then you can just press enter on each one, otherwise you can make changes. The paths are relative to the environment's plugin directory.

After all these paths come a few Grid configuration questions. Delete and Security button choices are probably pretty straight forward. The question about "entity security" is asking if you want to use Entity Security or CMS Security for this block.

Note

Some entities will have per-entity security that should be enforced. For example, Groups and Content Channels have their own security. If somebody doesn't have VIEW access to the entity it should not show on the list. This is "Entity Security".  
The other pattern is what we call "CMS Security". This simply means that any security on the entity is ignored and instead security on the block is what dictates access to the entity. For example, Campus would use CMS security because there is no explicit security on a Campus.

Finally, as the message states you will want to go to your C# project and compile it (assuming no errors in the code generation). Then once it is compiled generate the view models for your Obsidian project and then compile that one too.

One last thing you will need to add to your C# block is an override to a property. You need to tell Rock where your JavaScript file is for the block.

```
/// <inheritdoc/>
public override string ObsidianFileUrl => "~/Plugins/com_rocksolidchurchdemo/MyPlugin/widgetList.obs";
```

Once that is done, you can test your list block and then start customizing it.

## Detail Blocks

Note

Please read the section above on List Blocks first. It will include some tips and context information that will be used here as well.

A list block is a standard style of block in Rock that displays a a single entity. Typically this follows the pattern of a View mode and then an Edit (or Add) mode. Though you can pass `autoEdit=1`in the query string to have a detail block that skips the View mode. Since there is far more customization to a detail block than a list block, the generated code will probably only get you 70% of the way there.

```
$ rock-dev-tool generate detailblock
Reading models from 'com.rocksolidchurchdemo.MyPlugin\bin\Debug\net472\com.rocksolidchurchdemo.MyPlugin.dll'.
Select the entity type to build the list block for: Widget
Select the properties to include: NumberRequired, EntityType, Title
C# Block Namespace (com.rocksolidchurchdemo.MyPlugin.Blocks): com.rocksolidchurchdemo.MyPlugin.Blocks
Block Category (Rock Solid Church Demo > My Plugin): Rock Solid Church Demo > My Plugin
C# ViewModel Namespace (com.rocksolidchurchdemo.MyPlugin.ViewModels): com.rocksolidchurchdemo.MyPlugin.ViewModels
C# block path (com.rocksolidchurchdemo.MyPlugin\Blocks): com.rocksolidchurchdemo.MyPlugin\Blocks
C# view model path (com.rocksolidchurchdemo.MyPlugin\ViewModels): com.rocksolidchurchdemo.MyPlugin\ViewModels
Obsidian block path (com.rocksolidchurchdemo.MyPlugin.Obsidian\src): com.rocksolidchurchdemo.MyPlugin.Obsidian\src
Use entity security [y/n] (y): y

Files have been generated. Remember to build the C# project and then generate the Obsidian viewmodels.
```

The first thing you will be asked is, once again, the entity you wish to generate the block for. After that you will be asked which properties from the entity should be included on the view and edit screens. Don't worry, you will have final say on which properties are available on which screens.

After that comes all those path questions again followed by which security pattern to follow.

As before, once the files are generated you will need to add the `ObsidianFileUrl` property and then generate the view models for the Obsidian project.

```
/// <inheritdoc/>
public override string ObsidianFileUrl => "~/Plugins/com_rocksolidchurchdemo/MyPlugin/widgetDetail.obs";
```

At this point you should be able to compile everything put the block on a page and get a very basic view and edit detail block.

**TBD: Discussion of common things to do on a detail block.**

## Packaging

The CLI tool is designed to assist with packaging up your plugin when you are ready to do so. Historically we have had to manually create a directory structure that contains the files to be installed and then create a zip file and rename it. Then you had to check to make sure everything went in the right place and also ensure you didn't forget any files.

This manual process was time consuming and prone to user error. So we have automated the process. You still need to figure out what files should be packaged up, but you only have to do this one time. You need to configure your `plugin.json` file for this to work. This is created for you, but you will probably want to check and customize it to suite your needs.

```
{
    "organization": {
        "name": "Rock Solid Church Demo",
        "code": "com.rocksolidchurchdemo"
    },
    "name": "My Plugin",
    "version": "1.0.0",
    "include": {
        "com.rocksolidchurchdemo.MyPlugin/bin/Release/net472/com.rocksolidchurchdemo.MyPlugin.dll": "Bin/",
        "com.rocksolidchurchdemo.MyPlugin.Obsidian/dist/**": "Plugins/com_rocksolidchurchdemo/MyPlugin/"
    },  
    "exclude": [
        "com.rocksolidchurchdemo.MyPlugin.Obsidian/dist/**/*.js.map"
    ]
}
```

The name of the plugin from line 6 will be used in creating the filename in slug fashion, such as `my-plugin`. Then the version from line 7 will be appended to get the final filename, `my-plugin-1.0.0.plugin`.

Next we have a set of includes and excludes. The includes come in key and value pairs. The keys specify the source file(s) and use standard [glob patterns](https://code.visualstudio.com/docs/editor/glob-patterns). These paths are relative to the project directory (where the `plugin.json` file is located). The value in the pair is the path in the RockWeb folder to place these files.

The excludes are a simple set of arrays of glob patterns to exclude from the above includes. The include pattern on line 10 includes all files in all sub-directories of the `dist` directory. The exclude pattern on line 13 makes sure that we exclude any files from the `dist` directory (and all sub-directories) that end in `.js.map`.

As you can see, while those paths can be pretty deep and hard to read, there isn't much too them. To build the package you then just run this simple command:

```
$ rock-dev-tool plugin pack
```

This will spit out a list of files that will be packaged, as well as any files that are being deleted from the RockWeb folder. This is tracked via the `package-lock.json` file, so you want to be sure to commit that to your source control repository when it changes. Packing a plugin will update this file with a new version that includes all files installed. This allows it to know if a file is now missing and should be deleted from the Rock instance.

Warning

Running the pack command will not build your project, so you still will want to build your project and make sure you build in Release mode (or update the package.json file to use a Debug build).  

## Importing a Package

If you are converting an existing plugin to this new pattern you will want to import the latest packaged plugin file into your lock file. This lets the tool know about all files that were installed at that version. To do this, simply run:

```
$ rock-dev-tool plugin import my-plugin-file.plugin 1.0.0
```

Note

You will need to obviously replace my-plugin-file.plugin with the filename to be imported and 1.0.0 with the version number of that plugin file.  Because Windows is not case sensitive, your previous plugins might have files in incorrectly cased directories or filenames. When packing your first release after running this command, you might see some odd deletions (for example, installing a file in Bin but deleting the same file from bin). If that happens, simply edit the package-lock.json file and fix any casing issues for the version you imported and try your pack command again.  

## Pre-release Changes

Updated `.vscode/settings.json` to add the following setting for new Volar plugin:

.vscode/settings.jsonCopy

```
"vue.complete.casing.tags": "pascal",
     "files.trimTrailingWhitespace": true,
+    "vue.format.wrapAttributes": "preserve-aligned",
     "html.format.wrapAttributes": "preserve-aligned",
     "html.format.wrapLineLength": 0,
```

Updated `.vscode/settings.json` to add TypeScript import setting to ensure it uses relative paths instead of absolute:

.vscode/settings.jsonCopy

```
"html.format.wrapAttributes": "preserve-aligned",
     "html.format.wrapLineLength": 0,
+    "javascript.preferences.importModuleSpecifier": "project-relative",
     "editor.codeActionsOnSave": {
         "source.fixAll.eslint": "explicit"
```

Updated `package.json` to use latest Obsidian build tools:

package.jsonCopy

```
"devDependencies": {
         "@sparkdevnetwork/eslint-config-rock-recommended": "^1.0.0-rc.1",
-        "@sparkdevnetwork/obsidian-build-tools": "^1.0.0-rc.5",
+        "@sparkdevnetwork/obsidian-build-tools": "^1.0.0-rc.6",
         "@types/jest": "^29.5.4",
         "@types/node": "^20.5.7",
```

Updated `tsconfig.base.json` to fix imports from vendor libraries:

tsconfig.base.jsonCopy

```
"sourceMap": true,
         "target": "ES2016",
-        "module": "NodeNext",
-        "moduleResolution": "NodeNext",
+        "module": "ESNext",
+        "moduleResolution": "Bundler",
         "esModuleInterop": true,
         "strict": true,
```

Updated `package.json` to use standard vue-tsc compiler for type checking instead of custom hack.

package.jsonCopy

```
"scripts": {
         "build": "npm run typecheck && obsidian-build",
-        "typecheck": "obs-tsc --noEmit -p src",
+        "typecheck": "vue-tsc --noEmit -p src",
         "watch": "obsidian-build --watch",
         "clean": "rimraf dist",

         "ts-jest": "^29.1.1",
         "tslib": "^2.6.2",
-        "typescript": "5.5.4",
+        "typescript": "^5.5.4",
         "vue": "^3.2.0",
-        "vue-eslint-parser": "^9.3.1"
+        "vue-eslint-parser": "^9.3.1",
+        "vue-tsc": "^2.1.6"
      }
  }
```

Updated `package.json` to implement viewmodels command.

```
"watch": "obsidian-build --watch",
         "clean": "rimraf dist",
+        "viewmodels": "rock-dev-tool generate viewmodels ../<C# Project Name>/bin/Debug/net472/<C# Project Name>.dll -o src",
         "test": "jest"
     },
```

Updated `plugin.json` to implement pack command requirements.

```
},
-     "name": "My Plugin"
+     "name": "My Plugin",
+     "version": "1.0.0",
+     "include": {
+         "com.rocksolidchurchdemo.MyPlugin/bin/Release/net472/com.rocksolidchurchdemo.MyPlugin.dll": "Bin/",
+         "com.rocksolidchurchdemo.MyPlugin.Obsidian/dist/**": "Plugins/com_rocksolidchurchdemo/MyPlugin"
+     },
+     "exclude": []
  }
```

3/2/2025 Updated csproj to reference the RockRMS.Rock.Blocks package.

```
<PackageReference Include="RockRMS.Rock" Version="{{ RockVerison }}" />
+   <PackageReference Include="RockRMS.Rock.Blocks Version="{{ RockVersion }}" />
    <PackageReference Include="RockRMS.Rock.Rest" Version="{{ RockVersion }}" />
```

---

## Null vs Undefined {#null-vs-undefined}

Before we dive too deeply into building components and blocks, you need to understand some important differences in the concept of `undefined` between C# and JavaScript/TypeScript.

As C# and C developers we often think of `null` as something that indicates "no value has been set". But in truth we are setting an actual value, the value of `null`. Because C and C# are compiled languages, there is no concept of `undefined` because when we click compile it immediately tells us that we have not declared a variable before we tried to use it.

JavaScript extends the concept of `undefined` beyond just not declaring a variable or property. You can explicitly set and return `undefined`. Additionally, when decoding data from JSON the property may not be included in the JSON stream which would put it in an `undefined` state. This is different than C# where that value becomes `null` - or if the property cannot accept a `null` value then an exception is thrown.

Therefore, it is important to remember that `null` and `undefined` are two distinct values in JavaScript, even though we will likely treat them the same way in most instances. For example, if you declare an interface or type in TypeScript to represent the data you are going to decode from JSON you should declare the property as optional with the "?" suffix. This tells TypeScript that it might actually be `undefined`. Then when you try to access that property it will enforce that you check if it is defined first.

This means something like a `createdDateTime` property could have 3 states when we decode it from JSON:

1. `undefined` - it wasn't included in the JSON stream.
2. `null` - it was included but set to null because C# did not have a value.
3. `string` - it was included and the value is of type string.

To account for that, you should declare the property like this:

```
createdDateTime?: string | null;
```

This will tell the compiler that you *expect* the value to be either a `string` or a `null`, but it *could* also be `undefined`. If you try to use that property before you check the type of value it will warn you.

Now, if we want to use `createdDateTime` property by passing it to our date parser so we can work with the date value, we would need to do something like:

```
if (model.createdDateTime !== undefined
    && model.createdDateTime !== null
    && model.createdDateTime !== "") {
    // do something with model.createdDateTime.
}
```

The final check is because even though the value isn't `undefined` or `null` it could still be a zero length string. Depending on your use case you may not need the length check, but remember that just like C#, while a value is a valid string it might also be an empty string which may not be "valid" in your context.

However, what we wrote above is quite verbose and will be tiring. Instead we can, and should, use "truthy" checks to achieve the same result.

```
if (mode.createdDateTime) {
    // do something with model.createdDateTime.
}
```

Remember that this truthy check will only pass for a non-empty string, so if you need to take a different action if the string is empty you will need to use a different type of check.

You can use this "[truthy table](https://dorey.github.io/JavaScript-Equality-Table/#if-statement)" to get an idea of how JavaScript will respond to the different values when used in a truthy check like the above.
