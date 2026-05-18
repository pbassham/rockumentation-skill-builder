---
description: Use when a user needs instructions for installing and configuring Elasticsearch as a Windows service for Rock's universal search functionality
source: "https://community.rockrms.com/documentation/bookcontent/32/371"
sourceLabel: Universal Search
---
> **Path:** Universal Search > Installing Elasticsearch

Installing Elasticsearch

To install Elasticsearch you will need to follow the steps below. Detailed instructions for installing and running ElasticSearch can also be found on the [elastic.co](https://www.elastic.co/guide/en/elasticsearch/reference/current/zip-windows.html) website.

# Windows Service

If you want to install and run Elasticsearch as a service on Windows, follow the instructions found [here](https://www.elastic.co/guide/en/elasticsearch/reference/current/zip-windows.html#windows-service).

1. Download Elasticsearch for Windows from [https://www.elastic.co/downloads/past-releases/#elasticsearch](https://www.elastic.co/downloads/past-releases/#elasticsearch). At this point we are recommending you search for and install version 8.x and not other versions. The instructions here are for version 8.1.2 but can be applied to other 8.x versions.
2. Unzip the downloaded file into `C:\Program Files\`.
3. Open the Command Prompt as an administrator and change the directory to `C:\Program Files\elasticsearch-8.1.2` folder. Note that your elasticsearch folder name may be different depending on which version you've downloaded.
4. Switch to the `C:\Program Files\elasticsearch-8.1.2\bin` folder, then run `elasticsearch.bat`. For instance, the command line would be `C:\Program Files\elasticsearch-8.1.2\bin>elasticsearch.bat`. If you get a firewall warning, click "Allow access".
5. When the batch process is complete, the screen will show you a password under *Password for the elastic user* and a fingerprint code under *HTTP CA certificate SHA-256 fingerprint*. Make note of both the password and fingerprint because both will be needed in Rock.
6. In Rock, navigate to Admin Tools \> System Settings \> Universal Search Index Components and then click on the row for *Elasticsearch 8.x*.
7. You'll need to fill in each of the provided fields:
	1. **Node URL**: Use `https://localhost:9200/` for local installs
		2. **UserName**: Set this to "elastic"
		3. **Password**: This will be the password you collected in step 5 above
		4. **Certificate Fingerprint**: This will be the fingerprint provided in step 5 above

At this point you should have a running version of Elasticsearch. You can confirm this by entering `http://localhost:9200` into your browser. If prompted to log in, use the *UserName* and *Password* from the above steps.

You should then see something like the text below in your web browser.

{
  "name" : "Tarantula",
  "cluster\_name" : "elasticsearch",
  "cluster\_uuid" : "AAbbCCdd1AAbbCCdd-A",
  "version" : {
    "number" : "2.3.1",
    "build\_flavor" : "default",
    "build\_type" : "zip",
    "build\_hash" : "bd980929010aef404e7cb0843e61d0665269fc39",
    "build\_date" : "2016-04-04T12:25:05Z",
    "build\_snapshot" : false,
    "lucene\_version" : "5.5.0"
    "minimum\_wire\_compatibility\_version" : "7.17.0",
    "minimum\_index\_compatibility\_version" : "7.0.0"
  },
  "tagline" : "You Know, for Search"
}

With all of the above in place you can now configure entities for search using the instructions provided earlier in this guide.

# Elasticvue

Once you're done setting up Elasticsearch, you may want to consider installing *Elasticvue*. It's a nice administrative console for Elasticsearch which gives you some visibility into what's going on under the hood. It comes as a browser extension, which is easy to set up. To do this simply:

1. Visit [elasticvue.com](https://elasticvue.com) and scroll down to the "Get elasticvue" section.
2. Click the button for the browser you want to add the extension to and install the extension.
3. Access the extension in your browser. You'll need the *UserName* and *Password* from the steps in the prior section above. The "Uri" field should be populated, but if it's not set it to `http://localhost:9200`.
4. Click Test Connection and if all goes well click Connect.

# Multiple Environments

If you have an Elasticsearch server configured in different environments on separate VMs, you’ll need to make some changes after refreshing from one environment from the other. Generally, this applies when you’re refreshing a sandbox environment from a production environment.

The settings in Rock must be changed to point the refreshed environment to the correct Elasticsearch server.

To do this, go to Admin Tools \> System Settings \> Universal Search Index Components and click on Elasticsearch 8.x. Then, update the following fields according to your Elasticsearch setup:

1. Node URL
2. UserName
3. Password
4. Certificate Fingerprint ("SHA Certificate" in Elasticsearch)

Note that you may not need to update the UserName if they’re the same in both environments.

Your sandbox environment will not be able to reach your production Elasticsearch server until these updates are made. This can be confirmed by going to Admin Tools \> General Settings \> Universal Search Control Panel. If the node hasn’t been updated after a refresh, you’ll see a message indicating a connection to the Elasticsearch server cannot be made.

Table of Contents

- [Welcome](#welcome)
- [Overview](#overview)
- [Getting Started](#gettingstarted)
- [Specifics for Entities](#specificsforentities)
- [Customizing Results for Entities](#customizingresultsforentities)
- [Smart Search Integration](#smartsearchintegration)
- [Installing Elasticsearch](#installingelasticsearch)

Improve

<iframe id="modal-popup_iframe" scrolling="no"></iframe>

