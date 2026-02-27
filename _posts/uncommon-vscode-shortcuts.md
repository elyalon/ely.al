---
title: Uncommon VS Code Shortcuts
date: 2026-02-27
---

The visual keyboard shortcuts editor in VS Code (openable with _"Preferences:
Open Keyboard Shortcuts"_ in the command palette) can be used to edit keyboard
shortcuts.

Using the visual editor actually just edits a configuration file called
`keybindings.json` (openable with _"Preferences: Open Keyboard Shortcuts
(JSON)"_ in the command palette).

This file can also be edited manually to do the same thing, although some
commands which you can bind to can also take in an `"args"` field (you will see
these later), which cannot be configured using the visual editor and so you must
edit the file to configure those shortcuts.

Okay... let's begin!

## Trigger Hover

**Command**: _"Show or Focus Hover"_ (ID: `editor.action.showHover`)

This shows the hover popup for the symbol under the cursor, as if you hovered it
with your mouse. Press it again while the hover is visible to focus the preview,
which lets you scroll it with arrow keys.

I bound it to `Cmd+E`. I use it constantly for LSP diagnostics, symbol
documentation, and anything else you'd normally hover for.

## Paragraph Movement

A paragraph here means a group of consecutive non-empty lines. This
`keybindings.json` snippet let you jump between paragraphs with
`Ctrl+Up`/`Down`, or select while jumping with `Ctrl+Shift+Up`/`Down`.

```json
[
  // SNIP
  {
    "key": "ctrl+up",
    "command": "cursorMove",
    "when": "editorTextFocus",
    "args": { "to": "prevBlankLine" }
  },
  {
    "key": "ctrl+down",
    "command": "cursorMove",
    "when": "editorTextFocus",
    "args": { "to": "nextBlankLine" }
  },
  {
    "key": "ctrl+shift+up",
    "command": "cursorMove",
    "when": "editorTextFocus",
    "args": { "to": "prevBlankLine", "select": true }
  },
  {
    "key": "ctrl+shift+down",
    "command": "cursorMove",
    "when": "editorTextFocus",
    "args": { "to": "nextBlankLine", "select": true }
  }
  // SNIP
]
```

I really like paragraph movement because it's a nice in-between of line movement
(`Up`/`Down`) and page movement (`PgUp`/`PgDn`). It's also just a nice "logical
unit" of movement, as programmers use empty lines to delineate separation.

**Note**: On MacOS, `Ctrl+Up` and `Ctrl+Down` are bound to Mission Control
shortcuts. You can change or disable those in **System Preferences > Keyboard >
Keyboard Shortcuts... > Mission Control**.

## Arbitrary Toggles

The
[Toggle](https://marketplace.visualstudio.com/items?itemName=rebornix.toggle)
extension lets you bind a key to toggle any VS Code setting between values. This
is a snippet from my `keybindings.json` of how I use it:

```json
[
  // SNIP
  {
    "key": "cmd+k alt+w",
    "command": "toggle",
    "args": {
      "id": "render-whitespace",
      "value": [
        { "editor.renderWhitespace": "selection" },
        { "editor.renderWhitespace": "all" }
      ]
    }
  },
  {
    "key": "cmd+k alt+i",
    "command": "toggle",
    "args": {
      "id": "render-indentation-guides",
      "value": [
        { "editor.guides.indentation": false },
        { "editor.guides.indentation": true }
      ]
    }
  },
  {
    "key": "cmd+k alt+n",
    "command": "toggle",
    "args": {
      "id": "render-line-numbers",
      "value": [{ "editor.lineNumbers": "off" }, { "editor.lineNumbers": "on" }]
    }
  },
  {
    "key": "cmd+k alt+f",
    "command": "toggle",
    "args": {
      "id": "format-on-save",
      "value": [
        { "editor.formatOnSave": false },
        { "editor.formatOnSave": true }
      ]
    }
  },
  {
    "key": "cmd+k alt+d",
    "command": "toggle",
    "args": {
      "id": "diff-decorations",
      "value": [
        { "scm.diffDecorations": "none" },
        { "scm.diffDecorations": "all" }
      ]
    }
  },
  {
    "key": "cmd+k alt+o",
    "command": "toggle",
    "args": {
      "id": "folding-controls",
      "value": [{ "editor.folding": false }, { "editor.folding": true }]
    }
  }
  // SNIP
]
```

Also, at the top of my `settings.json` I have the settings which are toggled by
these shortcuts so I can easily see their current values:

```json
{
  // TOGGLED WITH KEYBINDINGS
  "editor.renderWhitespace": "all",
  "editor.guides.indentation": true,
  "editor.formatOnSave": true,
  "editor.lineNumbers": "off",
  "editor.folding": false,
  "scm.diffDecorations": "none"

  // ... the rest of my settings
}
```
