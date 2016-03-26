---
id: 2409
title: 'BulkLoader &#8211; managing multiple loadings in AS3'
date: 2010-03-09T07:02:28+00:00
author: Dovyski
layout: post
guid: http://www.dovyski.com/?p=2409
permalink: /2010/03/bulkloader-managing-multiple-loadings-in-as3/
dsq_thread_id:
  - 336570515
dsq_needs_sync:
  - 1
categories:
  - Flash
tags:
  - as3
  - Flash
  - games
  - MIT
  - web
---
One of the most common tasks in game development is the assets loading process. You have two options: 1) ship your game as a single 45Mb SWF file filled with sweet and compressed-to-the-bones images/sounds or 2) load all those assets separately and on demand.[<img class="aligncenter size-thumbnail wp-image-2410" title="nggshow.php" src="http://www.dovyski.com/wp-content/uploads/2010/02/nggshow.php_-150x150.png" alt="" width="150" height="150" srcset="http://www.dovyski.com/wp-content/uploads/2010/02/nggshow.php_-150x150.png 150w, http://www.dovyski.com/wp-content/uploads/2010/02/nggshow.php_.png 280w" sizes="(max-width: 150px) 100vw, 150px" />](http://www.dovyski.com/wp-content/uploads/2010/02/nggshow.php_.png)

Sometimes the first option is your best shot, but for casual online games the second one is more suitable. Multiple loadings in AS3 can be a pain, because there are several file types to load (wave, JPG, mp3, GIF, swf, etc) and there is no single way to load them all.

So far my best approach to solve this problem is called [BulkLoader](http://code.google.com/p/bulk-loader/), a library for managing multiple loadings with AS3. It is licensed under the <a rel="nofollow" href="http://www.opensource.org/licenses/mit-license.php">MIT License</a> and has amazing features:

  * Connection pooling.
  * Unified interface for different loading types.
  * Unified progress notification.
  * Events for individual items and as groups.
  * Priority
  * Stop and resuming individually as well as in bulk.
  * Cache management.
  * Statistics about loading (latency, speed, average speed).
  * Various kinds on progress indication: ratio (items loaded / items to load), bytes , and weighted percentage.
  * Configurable number of retries.
  * Configurable logging.
  * Various assest types (XML, NetStreams, Swfs, Images, Sound, Text Files)

Design goals:

  * Minimal imports.
  * Few method to learn.
  * Consistent interface, regardless of content type.

BulkLoader gracefully handles progress notification in these use cases:

  * Few connections to open: bytes total can be used instantly.
  * Many connections opened: progress by ratio
  * Many connections opened for data of widely varying sizes: progress by weight.

One of the things I like the most is that this project was created by a Brazilian fellow named <a href="http://www.stimuli.com.br/about/" target="_blank">Arthur Debert</a> :). Thanks for this great tool!