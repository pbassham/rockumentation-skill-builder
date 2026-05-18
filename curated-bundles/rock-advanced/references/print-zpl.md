---
description: Use when you need to send ZPL commands to Zebra label printers or configure printer device IDs and IP addresses in Lava templates
source: "https://community.rockrms.com/Lava"
sourceLabel: Lava
---
> **Path:** Lava > Commands > Print ZPL

v19.0

The `printzpl` Lava command allows you to send ZPL (Zebra Programming Language) instructions directly to a Zebra label printer. This is helpful when you need to generate and print labels (such as name badges, check-in labels, or custom tags) from within a Lava template.

The command captures the ZPL content inside the block and sends it to the specified printer for immediate printing.

For example:

```
{% printzpl deviceid:'12' %}
^XA
^FO50,50
^A0N,40,40
^FDHello, World at {{'Now' | Date:'M/d/yyyy hh:mm:ss'}}!^FS

^FO50,120
^BY2
^BCN,80,Y,N,N
^FD1234567890^FS
^XZ
{% endprintzpl %}
```

When this Lava renders, the generated ZPL is sent to the specified printer and the label is printed.

  
![PrintZpl example print output](https://community.rockrms.com/Content/LavaDocs/PrintZpl_example.png)

## How It Works

The `printzpl` command does not render visible output to the page. Instead, it processes the enclosed ZPL markup and sends the final result to the selected printer. Lava merge fields can be used inside the ZPL to dynamically insert values.

**Warning:** The ZPL content is sent directly to the printer as provided. Invalid or malformed ZPL may result in unexpected label output or printer errors.

# Parameters

Below is a complete list of the parameters that are available to the command.

**Quick Links:**

- [deviceid](#deviceid)
- [ipaddress](#ipaddress)

## DeviceId

The Id, IdKey, or Guid of a configured Device in Rock that represents a Zebra printer.

- **Required:** No (required if `ipaddress` is not provided)
- **Example:** `deviceid:'12'`

## IpAddress

The IP address of the Zebra printer. You may optionally include a port number.

- **Required:** No (required if `deviceid` is not provided)
- **Example:** `ipaddress:'192.168.1.145'`
- **Example with Port:** `ipaddress:'192.168.1.145:9100'`

You must provide either `deviceid` or `ipaddress`. If both are provided, the `deviceid` will be used.

## Example Using IP Address

```
{% printzpl ipaddress:'192.168.1.145:9100' %}
^XA
^FO50,50
^A0N,40,40
^FDHello {{ CurrentPerson.NickName }}!^FS
^XZ
{% endprintzpl %}
```


---

## Observe {#observe}

> **Path:** Lava > Commands > Observe

v16.3

This command will wrap it's contained Lava into an observability activity to provide detailed timings of it's performance as well as to group any database calls that are being made.

## Usage

The `observe` creates a new observability activity to benchmark it's contained Lava.

```
{% observe name:'Family List' rsc-feature:'family-list' rsc-feature-version:'2' %}

    {% person where:'LastName == "Decker"' %}
        {% for person in personItems %}
            {{ person.FullName }}
        {% endfor %}
    {% endperson %}

{% endobserve %}
```

In the example above a new observability activity is created with the name 'Family List'. Two tags are also added to the activity `rsc-feature` and `rsc-feature-version`.

The only required parameter is `name`. All other parameters are considered to be tags to add to the activity. It's recommended that these tags start with an organization prefix (rsc = Rock Solid Church). Be sure to escape your tag's values if you think they will contain characters like a single quote that could break the formatting of the Lava command.

