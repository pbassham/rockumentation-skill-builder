---
description: Use when implementing pub-sub messaging between components on a single page using the browser bus API
source: "https://community.rockrms.com/developer/obsidian"
sourceLabel: Obsidian
---
> **Path:** 

## Overview

The browser bus is a basic pub-sub interface within a single page. If you publish a message to one instance of the bus it will be available to any other instance on the same page. The browser bus will not communicate with other browsers on the same page or even other tabs within the same browser.

This uses `document.addEventListener()` and `document.dispatchEvent()` with a single custom event name of `rockMessage`. Because of this, we are able to integrate the browser bus into plain JavaScript. This means that Rock administrators can add JavaScript to a page that will respond to messages sent by Obsidian blocks. They can even publish messages into the browser bus.

When reading the rest of the this documentation, it is important to remember that everything below is simply a convenience wrapper around the `addEventListener()` and `dispatchEvent()` JavaScript functions. There is no magic happening here.

## Messages

A message is simply a JavaScript object that contains the following properties.

| Property | Description |
| --- | --- |
| name | The name of the message. |
| blockType | The Guid of the type of block that sent the message. This may be undefined if it was not known at the time the message was sent. |
| block | The Guid of the block instance that sent the message. This may be undefined if it was not known at the time the message was sent. |
| timestamp | The timestamp when this message was published. This is a JavaScript time number from Date.now(). |
| data | The data that was published with the message. This varies by message. |

Important

While the data property can contain any data type, it should always be defined as either void (no data) or a JavaScript Object. Meaning, do not just pass a number or an array. This allows for adding new properties to existing messages in the future without breaking backwards compatibility.  

## Types of Messages

As you might notice in the table above, there is no `messageType` property to identify what type of message it is. This is intentional. Messages have no type, just a name. However, conceptually there are currently two different message types:

1. Block Messages
2. Page Messages

A block message is one that describes some state or action performed by a block. It is expected to have the `block` and `blockType` properties filled in. An example of this kind of message might be the Notes block sending a message saying a new note was created. This could then give other blocks on the page a chance to react to that and refresh something (such as a count of the number of notes).

A page message on the other hand describes some state or action related to the entire page. For example, a page message might be published when the page context changes from something like the Campus Context Picker block. Even though it is probably indirectly sent *by* a block, in this case it is a page message because it is informing of state change that affects the entire page.

### Framework Messages

We also have a terminology concept of "framework messages". These are messages that are *usually* sent automatically by the Obsidian framework rather than a block instance. For example, the base `DetailBlock` component will publish messages when going into Edit mode and when leaving Edit mode. At present, all Page messages would be considered framework messages.

So in the example of the Campus Context Picker, it would not send the message itself nor would it change the page context directly. It would call a framework function to inform it of new context values. That framework function would then update the internal state and publish the message.

Framework message namess are defined in `@Obsidian/Utility/browserBus` as the exports `PageMessages` and `BlockMessages`. The data types are defined in `@Obsidian/Types/Utility/browserBus`.

Note

When adding a new framework messages there are a few steps that need to be taken. Please read the section below carefully.

## Adding Framework Messages

To make things easy to understand and reduce the risk of accidental miss use of framework messages there are a few things that need to be done.

1. Define the message name.
2. Define the message data structure.
3. Define the function signature overload on the subscribe functions.

Note

Make sure to keep things alphabetically sorted and use comments to describe both what it is and how it is used.

If the data property is `id` do not just comment and say "The identifier". Describe what the value is identifying and how it is used. For example, "The identifier of the entity that was updated. This may be null if the operation was not related to a specific entity."

First you need to define the message name. This is done in the `@Obisidian/Utility/browserBus.ts`. If you are adding a block level framework message it will be added to the `BlockMessages` constant. If it is a page level framework message then add it to the `PageMessages` constant.

Next open up `@Obsidian/Types/Utility/browserBus.d.ts` file. Find either the `Block Framework Messages` region or the `Page Framework Messages` region and add a new type definition. If no data is included in the message then the type should be defined as `void`.

Finally go back to the `@Obsidian/Utility/browserBus.ts` file and down to the `BrowserBus` class. In there find the regions for the various subscribe functions. Add a new function signature overload with the explicit message name and associated data type. This should be added to the `subscribe()`, `subscribeToBlockType()` and `subscribeToBlock()` functions. You do not need a body, just the signature. This allows TypeScript to automatically know the data type based on the message name.

