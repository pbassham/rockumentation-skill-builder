---
description: Use when implementing loading indicators and spinners for HTMX requests in Rock applications
source: "https://community.rockrms.com/developer/helix"
sourceLabel: Helix
---
> **Path:** 

HTMX has a sophisticated and well considered loading indicator pattern. See their documentation for all of the details. Below are a couple of prebuilt patterns to help you get started.

Note

The image paths below are for when using Helix with Rock v18 or later. If you are using the plugin version of Helix, the paths will be `/Plugins/tech_triumph/LavaHelix/Assets/Spinners/...`

## Adding Indicator To Buttons

One great way to show that progress is to add a loading indicator to the button that triggered the event. Below is a pattern for doing just that.

![](https://community.rockrms.com/GetImage.ashx?Id=66749)

```
<button hx-post="^/my-app/my-endpoint" class="btn btn-primary" hx-target=".response">
    Save
    <img src="/Assets/Images/Spinners/small-circle-light.svg" class="htmx-indicator">
</button>
```

Notes:

1. It's best to use a small animated SVG for buttons. Here's one great resource to find one of your liking:
2. Note that the SVG is added directly to the page. We updated the width and height to fit nicely in our button. We also modified the stroke color to be white with a subtle opacity.

## Adding Larger Indicators

Want to make more of a statement? Check-out the spinners at [Loading.io](https://loading.io/spinner/). These can easily be integrated into your application. Below is a sample of what can be done.

![](https://community.rockrms.com/GetImage.ashx?Id=66750)

Here's the code for this example.

```
{[ panel title:'Register' ]}

    <lava-form id="register-form" class="loading-full">
    
        <div class="htmx-indicator">
            <img src="/Assets/Images/Spinners/double-ring.svg">
        </div>
    
        <input type="hidden" name="personid" value="1">
        
        <div class="form-group {{ type }}">
            <label class="control-label" for="{{ id }}">First Name</label>
            <div class="control-wrapper">
                <input class="form-control" id="rc-12" type="text" name="xyz" value="" required>
            </div>
        </div>
        
        <div class="form-group {{ type }}">
            <label class="control-label" for="{{ id }}">Last Name</label>
            <div class="control-wrapper">
                <input class="form-control" id="rc-13" type="text" name="xyz" value="" required>
            </div>
        </div>
        
        <button hx-post="^/cato/group-add" class="btn btn-primary" hx-indicator="#register-form" hx-target=".response">Save</button>
        
    </lava-form>
    
    <div class="response"></div>

{[ endpanel ]}
```

---

## Strategies {#strategies}

# Strategies

---

## Tips {#tips}

Below are some tips we've gathered from our experience rolling out Helix in our work.

1. Browser Dev Tools - Something not working? Be sure to check the JavaScript console in your browser's Dev Tools. Often times you'll have the `hx-target` or some other configuration wrong and you'll find a helpful tip in the console.
2. Inheritance - Many attributes in HTMX can be inherited from parent elements, which is a powerful feature but can also lead to unexpected behaviors. If something isn't working as expected, check up the DOM for HTMX attributes that could be causing the issue.

---

## Related Entities {#related-entities}

Warning

Writing in progress!

We will talk about the power of this hidden gem.

---

## Limitations {#limitations}

While we've worked to make Lava and Rock compatible with Helix, there are some limitations:

1. Lava Commands That Require RockPage - The `{% javascript %}` and `{% stylesheet %}` commands won’t work with Helix. These commands rely on RockPage to execute and render their markup. Since Helix dynamically updates portions of the page, RockPage isn’t available in those cases.
