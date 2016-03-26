---
id: 2332
title: AS3 game engines
date: 2010-01-30T09:10:08+00:00
author: Dovyski
layout: post
guid: http://www.dovyski.com/?p=2332
permalink: /2010/01/as3-game-engines/
dsq_thread_id:
  - 338492240
categories:
  - Flash
tags:
  - as3
  - engines
  - Flash
  - games
---
I like to write my code from scratch, but it does not  mean I want to reinvent the wheel every single day. This is one of the reasons why I like to use engines to code games.

Sometimes the project has it´s own specific features and it requires a completly customized code, but most of the time it´s all about the same things: test input, check collisions, update a bunch of elements and finally render them all. Looking for a tool to do those tasks for me, I found two free and open source game engines: <a title="PushButton Engine" href="http://pushbuttonengine.com/" target="_blank">PushButton </a>and <a title="Flixel engine" href="http://flixel.org/" target="_blank">Flixel</a>.

<p style="text-align: left;">
  <a title="PushButton Engine" href="http://pushbuttonengine.com/" target="_blank"><img class="size-medium wp-image-2336 aligncenter" src="http://www.dovyski.com/wp-content/uploads/2010/01/pushbutton-engine-300x79.png" alt="" width="300" height="79" srcset="http://www.dovyski.com/wp-content/uploads/2010/01/pushbutton-engine-300x79.png 300w, http://www.dovyski.com/wp-content/uploads/2010/01/pushbutton-engine.png 343w" sizes="(max-width: 300px) 100vw, 300px" /></a>
</p>

<p style="text-align: left;">
  <a title="PushButton Engine" href="http://pushbuttonengine.com/" target="_blank">PushButton</a> is a very modular game engine licensed under the <a title="MIT license" href="http://en.wikipedia.org/wiki/MIT_License" target="_blank">MIT license</a>. It has core functionality as resource manager, logger, debug monitoring, serialization, time management, globally named objects, etc. It also has a set of <a title="PushButton components" href="http://pushbuttonengine.com/store/" target="_blank">components </a>that make the engine even better:
</p>

  * Physics based on <a title="Box2D" href="http://www.box2d.org/" target="_blank">Box2D</a>;
  * Gameplay components: health, teams, state machines;
  * Sprite-based and SWF-based 2D rendering;
  * Tilemap system;
  * Pathfinding library;
  * Basic networking. Pass events to/from your servers, do XMLRPC/JSON Web API requests, etc;
  * Awesome UI capabilities via Flash &#8211; localizable, stylable/themable, internationalizable.

<a title="Flixel engine" href="http://flixel.org/" target="_blank"><img class="size-full wp-image-2335 alignright" src="http://www.dovyski.com/wp-content/uploads/2010/01/flixel.png" alt="" width="64" height="128" />Flixel</a> is collection of AS3 files that helps organize, automate, and optimize Flash games. It is also licensed under the <a title="MIT license" href="http://en.wikipedia.org/wiki/MIT_License" target="_blank">MIT license</a> and has a great set of features:

  * Really fast renderer (5000+ sprites on modern PCs);
  * Tilemaps;
  * Particle systems;
  * Global sound system with volume hotkeys, looping, panning, etc;
  * Parallax scrolling (free/multi-directional);
  * Built-in 2D box-based game physics (not <a title="Box2D" href="http://www.box2d.org/" target="_blank">Box2D</a>);
  * Fast text rendering;
  * Retro style zoomed rendering options (2x pixels, 3x pixels, etc);
  * Works great with non-pixel art too, with support for rotation, scaling;
  * Composite multiple sprites using blending modes to create sweet lighting effects;
  * Does not require the Flash IDE, works best with free tools like FlashDevelop;
  * Organizational classes like game states;
  * Simple buttons;
  * Utilities for looping music and playing sound FX;
  * Simple special effects like screen flashes and fades;
  * Save game data between sessions using a local shared object.

Reading about them gave me the idea of writing my <a title="Dovyski's projects" href="http://dovyski.com/projects" target="_blank">own game engine</a> someday. Maybe some raining day I give it a try <img src="http://www.dovyski.com/wp-includes/images/smilies/simple-smile.png" alt=":)" class="wp-smiley" style="height: 1em; max-height: 1em;" />

<div style="overflow: hidden; width: 1px; height: 1px;">
  • Really fast renderer (5000+ sprites on modern PCs)<br /> • Tilemaps<br /> • Particle systems<br /> • Global sound system with volume hotkeys, looping, panning, etc<br /> • Parallax scrolling (free/multi-directional)<br /> • Built-in 2D box-based game physics (<em>not</em> Box2D…yet, anyways)<br /> • Fast text rendering<br /> • Retro style zoomed rendering options (2x pixels, 3x pixels, etc)<br /> • Works great with non-pixel art too, with support for rotation, scaling<br /> • Composite multiple sprites using blending modes to create sweet lighting effects<br /> • Does not require the Flash <span class="caps">IDE</span>, works best with free tools like FlashDevelop<br /> • Organizational classes like game states<br /> • Simple buttons<br /> • Utilities for looping music and playing sound FX<br /> • Simple special effects like screen flashes and fades<br /> • Save game data between sessions using a local shared object
</div>