> **Path:** Developer Codex > Coding Standards > Code Security

# Code Security

When accepting data back from a post-back, assume someone has tampered with it and re-validate it. In other words, never use an ID in a hidden field that you didn’t expect someone could change (they can change them).

1.  Do not use simple “Id” fields (person.Id, etc) to identify a person, if it’s not possible to the `PersonActionIdentifier` then use Guids. Even then, realize Guids are also not hidden or secret, and therefore must not be accepted without revalidating they haven’t been tampered with. This is *especially* true for public facing blocks.
