> **Path:** Developer Codex > Coding Standards > UI Standards > Use of Bootstrap Grid/Row/Column

# Use of Bootstrap Grid/Row/Column

You usually don't need to include extra `.row .col-md-12` divs as shown below:

```html
<div class="row">
  <div class="col-md-12">
    ...
  </div>
</div>
```

(unless you need to use floats inside the column)

A bootstrap `row` has a margin of -15px, and a bootstrap column has a margin of 15px. The two divs effectively cancel each other, and are generally not needed inside of Rock blocks.

Example:

[https://codepen.io/garrettjohnson/pen/jOPWMpa?editors=1000](https://codepen.io/garrettjohnson/pen/jOPWMpa?editors=1000)
