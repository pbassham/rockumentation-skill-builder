> **Path:** Developer Codex > Coding Standards > Maintaining Compatibility > Binary Compatibility

# Binary Compatibility

A source code change is considered binary-compatible if the compiler generates the same intermediate code (IL) for public declarations as the previous code. In this case, it can be used by a dependent component such as a plug-in without requiring that assembly to be rebuilt or altered in any way. It's important to understand that some code changes may be source-compatible so that they do not require any source-code changes in the dependent component, but still fail the test of binary compatibility because the component requires recompilation to work correctly.
