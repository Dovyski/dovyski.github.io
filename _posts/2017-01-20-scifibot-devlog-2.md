---
title: Scifibot - Devlog 2
author: Fernando Bevilacqua
layout: post
categories:
  - blog
tags:
  - mobile
  - framework7
  - app
  - scifi
  - movies
  - series
  - android
---

This is the second update on <a href="{{ site.url }}{% post_url 2016-12-21-scifibot-devlog-1 %}">Scifibot</a>, my companion app for sci-fi fans. Things are finally starting to take shape, which is great and bad at the same time. It's great because the app is coming together and I can actually see it working. The bad part is that I reached the 90% development mark, which means I have only 10% of work to go. Right?

<img src="/public/img/posts/scifibot-devlog2-title-info.gif" title="Scifibot - improved title screen" style="float: right; margin: 7px 7px 7px 20px; width: 30%; height: auto;"/>

If you have experience shipping any software that targets real users, you know the last 10% of the development actually represents 90% of the project. That's the amazing development math, but it is true if you want to deliver a product with decent UX instead of a clunky pile of non-functional buttons. My last tasks regarding Scifibot have been almost exclusively focused on UX, like tweaking menus, adjusting buttons, creating visual feedbacks for actions, etc. It's a boring task to me, but it needs to be done.

<img src="/public/img/posts/scifibot-devlog2-settings.gif" title="Scifibot - settings screen" style="float: left; margin: 7px 20px 7px 7px; width: 30%; height: auto;"/>

I also added some love to the title screen (the one showing the details of a movie/series). It's now possible to see real ratings from IMDb, Metacritic and Rotten Tomatoes. I also decided to leave the reviewing of titles out of the app for now, because it will consume a significant amount of time to implement. I want this app out quickly, so it's time to start dealing with feature creep.

Under the hood I worked on the synchronization code, which is responsible for updating the app's database with new titles informed by the REST API. I designed both the API the and sync system to consume as little network resources as possible. The app will never ask the server about the full database, it will ask for modifications since a timestamp instead. It should prevent the download of already acquired info, cutting data transfer. I also implemented an "offline sync" procedure, which is used in case the app is updated via Google Play. Internally any new version of the app will be seen as new data to be sync'd, so I can actually update the catalog of titles using Google Play updates, if necessary.

<img src="/public/img/posts/scifibot-devlog2-notifications.gif" title="Scifibot - notifications" style="float: right; margin: 7px 7px 20px 7px; width: 30%; height: auto;"/>

Things got a bit complex after the sync system was in place, so I needed a way to trigger sync actions manually. I spent a few hours and created a settings screen. At the moment it has the bare minimum required for the app to run, like an option to enable/disable remote sync, allow device notifications, etc. I don't plan to add much more options to that screen, but it is there (and already working) if needed.

Last but not least, I worked on the notification system. It will be responsible for informing the user about new content, especially info regarding titles the user is tracking/following. The gif on the side has a demonstration of the notification system showing two new titles that were added to the catalog recently.

At the moment my focus has been on fixing bugs. There is a very nasty one regarding dynamic screens and navigation. I thought I was using [Framework7](https://framework7.io) in the wrong way, but it seems it is not my fault. It looks more and more like a bug on their side, but I will work around it. After this bug is fixed, I think the app reaches alpha status and I can start packaging and deploying it on real mobile devices. I'm looking forward to doing it!

<hr style="clear: both;"/>
