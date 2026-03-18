> **Path:** Mobile Docs > 🧱 Essentials > Lava > Context in Lava

# Context in Lava

### Context on the Server

The context is available on the server much like it is for web blocks. This context includes any standard context defined by the shell (for example, the Campus Context Picker) as well as any context defined by the pages. The notation is:

```
{{ Context.Campus.Name }}
```

### Context on the Client

M v2.0

What's available to the client is much less detailed than the server. For now, the only context available is the Campus context and only the `Guid` property will be available. The only context objects available are those defined on the shell client, such as from the Campus Context Picker. Any context defined by the page itself is not available.

```
{{ Context.Campus.Guid }}
```
