---
description: Use when addressing concerns or objections about adopting Rock RMS as a content management system
source: "https://community.rockrms.com/documentation/bookcontent/14/370"
sourceLabel: Designing and Building Websites Using Rock
---
> **Path:** Designing and Building Websites Using Rock

This skill catalogs the chapters of *Designing and Building Websites Using Rock* from the Rock RMS documentation.

Each chapter below is available as a separate reference file. Load only the chapters relevant to the task at hand.


---

## Welcome {#welcome}

> **Path:** Designing and Building Websites Using Rock > Welcome

Welcome

Rock RMS was conceived and built by web designers and programmers just like you. We understand that you might be a little hesitant about using Rock as your Content Management System (CMS). In fact, many of you are probably thinking that you won't use Rock as a CMS at all. Instead, you're considering integrating it to your current CMS using our REST API. We don't blame you. We thought the same thing years ago when we developed our first relationship management system. But we were wrong. Hopefully, you'll read this entire guide. If you do, we think you'll see the light too. But let's be honest right up front and address some of your top concerns.

# Your Top Five Concerns with Using Rock as a CMS

1. **Rock will never have all the features of my current CMS.**  
	Yep, you're right. We'll never be able to have every feature that your current CMS has. Although, they probably don't have every feature we have either. Rock makes creating powerful websites easy. We’ve ~~stolen~~ borrowed the best ideas from the top CMS out there. We've leveraged our years of experience building sites to create tools we’ve always wanted.
2. **We'll never be able to find someone who knows Rock; everyone knows xxxxx.**  
	We're working hard to establish an ecosystem full of vendors and freelancers who can help you. Not only that, but documentation like this manual makes it simple to quickly bring any web designer vendor up to speed. You should probably hesitate to use any vendor who resists using the tool the customer wants and instead uses their favorite tool. Remember, you're the one who needs to live with the site.
3. **Rock is built on Microsoft .Net. Come on, no serious CMS uses that.**  
	While there are several popular .Net CMS systems (Umbraco, DotNetNuke, Orchard) that really isn't the point. When looking for a CMS, you need powerful features with blazingly fast performance that can scale. Rock excels at each of these. Think about it this way: Should the builder be judged by the tools he brings to the worksite or the building that stands when he's finished? That's not to say we're not proud of our tools. We LOVE .Net and we think you will too once you try it on.
4. **There are a limited number of .Net webhosts to run Rock on and the ones that do exist are more expensive.**  
	True, there are fewer than our PHP/MySql cousins, but there are numerous vendors to pick from. As far as price, .Net hosting on average costs about 20% more than Linux hosting. On the lower end this translates into $2-$3 dollars a month. The return on investment with using Rock as your CMS will far outweigh this small difference.
5. **But I’m a PHP developer; I don’t know .Net.**  
	That's just a part of the job. Constant change is the career you’ve chosen. Technologies like LESS, jQuery and Bootstrap didn't exist just a few years ago. To not change is to become extinct. Don't see yourself as a .Net Developer, instead look at yourself as just a developer who today uses .Net. If you're a developer, you'll have no trouble with .Net. It's an elegant and well-designed language.

# But What Are the Benefits?

Hopefully you're starting to see that some of the barriers aren't as large as they may appear. But there's no reason to change for change's sake; the benefits must outweigh the cost. Reading through this manual will show you numerous ways to exploit the power of Rock's CMS features. But let’s touch on one simple example. The biggest "killer app" of Rock is personalization. Just picture adding the markup below into your baptism page using Rock's on-page HTML editor (You’re going to love the editor!):

{% if Person %} 
    {% if Person.BaptismDate != '' %}
        {{ Person.NickName }}, remember the joy of your baptism? Share that joy
        with a friend who hasn't yet taken the plunge at one of our upcoming
        baptism events!
    {% else %}
        {{ Person.NickName }}, now is the time! Don't put off baptism any longer,
        take the plunge at one of our upcoming events!
    {% endif %}
{% else %}
    Take the plunge at one of our upcoming baptism events!
{% endif %}

Rock uses an upcoming templating engine called [Lava](https://community.rockrms.com/Lava). Paired with Rock data, Lava is very powerful. The markup above does this:

- If the person is logged in and has been baptized it shows the message: "Alisha, remember the joy of your baptism? Share that joy with a friend who hasn't yet taken the plunge at one of our upcoming baptism events!"
- If the person hasn't been baptized yet they'll see: "Alisha, now is the time! Don't put off baptism any longer, take the plunge at one of our upcoming events!"
- Otherwise, if the person isn't logged in, the greeting reads: "Take the plunge at one of our upcoming baptism events!"

Armed with just a little knowledge of Lava, we've created a very personal experience on our site; one that is much more likely to draw people in and promote action. Are you starting to see the power of Rock? And we're just getting started.

