---
id: 2403
title: 'Mrdoob stats &#8211; Actionscript performance monitor'
date: 2010-03-05T00:14:16+00:00
author: Dovyski
layout: post
guid: http://www.dovyski.com/?p=2403
permalink: /2010/03/mrdoob-stats-actionscript-performance-monitor/
dsq_thread_id:
  - 337561095
categories:
  - Flash
tags:
  - as3
  - profiling
---
Create and develop a game is hard task, but optimize one is even harder. You can ruin a perfect game design and a beautiful artset by filling the source code with useless and/or unnecessary stuff. In order to keep things in control a performance monitor comes in handy.

[<img class="aligncenter size-full wp-image-2404" title="Anatoly Zenkov - Portrait of Mr. Doob" src="http://www.dovyski.com/wp-content/uploads/2010/02/Anatoly-Zenkov-Portrait-of-Mr.-Doob.jpg" alt="" width="180" height="240" />](http://www.dovyski.com/wp-content/uploads/2010/02/Anatoly-Zenkov-Portrait-of-Mr.-Doob.jpg)

[Mrdoob stats](http://code.google.com/p/mrdoob/) provides a simple info box that will help you monitor your code performance. It can tell you the following:

  * **FPS** Frames per second, how many frames were rendered in 1 second. The higher the number, the better.
  * **MS** Milliseconds needed to render a frame. The lower number, the better.
  * **MEM** Memory your code is using, if it increases per frame is VERY wrong.
  * **MAX** Maximum memory the application reached.

It is another great tool to know what is happing under the hood.