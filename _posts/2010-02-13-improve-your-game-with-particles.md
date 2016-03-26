---
id: 2362
title: Improve your game with particles
date: 2010-02-13T06:08:37+00:00
author: Dovyski
layout: post
guid: http://www.dovyski.com/?p=2362
permalink: /2010/02/improve-your-game-with-particles/
dsq_thread_id:
  - 337275268
categories:
  - Flash
  - Tools
tags:
  - actionscript
  - as3
  - effects
  - games
  - particles
---
When I play a game, I like to see all those flying particles popping up on the screen. Casual games make heavy use of this resource, sometimes more than what is considered healthy.

[<img class="aligncenter size-full wp-image-2364" src="http://www.dovyski.com/wp-content/uploads/2010/01/sparkler.jpg" alt="" width="150" height="150" />](http://www.dovyski.com/wp-content/uploads/2010/01/sparkler.jpg)

A particle system adds dynamism to the game and makes it feel alive. Where is the fun of blowing up an enemy base and see just a few flames as a reward? Players want to see lots of things flying around and sparkles shinning towards the camera. Flash gamers are no exception. In order to add particles to your game, you can use two free particle systems (both use <a href="http://www.opensource.org/licenses/mit-license.php" target="_blank">MIT license</a>): <a href="http://flintparticles.org" target="_blank">Flint</a> and <a href="http://code.google.com/p/stardust-particle-engine/" target="_blank">Stardust</a>.

<a href="http://flintparticles.org" target="_blank">Flint</a> is an open-source project to create a versatile particle system in Actionscript 3. The aim is to create a system that handles the common functionality for all particle systems, has methods for common particle behaviour, and lets developers extend it easily with their own custom behaviours without needing to touch the core code.

<a href="http://code.google.com/p/stardust-particle-engine/" target="_blank">Stardust</a> was inspired by <a href="http://flintparticles.org" target="_blank">Flint</a>, but it has its own set features:

<div>
  <ul>
    <li>
      Supports 2D and 3D particle effects.
    </li>
    <li>
      Easy to extend for custom initializers, actions, fields, deflectors, clocks, and 2D/3D renderers.
    </li>
    <li>
      Includes 3D extensions for ZedBox, Papervision3D, and ND3D.
    </li>
    <li>
      Includes a native 3D renderer.
    </li>
    <li>
      Supports particle masking (particles can be masked out for actions).
    </li>
    <li>
      Uses linked lists and object pools to improve performance.
    </li>
    <li>
      Gravity and deflector simulation.
    </li>
    <li>
      Action triggers (for creating complex conditional particle behaviors).
    </li>
    <li>
      XML serialization.
    </li>
  </ul>
</div>