---
description: "Use when configuring image file types in Rock, setting dimensions and transformations, or optimizing image performance with GetImage.ashx parameters"
source: "https://community.rockrms.com/documentation/bookcontent/14/370"
sourceLabel: Designing and Building Websites Using Rock
---
> **Path:** Designing and Building Websites Using Rock > Working With Images

Working With Images

Rock provides several ways to store and display images. Picking the right solution for your requirements is important. The two most common ways to store images are discussed below.

- **Image File Type** - This was the only way to store photos originally. It's still often the best way if you need to secure images so that only certain people can view them (cough check images) or if you want to provide dynamic transformations on the images. We discuss image file types in more detail below.
- **Image Assets** - You can also use Rock's Asset Manager to upload images. This is the preferred way to manage images for your website. This option doesn't allow for security, but it is MUCH faster than the image file type in most cases. Since most images for your website don't need security, this is the best option.

# Image File Type

Serving your image files with the right dimensions is the simplest way to improve your website performance. It means less load on your site and faster images for your users. And with Rock, it couldn't be easier!

We think you’ll find the information below helpful and straightforward on how to use these tools for your best benefit. Oh, and if you are anything like us you might even find yourself having a little too much fun with your content. So, we will spare you and only go over the primary and most useful commands, knowing that this is a powerful tool where the sky is the limit.

Before anything – you have to set up an image attribute on your content channel or whatever it is you are standardizing such as page attributes.

Alright let's look at an example. Let's say you have a content channel with an item attribute named "Public Photo." Normally in your Lava you would add that image to your mark up like this:  
`GetImage.ashx?Guid={{ detailImageGuid }}`

Here we see the original photo without any resizing.

![No Size Set](https://rockrms.blob.core.windows.net/documentation/Books/14/1.17.0/images/no-size-set-image.png)

Original File Size

Let's make this image smaller. `GetImage.ashx?Guid={{ detailImageGuid }}&w=468&h=232`

![Size Set](https://rockrms.blob.core.windows.net/documentation/Books/14/1.17.0/images/image-size-small-set.png)

Small size set

Those are super basic. Let’s add some extra commands. Say we always want the images to be a certain aspect ratio and if the image uploaded doesn’t meet that size, then a black border will fill in the rest of the area and the image will align to the top center. Our command would then look something like this:  
`GetImage.ashx?Guid={{ detailImageGuid }}&w=768&h=432&mode=pad&bgcolor=black&anchor=topcenter&quality=100`

![Extra](https://rockrms.blob.core.windows.net/documentation/Books/14/1.17.0/images/larger-size-with-extra.png)

Large Size Set With Extra Settings

That’s just a glimpse of how you can use these tools to standardize your content.

# Commands

**Width and Height**

- `&w=` sets the width of the image in pixels.
- `&h=` sets the height of the image in pixels.

If only the width and height is set, then the aspect ratio of the image is maintained and defaults to the width size.

**Modes**  
`&mode=`

- `max`  
	Resizes the image to fit within the width and height boundaries without cropping or distorting the image. The resulting image will match one of the constraining dimensions, while the other size is altered to maintain the same aspect ratio of the input image.
  
- `pad`  
	Resizes the image to fit within the width and height dimensions without cropping or distorting the image and fills the remaining space with a solid color. Use the bgcolor command to set the color to fill the space.
  
- `stretch`  
	Stretches the images to the W and H parameters regardless of the actual size of the image.

**Background Color**  
`&bgcolor=`  
Named colors and hex values are supported.

**Alignment**  
`&anchor=`  
The alignment parameter allows you to specify the starting location within the size parameters. Valid values are:  
`topleft`  
`topcenter`  
`topright`  
`middleleft`  
`middlecenter`  
`middleright`  
`bottomleft`  
`bottomcenter`  
`bottomright`

**Crop**  
`&crop=`  
Resizes the image to fill the width and height dimensions and crops any excess image data. The resulting image will match the width and height constraints without distorting the image. Cropping is used by coordinates, x1, y1, x2, y2.

**Disable Optimizations**  
`&disableoptimizations=true`  
Allows disabling resizing by adding disableoptimizations=true to the query string. This allows a CDN or image optimization service to do the resizing. Without this, the query string parameters for resizing will often conflict causing both Rock and the CDN to resize and optimize the file.

## Compression and Performance

Compression helps remove unnecessary data from your images, while providing the control you need for high quality at small sizes.

- `format`  
	The output format to convert the image to. Valid options are `jpg`, `png`, `gif`.
  
- `quality`  
	Controls the output quality. Valid values are in the range of `0-100`, and the default is `90`. Quality can often be set much lower than the default, especially when serving high-DPR images.

# More Info

For a list of even more image resizing options, checkout this website: [ImageResizer](https://imageresizing.net/docs/v4/docs/basics).

