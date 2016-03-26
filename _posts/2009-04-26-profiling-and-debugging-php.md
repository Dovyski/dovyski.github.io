---
id: 83
title: Profiling and debugging PHP
date: 2009-04-26T01:59:19+00:00
author: Dovyski
layout: post
guid: http://www.dovyski.com/?p=83
permalink: /2009/04/profiling-and-debugging-php/
wpo_campaignid:
  - 1
wpo_feedid:
  - 1
wpo_sourcepermalink:
  - http://feedproxy.google.com/~r/Webappers/~3/dLJftq-RKr0/
dsq_thread_id:
  - 411811860
categories:
  - Web development
tags:
  - debug
  - php
  - profiling
  - web
---
<small><strong></strong></small>

Reviewing the code is an important task every programmer must (or should) perform. Sometimes the program you have just coded looks nice and fast, because all the tests you have performed using your well-controlled devel0pment sandbox showed no errors.

Unless you are a god when programming, you may have left some little performance tweaks behind. Most of the time you can replace several method calls with the returned value stored in a variable, or avoiding nested for/whiles, or freeing a result set in order to save some memory, etc. In the end, all those tweaks can make the difference between a smooth user experience and an extremely painful development problem.

If you are a PHP developer, you can use the free [PHP Quick Profiler (PQP)](http://particletree.com/features/php-quick-profiler/ "PHP Quick Profiler") to help profiling and debugging your code. No more echoing vars, objects or queries in order to find performance mistakes. Using an automated tool to show you what is going on, you can save a lot of time and ensure your app is stable and fast. I read about PQP at <a href="http://www.webappers.com/2009/04/25/php-quick-profiler-firebug-for-php/" target="_blank">WebAppers</a> these days. They also have a screenshot (below) and a <a href="http://particletree.com/examples/pqp/" target="_blank">link for a demo</a>.

[<img class="aligncenter" src="http://www.webappers.com/img/2009/04/php-profiler.jpg" alt="PHP Profiler" />](http://particletree.com/features/php-quick-profiler/ "PHP Quick Profiler")

If you want more options for profiling and debugging, I recommend <a href="http://www.xdebug.org/" target="_blank">Xdebug</a>, which is a very powerful tool. We have been using it at <a href="http://www.decadium.com" target="_blank">Decadium</a> for a long time.  Some of the features include stack traces and function traces in error messages (with full parameter display, function/file name and line indications), information about memory allocation and protection for infinite recursions.

Xdebug is also free and has support for Windows and Linux.