Important

Do not add custom block messages in this way unless the message is intended to be used by a lot of other blocks. If that is the case then it should be discussed with the PO and DSD about "promoting" the message to a framework message.

## Message Names

Message names should be in camelCase and namespaced with a period (`.`) separator. There is a set of namespaces that must be used when picking a message name.

- Page level framework messages must be prefixed with `page.core`.
- Block level framework messages must be prefixed with `block.core`.
- Core blocks must prefix their own custom messages with `block`.
- Custom plugins must prefix custom messages with either `plugin.block.` or `plugin.page.`.

Message names do not need to be unique in that a single message name can be used by multiple blocks *if it serves the same purpose*. For example, the `DetailBlock` component will emit the message `block.core.beginEdit` for every detail block when it enters edit mode. In this case we are re-using the same message name because it serves the same purpose in each block we are using it.

If the message is not being used for the same purpose, then a different name should be used whenever possible. For example, suppose the HTML Content block uses the message `block.contentUpdated` to indicate that its displayed content has changed after an edit.

Now you are writing a block that dynamically updates a counter on screen via the real-time engine and you want to send a message when that counter changes. In this case, you should probably not use the same `block.contentUpdated` message because the intended purpose is different. The HTML Content block is most likely sending the message to announce that its entire content has been replaced. In your case, you are probably just changing one `span`. So a custom message named `block.counterUpdated` might make more sense.

On the other hand, if you are using the real-time engine to replace all or a large chunk of your content (say from a Lava template) based on the real-time message received, then re-using the `block.contentUpdated` message name would probably make sense.

The reason for all this should make more sense in the section on subscribing to messages below.

## Getting a BrowserBus

There are essentially two ways to get a BrowserBus instance. The first is a "block" BrowserBus and the second is a "generic" BrowserBus. Let's look at how we get these and then we'll talk about the differences.

```
import { useBlockBrowserBus } from "@Obsidian/Utility/block";

const browserBus = useBlockBrowserBus();
```

In this example we import and call the `useBlockBrowserBus` function. Calling this function from a component will return a browser bus configured for the current block instance. If by chance there is no block instance then a "generic" BrowserBus is returned.

```
import { useBrowserBus } from "@Obsidian/Utility/browserBus";

const browserBus = useBrowserBus();
```

In this example we import and call the `useBrowserBus` function. Note that it is imported from the `browserBus` file instead of the `block` file. This will create and return a "generic" BrowserBus instance. This is the pattern you would want to do if you need to publish a message that isn't intended to come from a specify block, or you know you won't have access to a block when you need to get the bus.

Now for the differences. A bus that is configured for a block simply means that any calls to `publish()` will automatically set the `block` and `blockType` properties of the message to match the block. That's it.

In other words, once you have a BrowserBus instance you don't need to care how you got it. Subscribing to messages happens the same way. And when you publish a message it will automatically "do the right thing".

## Subscribing to Messages

There are effectively 6 ways to subscribe to messages. These 6 ways are broken down into a 2x3 matrix of operations.

The first component is whether to subscribe to a specific named message or to any message name.

The second component is whether you want to subscribe to messages from a single block instance; from any block of a specific type; or to all messages from any source.

This gives us the following subscription functions (where `cb` is the callback function):

| Function | Messages subscribed to |
| --- | --- |
| subscribe(cb) | Any message with any name from any source. |
| subscribe(msgName, cb) | A single named message from any source. |
| subscribeToBlockType(blockType, cb) | Any message that originated from any block instance with a matching block type Guid. |
| subscribeToBlockType(msgName, blockType, cb) | A single named message from any block instance with a matching block type Guid. |
| subscribeToBlock(block, cb) | Any message that originated from the single block instance Guid. |
| subscribeToBlock(msgName, block, cb) | A single named message from the single block instance Guid. |

The most common use-case will be `subscribe(msgName, cb)`. Meaning, we want to know when a specific message was published, but we don't care who it came from.

However, as you can see, there are plenty of ways to pinpoint that down to messages from a specific source. When talking about message names we mentioned that message names don't *need* to be unique. The reason is this subscription model.

Suppose you have a Detail block and a List block on the same page. The contents of the List block depend on the entity displayed in the Detail block. Meaning, the contents of the List block will change depending on the saved values of the entity. In this case you need to know when the Detail block has finished editing so you can reload. But if some *other* block on the page finishes editing, you don't care.

