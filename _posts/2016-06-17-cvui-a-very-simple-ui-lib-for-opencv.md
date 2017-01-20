---
id: 2897
title: cvui - A very simple UI lib for OpenCV
author: Fernando Bevilacqua
layout: post
categories:
  - blog
tags:
  - opencv
  - ui
  - gui
---

I have been working a lot with [OpenCV](http://opencv.org/) and C++ lately. After spending a great amount of time waiting for things to compile (so I could see my changes), I decided to improve my workflow. I decided to make changes in runtime, so I could tweak things without the need to recompile the whole project.

I immediately faced a problem: how to quickly and easily create GUI with OpenCV. The OpenCV lib has complete support for [Qt](https://wiki.qt.io/OpenCV_with_Qt) (which is great for UI creation), but you need to compile OpenCV with such Qt support. If you don't like that (or you have OpenCV compiled without Qt), you can enable OpenGL and use any of the awesome GUI out there, e.g. [imgui](https://github.com/ocornut/imgui). If you decide for that, you add the OpenGL dependency to your (probably already complex) project.

I didn't have Qt available and I didn't want to use OpenGL, so I distilled [cvui](https://github.com/Dovyski/cvui). cvui is a (very) simple UI lib built on top of OpenCV drawing primitives. All the rendering is made using OpenCV, by calling `cv::rectangle()`, for instance. Here is a picture of it working:

![cvui](/public/img/cvui.png)      

The API is heavily inspired by [imgui](https://github.com/ocornut/imgui). The calls are all C-like, so no classes, objects nor OOP. I have nothing against that, I just wanted an extremely simple way of creating UI for my application (one line written, one thing on the screen).

At the moment, the API includes a small set of components: button, checkbox, window and counter. I will probably add more components in the near future. For more information, visit the [cvui repository on Github](https://github.com/Dovyski/cvui). The code is MIT licensed.
