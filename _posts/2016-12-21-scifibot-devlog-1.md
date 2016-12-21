---
title: Scifibot - Devlog 1
author: Fernando Bevilacqua
layout: post
categories:
  - Code
tags:
  - mobile
  - framework7
  - app
  - scifi
  - movies
  - series
  - android
---

I love scifi movies and series. There are plently of good (and not so good) titles out there to be seen, but it is really hard to find them or keep track of interesting things. If you are like me, you probably had spent a significant amount of your time 1) finding things and 2) making notes or equivalents to remember what to watch.

I would like to see a list of *every* scifi movie or series available with a clear indication if I had or not watched it yet. I want to see a cool movie/series and add it to a list I can come back to later. More importantly, *I want to be informed about the titles I am interested on*, e.g. receive a notification when an upcoming movie hits the theaters.

Filled with frustration of my current workflow to find/track things and inspired by the bright future described above, I decided to work on a mobile app. Its codenamed *Scifibot*. I have managed to work on it during the weekends and sometimes during the weeks at night.

This post is a dev log regarding my progress so far. I wanted to quickly finish this project, so I decided to stick with web technologies (HTML5/CSS/JS) on top of a runtime (e.g. Phonegap or similar). After spending some time reading about and testing a few mobile frameworks, I decided to go with [Framework7](https://framework7.io). I had never heard of that before, but it is a full featured HTML framework for building iOS & Android apps. It is simple, efficient, elegant and easy to grasp.

After my first coding session (about 2 hours), I was able to put together a very simple app fully implemented on top of Google Material Design, which is a must for Android. That was impressive. I had used [jQuery mobile](https://jquerymobile.com/) in the past, but my progression at the time was not that good.

My development focus has been on creating the basic structure of the app, creating the screens and the flow among them. Here is an screenshot of the current state:

![Scifibot - list of available movies](/public/img/posts/scifibot_devlog1.png)

I had a few quirks regarding some aspects, such as the navigation bar and its buttons. It is probably because I am doing something wrong, but I will deal with that later. The plan is to move fast and reach a MVP, then iterate from that. As any good side project, feature creep has already took over, but I moved several of the non-essential features to the "Cool to have in the future" pile. The project should be safe for now :D

I want a functional app, so it should be *fast* and self-contained. As a consequence, no login will be required and no internet connection too. However, if the user wants to backup any saved things or make reviews, for instance, authentication will be required.

Here is a gif showing a bit of the app (it is alpha state and totally incomplete):

![Scifibot - usage demonstration](/public/img/posts/scifibot-devlog1-compressed.gif)

If you like scifi, stay tuned for my progress. This app will be available on Google Play in the near future, specially because I am tired of keeping track of movies/series to watch in an archaic way.