To achieve this, you can use the `subscribeToBlockType(msgName, blockType cb)` method. By passing it the block type Guid of the Detail block (which won't change even if the block is deleted and added back), you know that your callback is only called when you want it to be called.

A full example of this might look something like this.

```
import { useBlockBrowserBus } from "@Obsidian/Utility/block";

const browserBus = useBlockBrowserBus();

browserBus.subscribeToBlockType("block.core.endEdit",
    "df0b5c49-f105-4297-8226-f8234517bee9",
    onEndEdit);

function onEndEdit(): void {
    // Do something to reload the content.
}
```

With this setup, our `onEndEdit` function will only be called for the message named `block.core.endEdit`. Additionally, it will only be called if the message `blockType` property matches the guid `df0b5c49-f105-4297-8226-f8234517bee9`.

## Publishing Messages

Publishing a message is performed by calling the appropriate function on a `BrowserBus` instance.

You have two options when publishing. The first is to give the name of the message and optionally the data to go along with the message, this will construct the message object for you. The second is to construct a message object yourself and then publish the message.

Lets take a look at an example of publishing a fictitious custom block message.

```
import { useBlockBrowserBus } from "@Obsidian/Utility/block";

const browserBus = useBlockBrowserBus();

browserBus.publish("block.actionPerformed", { id: 42 });
```

Line 5 is where we actually publish the message. As you can see, it is as simple as giving it the name of the message and the data object. If the message has no data then you can just omit the parameter entirely.

## Native JavaScript

We mentioned in the overview that this just uses standard JavaScript DOM events under the hood. This is on purpose so that we can interact with the BrowserBus in plain JavaScript. For example if somebody uses an HTML Content block to add content to a page and they want to be able to respond to block events.

Here is an example of subscribing to the BrowserBus in plain JavaScript.

```
document.addEventListener("rockMessage", event => {
    var message = event.detail;
    console.log(\`Received message {message.name} with data\`, message.data);
});
```

As you can see this is simple and straight forward. Since you have access to the full message object you can do any filtering on the source `blockType` and `block` properties if you need to.

Here is an example of publishing to the BrowserBus in plain JavaScript.

```
document.dispatchEvent(new CustomEvent("rockMessage", {
    detail: {
        name: "page.core.someAction",
        timestamp: Date.now(),
        data: {
            id: 42
        }
    }
}));
```

While a bit more verbose than what you have to do in Obsidian, this results in the same final output. Since the `detail` property is a `Message` object, you can also specify the `blockType` and `block` properties in the message if you need to. But pretending to be a block on the page probably doesn't make sense so you would normally be sending page framework style messages like above.

---

## Caching API Calls {#caching-api-calls}

There are many times that we want to limit how much we fetch data from our APIs, especially if a control eagerly fetches data, because if multiple of the same control is placed on a page, they will all make the same API call to fetch the exact same data.

This isn't the simplest thing to do because the API calls are asynchronous, meaning they'll return Promises, which can't be stored in the string-only client-side storage mechanisms. This means that we have to wait until the server responds before we can cache the result (as a JSON string), so in the meantime more requests can be fired to fetch the same data while we're waiting for one to finish and cache. So, we also need an in-memory cache of the Promise that we can return for subsequent calls until the results come back and are able to be put into the longer-term cache.

To handle this, we have a function: `cachePromise`. To use it, import it from `"@Obsidian/Utility/cache"`, then pass it a key (the identifier name it's stored under), a function that returns a Promise, and optionally an expiration time (defaults to one minute). It will return a function that you can call that will fire off the request the first time it's called and pull from the appropriate cache every other time.

For example:

```
import Cache from "@Obsidian/Utility/cache";
import { useHttp } from "@Obsidian/Utility/http";
import { RockDateTime } from "@Obsidian/Utility/rockDateTime";

const http = useHttp();

const fetchConfig = Cache.cachePromise("uniqueKeyForThisFunction", async () => {
    const result = await http.post<ConfigBag>("/api/v2/Controls/GetConfig");

    if (result.isSuccess && result.data) {
        return result.data;
    }

    throw new Error(result.errorMessage ?? "Error fetching config");
}, RockDateTime.now().addMinutes(10));
```

Now you can call `fetchConfig` all you want within that 10 minute (note param on the last line specifying expiration of 10 minutes) window and it will only fetch from the API once. Then it will allow you to fetch from the server once again after that, caching those results for 10 minutes again.
