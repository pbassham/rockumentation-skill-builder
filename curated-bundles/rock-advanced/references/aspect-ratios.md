---
description: "Use when styling elements with fixed aspect ratios like video, square, portrait, or landscape containers"
source: "https://community.rockrms.com/styling"
sourceLabel: Styling
---
> **Path:** Styling > Utilities > Aspect Ratios

## Aspect Ratios

Helper classes for controlling the aspect ratio of an element.

**Note:** This feature requires Rock v17 or later.

## Aspect Ratio Sizes

- [Thin](#thin)
- [Film](#film)
- [Landscape](#landscape)
- [Video](#video)
- [Short Square](#short-square)
- [Square](#square)
- [Portrait](#portrait)
- [Tall](#tall)

### Thin (3:1)

```
<div class="ratio-thin">

        </div>
```

### Film (2.35:1)

```
<div class="ratio-film">

        </div>
```

### Landscape (2:1)

```
<div class="ratio-landscape">

        </div>
```

### Video (16:9)

```
<div class="ratio-video">

        </div>
```

### Short Square (1.25/1)

```
<div class="ratio-short-square">

        </div>
```

### Square (1/1)

```
<div class="ratio-square">

        </div>
```

### Portrait (1/1.25)

```
<div class="ratio-portrait">

        </div>
```

### Tall (1/1.75)

```
<div class="ratio-tall">

        </div>
```

## Placing Content Within

**Note:** When placing content within a fixed-ratio element, you'll want to make sure that the ratio you're using provides adequate space for the content that is contained within the element – this is especially important at smaller breakpoints (phones). For these scenarios, usually it's best to begin with `ratio-portrait` or `ratio-square` and then transition to `ratio-md-video` or a wider aspect as the screen width increases.

## This is a landscape fixed-ratio element with content inside of it.

Qui consectetur id labore ullamco nulla voluptate ipsum.

[Learn More](#)

```
<div class="ratio-square ratio-lg-film p-4 p-sm-5 d-flex justify-content-center align-items-center">
    <div>
      <h2 class="text-white">This is a landscape fixed-ratio element with content inside of it.</h2>
      <p>Qui consectetur id labore ullamco nulla voluptate ipsum.</p>
      <p class="mb-0"><a href="#" class="btn btn-primary">Learn More</a></p>
    </div>
</div>
```

## With a Background Image

## This is a fixed-ratio element with content inside of it.

Qui consectetur id labore ullamco nulla voluptate ipsum.

[Learn More](#)

```
<div class="ratio-square ratio-lg-film bg-black position-relative p-4 p-sm-5 d-flex justify-content-center align-items-center overflow-hidden">

    <!-- Gradient overlay that helps with contrast between background and text -->
    <div class="position-absolute top-0 right-0 bottom-0 left-0 o-100 z-10" style="background: linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 50%);"></div>

    <!-- Background image-->
    <div class="position-absolute top-0 right-0 bottom-0 left-0 o-60" style="background-image:url('https://images.unsplash.com/photo-1707895732866-dbd50e690912?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'); background-size: cover; background-position: top center;"></div>

    <!-- Content container-->
    <div class="position-relative z-20">
      <h2 class="text-white">This is a fixed-ratio element with content inside of it.</h2>
      <p>Qui consectetur id labore ullamco nulla voluptate ipsum.</p>
      <p class="mb-0"><a href="#" class="btn btn-primary">Learn More</a></p>
    </div>
</div>
```

