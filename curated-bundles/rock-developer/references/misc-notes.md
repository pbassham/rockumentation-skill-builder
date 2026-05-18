---
description: "Use when configuring picker required behavior, deselection options, or diagnosing Vue compiler syntax errors"
source: "https://community.rockrms.com/developer/obsidian"
sourceLabel: Obsidian
---
> **Path:** 

## Picker Requiredness

When working with pickers, there are two pieces that work together.

1. Required rule.
2. showBlankItem attribute.

If you want to have a picker be required and also allow the person to deselect a value, then you need to set the "required" rule and also "showBlankItem". This will allow the person to deselect the current value, but will require them to set a value before submitting the form.

If you want the picker to not be required *and also* allow them to deselect the current value, then do not set the "required" rule but do set the "showBlankItem". In most pickers, "showBlankItem" means "allow deselection" rather than showing a blank item in the list for them to pick.

The other two combinations are a bit more rare.

1. Use the "required" rule without "showBlankItem". This will make the value required and not allow the person to deselect the current value. So on initial load it might be blank (unless a value is already set), and once the person selects a value they can not go back to blank.
2. Don't use the "required" rule and do not use "showBlankItem". The value will not be required, but again once they select a value they can not deselect it.

## Vue Compiler Syntax Error Reference

The list below is the Vue compiler errors. These show in up JavaScript as "SyntaxError 15" (or some other number). These should only be a problem for older .TS files instead of the new .OBS files, but they are a pain to track down when you don't know what the number is.

```
export declare const enum ErrorCodes {
    ABRUPT_CLOSING_OF_EMPTY_COMMENT = 0,
    CDATA_IN_HTML_CONTENT = 1,
    DUPLICATE_ATTRIBUTE = 2,
    END_TAG_WITH_ATTRIBUTES = 3,
    END_TAG_WITH_TRAILING_SOLIDUS = 4,
    EOF_BEFORE_TAG_NAME = 5,
    EOF_IN_CDATA = 6,
    EOF_IN_COMMENT = 7,
    EOF_IN_SCRIPT_HTML_COMMENT_LIKE_TEXT = 8,
    EOF_IN_TAG = 9,
    INCORRECTLY_CLOSED_COMMENT = 10,
    INCORRECTLY_OPENED_COMMENT = 11,
    INVALID_FIRST_CHARACTER_OF_TAG_NAME = 12,
    MISSING_ATTRIBUTE_VALUE = 13,
    MISSING_END_TAG_NAME = 14,
    MISSING_WHITESPACE_BETWEEN_ATTRIBUTES = 15,
    NESTED_COMMENT = 16,
    UNEXPECTED_CHARACTER_IN_ATTRIBUTE_NAME = 17,
    UNEXPECTED_CHARACTER_IN_UNQUOTED_ATTRIBUTE_VALUE = 18,
    UNEXPECTED_EQUALS_SIGN_BEFORE_ATTRIBUTE_NAME = 19,
    UNEXPECTED_NULL_CHARACTER = 20,
    UNEXPECTED_QUESTION_MARK_INSTEAD_OF_TAG_NAME = 21,
    UNEXPECTED_SOLIDUS_IN_TAG = 22,
    X_INVALID_END_TAG = 23,
    X_MISSING_END_TAG = 24,
    X_MISSING_INTERPOLATION_END = 25,
    X_MISSING_DIRECTIVE_NAME = 26,
    X_MISSING_DYNAMIC_DIRECTIVE_ARGUMENT_END = 27,
    X_V_IF_NO_EXPRESSION = 28,
    X_V_IF_SAME_KEY = 29,
    X_V_ELSE_NO_ADJACENT_IF = 30,
    X_V_FOR_NO_EXPRESSION = 31,
    X_V_FOR_MALFORMED_EXPRESSION = 32,
    X_V_FOR_TEMPLATE_KEY_PLACEMENT = 33,
    X_V_BIND_NO_EXPRESSION = 34,
    X_V_ON_NO_EXPRESSION = 35,
    X_V_SLOT_UNEXPECTED_DIRECTIVE_ON_SLOT_OUTLET = 36,
    X_V_SLOT_MIXED_SLOT_USAGE = 37,
    X_V_SLOT_DUPLICATE_SLOT_NAMES = 38,
    X_V_SLOT_EXTRANEOUS_DEFAULT_SLOT_CHILDREN = 39,
    X_V_SLOT_MISPLACED = 40,
    X_V_MODEL_NO_EXPRESSION = 41,
    X_V_MODEL_MALFORMED_EXPRESSION = 42,
    X_V_MODEL_ON_SCOPE_VARIABLE = 43,
    X_INVALID_EXPRESSION = 44,
    X_KEEP_ALIVE_INVALID_CHILDREN = 45,
    X_PREFIX_ID_NOT_SUPPORTED = 46,
    X_MODULE_MODE_NOT_SUPPORTED = 47,
    X_CACHE_HANDLER_NOT_SUPPORTED = 48,
    X_SCOPE_ID_NOT_SUPPORTED = 49,
    __EXTEND_POINT__ = 50
}
```
