---
description: Use when a user needs to search for a person in the Rock database by name or phone number using the Smart Search tool
source: "https://community.rockrms.com/documentation/bookcontent/5/360"
sourceLabel: "Person & Family Field Guide"
---
> **Path:** Person & Family Field Guide > Searching

# Searching By Name

To find someone in the database, start by using the *Smart Search* tool found at the top of every page. This tool can be used to search several different types of data, but it defaults to searching for individuals by name.

![Smart Search Tool](https://rockrms.blob.core.windows.net/documentation/Books/5/1.18.0/images/smart-search-v18.png)

Smart Search Tool

When searching by name, it's important to know some tricks to improve the quality of your search and to save time. Keep in mind that you don't need to type a person's full name to search. You can type fragments of the name. Say, for instance, we're looking for Ted Decker. Here are several suggested ways we can search for him:

t decker  
te dec  
decker  

Notice that none of these suggestions included "Ted Decker." That would be a waste of key presses. (Useless fact: the average key on a keyboard has a life cycle of only five million presses.) Because you make fewer spelling mistakes if you press fewer keys, it's always a good idea to shorten searches.

Also, notice in our samples above that we never searched for just "Ted." If you provide only one name, Rock assumes you're searching by last name.

# But I'd Like to Search by Only First Name...

If searching by only the first name works for your organization, no problem. We have you covered. To enable searching both first and last names when only one term is provided go to:  
Admin Tools \> Settings \> System \> Search Services \> Person Name and set *Allow Search by Only First Name* to "Yes".

Once you submit your search, you'll see one of two possible screens. If only one person matches your search, you'll be taken straight to the *Person Profile* page for that person. However, if more than one person is returned, you'll see a list of individuals. Select the correct one, and you'll be taken to their *Person Profile* page.

![Search Results For Decker Family](https://rockrms.blob.core.windows.net/documentation/Books/5/1.18.0/images/search-results-v18.png)

Search Results for 'Decker'

Rock has a sophisticated algorithm that helps you find names even if you can't spel theem corectlly. You may often see other possible matches at the top of your search results.

![Recommended Results](https://rockrms.blob.core.windows.net/documentation/Books/5/1.18.0/images/search-looking-for-v18.png)

Other Recommended Results

# Searching by Phone

While not as common as searching by name, sometimes you may want to search for a person using a phone number. The *Smart Search* tool can also search by phone. Simply select the *Phone* option and type in the number.

Just like searching by name, you don't need to enter the full phone number to get results. You can enter any part of the phone number. (This is great for people who leave voicemails with rushed return numbers). If you were searching for the person with the phone number (623) 555-3322 (Ted Decker in our sample database), you could use any of the searches below to find him:

(623) 555-33  
62355533  
3322  
555 3322

# Note

The phone search will strip out any characters that aren't numbers before running the search.

# Searching by Email

Yep, you guessed it: Rock can search by email using the *Smart Search* tool, too. Partial searches are supported. We're sure you've got it by now, so we won't repeat the search details here.

# Searching by Address

The address search is also similar to the other search types. Keep in mind, though, that it only operates on the street address portion (first line) of the address. Sample searches for Ted Decker would be:

11624 N 31st Dr  
11624  
31st Dr

# Searching by Birthdate

You can also search for a person by birthdate. For this option to be available, it must first be enabled and configured in Admin Tools \> Settings \> System \> Search Services.

# Searching by Group Name

Much like searching by name, you can also search by Group Name using the *Smart Search* tool. You can type a specific name to locate a particular group (e.g., "Alisha Marble's Small Group"), or use a general term, such as "student", to display a list of all groups with that term in the name.

# Searching by Business

You can search by business name using the *Smart Search* tool as well. Partial searches are supported.

# Universal Search

The *Smart Search* capability in Rock is quite powerful, but sometimes you may need more. That's where *Universal Search* comes in. *Universal Search* allows you to search multiple types of data at once in a full-text manner. In a sense, it's like Google for Rock. To learn the ins and outs of Universal Search, check out the [Universal Search](https://community.rockrms.com/documentation/bookcontent/32/) guide.

# I Still Haven't Found What I'm Looking For

The *Smart Search* and *Universal Search* features should meet your needs in almost every case. If you need to search with even finer detail, you can write a quick *Data View* to find the person. See the [Taking Off With Reporting](https://community.rockrms.com/documentation/bookcontent/6#filteringusingdataviews) guide to learn more.

