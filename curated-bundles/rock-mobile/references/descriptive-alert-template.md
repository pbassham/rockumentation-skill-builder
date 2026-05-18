---
description: "Use when displaying lengthy important information like terms of service or policies with a title, scrollable content area, and action buttons"
source: "https://community.rockrms.com/developer/apple-tv-docs"
sourceLabel: Apple TV Docs
---
> **Path:** 

Use this template to display a significant amount of important information, such as a Terms of Service page. A title is displayed at the top of the screen with a large text area directly below it. An area containing buttons is located along the bottom of the screen.

![](https://community.rockrms.com/GetImage.ashx?Id=66408)

## Tips & Tricks

- Default theme: System preference

## Templates

**Default**

![](https://community.rockrms.com/GetImage.ashx?Id=66409)

```
<document>
  <descriptiveAlertTemplate>
  	<title>Title</title>
    <description showsScrollIndicator="true">Lorem ipsum dolor sit amet, turpis non wisi metus egestas velit sagittis, wisi faucibus eget aliquet dolor convallis, sociis felis blandit, enim purus vestibulum nulla sit cupiditate. Elit praesent bibendum ante, a feugiat nunc molestie ad dolor. Tincidunt suscipit amet nunc, sed dignissim praesent velit ut quisque, erat eu at lacus, tempor leo a ipsum nulla aenean. Nam nulla, varius hendrerit etiam, justo fringilla et in, consequat mauris lacus vehicula cras, gravida proin vitae. Vehicula adipiscing eget, leo ipsum. Sunt nisl, sollicitudin pharetra, ullamcorper pretium lacus sed fermentum imperdiet, integer ut justo at pellentesque. Et erat vulputate ac magna curabitur, sociosqu tristique wisi, sodales eleifend. Suscipit quis placerat vel non aliquam, sapien ultrices enim nulla, nibh fringilla risus condimentum. Eu donec congue montes velit pellentesque eu, dui consectetuer mollis orci ipsum, enim vivamus, ullamcorper maxime. Tellus elit vel lacus sed. Cras est massa elit a in atque, ac justo ipsum nibh augue tortor eget, integer laoreet sagittis urna cras lacinia mi, vel non sed tempus in. Et nullam rutrum dui, condimentum sem, sodales neque integer nunc, quis ligula duis mus quam varius netus. Fermentum netus arcu sit. Nunc vestibulum duis porta etiam, ut ipsum id, sollicitudin id ad. Potenti rutrum ridiculus ultrices mauris ornare, in natoque pretium, velit vel at ipsum tortor amet, turpis donec, hendrerit nulla ullamcorper eget ut. Platea est a nunc, porta blandit elit quis elit a, sit vestibulum nulla eget facilisis facilisis accumsan, erat turpis integer viverra maecenas rerum et. Rutrum non tempus, porta rutrum nec et volutpat, viverra laoreet erat semper, proin urna mauris sagittis rhoncus. Massa dignissim per ut id donec ultrices, non adipiscing dis neque ultricies lectus ullamcorper, vel amet sapien et, suspendisse mollis sit in vel, quis et ut accumsan consectetuer. Semper sodales vivamus libero, amet eu vestibulum dolor enim fusce fusce, faucibus maecenas quam turpis vel. Sapien pede dis, leo ante et sit rutrum. Pellentesque sollicitudin in nec sed libero augue, elit aliquam wisi lectus, neque quam nec vitae, diam ligula tortor, suspendisse aliquet quis. Sapien in lacinia auctor, felis quisque iaculis arcu accumsan, vel mattis id id, purus donec arcu tempor quam nec. A convallis vel nonummy, habitasse amet integer, dui arcu et maecenas, vestibulum curabitur commodo sit. Vivamus leo fringilla porttitor, etiam class quis risus blandit. Blandit blandit arcu augue, at vitae et nascetur mauris pulvinar cum. Ac nec tincidunt justo alias, urna leo nam non platea nec elementum. Est magna in. Massa ac. Ornare enim vestibulum, aenean nibh, nunc eget maecenas neque, suscipit molestie. Sed at lorem et, nonummy sit quis fringilla suscipit cras, leo cras sem nulla, mauris aliquam mauris pede ut purus aliquam. Ultricies in ut. Aliquam egestas erat augue in nibh nunc, nunc curabitur senectus turpis, vestibulum duis eget rhoncus metus, diam mattis, tellus magna potenti in et volutpat. Risus pede sed lectus penatibus, litora ut at, interdum sapien vestibulum duis, sapien ac cum fermentum, dictumst dolor interdum luctus vulputate conubia. Tortor nec in, curabitur sagittis class dapibus. Feugiat tincidunt, tellus pede est sem sed netus erat. Felis euismod amet felis. Leo nonummy erat, eu orci praesent consectetuer, elementum amet tristique metus ac. Vestibulum ultrices vivamus, aenean tempus luctus. Pellentesque sem feugiat, sodales sollicitudin, est amet ornare. Quidem vulputate ridiculus augue wisi ac, quis at libero blandit, non ultrices metus feugiat laboriosam vel consequatur, odio ac ut aliquam potenti, ut fermentum consectetuer sapien mauris bibendum. Pretium ullamcorper commodo est donec ac, ultrices eu laoreet fringilla erat auctor, in a non nullam pellentesque placerat. Urna lacus id phasellus, magnis vestibulum justo tellus urna, lectus donec urna. Culpa lacus mollis bibendum mi vel, libero ligula maecenas, vestibulum sociosqu dignissim fermentum, metus tempus sapien lectus. Vitae sem quisque, vestibulum habitant integer bibendum mauris feugiat, lectus nibh nunc odio pellentesque tortor, est scelerisque volutpat, diam vel magna turpis. Sem dolor feugiat ut luctus eu, id ligula arcu diam etiam lacus. Justo mi nisl sed. Quis nec vestibulum vestibulum amet pede posuere, risus est. Nunc nunc consequat ullamcorper eu, dui suspendisse, posuere nullam vel. Fermentum id pellentesque, ut ante eu elit, curabitur mauris felis vestibulum montes integer diam. Vitae et duis dictum non condimentum.</description>
    <!-- Optional buttons -->
    <row>
    	<button>
	      <text>Button 1</text>
	    </button>
	    <button>
	      <text>Button 2</text>
	    </button>
    </row>
  </descriptiveAlertTemplate>
</document>
```

**With Shelf**

![](https://community.rockrms.com/GetImage.ashx?Id=66410)

```
<document>
  <head>
    <style>
      .showTextOnHighlight {
        tv-text-highlight-style: show-on-highlight;
      }
    </style>
  </head>
  
  <descriptiveAlertTemplate>
    <title>Title</title>
    <shelf>
      <section>
        <lockup>
          <img src="/resources/images/lockups/square_1.jpg" width="450" height="450" />
          <title class="showTextOnHighlight">Title 1</title>
        </lockup>
        
        <lockup>
          <img src="/resources/images/lockups/square_2.jpg" width="450" height="450" />
          <title class="showTextOnHighlight">Title 2</title>
        </lockup>
        
        <lockup>
          <img src="/resources/images/lockups/square_3.jpg" width="450" height="450" />
          <title class="showTextOnHighlight">Title 3</title>
        </lockup>
        
        <lockup>
          <img src="/resources/images/lockups/square_4.jpg" width="450" height="450" />
          <title class="showTextOnHighlight">Title 4</title>
        </lockup>
      </section>
    </shelf>
    
    <button>
      <text>Button 1</text>
    </button>
    
    <button>
      <text>Button 2</text>
    </button>
    
  </descriptiveAlertTemplate>
</document>
```

---

## Div Template {#div-template}

Note

Use this template when you can’t use another template to achieve the look you want.

This is a custom template type that provides the ability to create pages that don’t conform to a layout defined by another template. There's not much documentation available online, so you'll have to figure this one out as you go.

There is no built-in layout for contained elements. This template creates a view where the elements it contains are arranged using the `tv-align` and `tv-position` styles. Containing elements are centered by default.

![](https://community.rockrms.com/GetImage.ashx?Id=66411)

## Tips & Tricks

- Default theme: System preference
