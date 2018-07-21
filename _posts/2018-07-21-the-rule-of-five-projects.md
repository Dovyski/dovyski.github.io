---
title: The rule of five projects
author: Fernando Bevilacqua
layout: post
categories:
  - blog
tags:
  - thoughts
  - planning

---

Side projects are a great way to learn new technologies, to exercise what you already know or to just challenge yourself a bit. Usually a side project is not connected to a contract or backed by financial support, so there is no real pressure to actually finish them. As a consequence, the landscape becomes something like the following very quickly (at least for me):

![Commitstrip about side projects](/public/img/posts/commitstrip-side-projects.jpg)
*[Source: Commitstip - side projects](http://www.commitstrip.com/en/2014/11/25/west-side-project-story/)*

This great strip by [Commitstip](http://www.commitstrip.com/) perfectly illustrates the life cycle of side projects. If you are like me, you have seen this scene way too many times: you have an idea, you start the project, things look and feel great. Then you pass the initial barrier where the creative work lives and you are left with non-creative, boring work to do. And sadly those tasks that remained are required to actually bring the project to life instead of creating yet another draft or handicapped prototype.

I got really sick of having ideas without implementation, or having half-baked and unfinished projects lying around. To end that problem once and for all, I came up with **the rule of five projects** (see below). It is very simple: use the energy and motivation of *starting* a new project as the fuel to actually *finishing* on-going ones. It's like following a contract, but you are the contractor and the contractee.

I've been using the rule of 5 projects and it indeed prevented the creation of new side projects. More impressively, it helped me ***ship*** old side projects that were dormant, e.g. [Codebot](https://codebot.cc). It blew my expectations!

## The rule of five projects

At any given time, you are allowed to have at most 5 (five!) side projects, which can be *under development* or *on-going*.

> Note: for obvious reasons, anything that is related to your regular job does not count towards those 5 slots, unless you get paid to do whatever you want.

### 1. Under development

A side project is said to be **under development** when it fulfills at _least one_ of the following:

#### 1.1 It is unable to deliver its core reason to exist (it is not a _MVP_ yet)

This rule is open to interpretation, but you can be honest with yourself here. For instance, if you are creating an image editing software, it should _minimally_ be able to open an image file, allow its pixels to be edited, then be able to save the result as a new (or existing) image. That simple, a true _minimum viable product_.

#### 1.2 It has not been publicly released

This rule might seem too much, but it is really required. It is the mental and public "acknowledgment seal" you need to move on.

The project must fulfill ***ALL*** of the following to be considered publicly released:

1. **Users can download/install/use the project without your help**. E.g. if it is compiled software, users should be able to download and run binaries.
> Note: your project must have enough documentation to allow people to actually use it. Nothing fancy is required, a README file is enough and will do the trick.
2. **Others can continue your work**. E.g. if the project is an open source lib/software, it *must* have a README describing how to install (itself and dependencies), run and test things.
> Note: no tacit knowledge about the project is allowed, e.g. something that only you know to make the project work, i.e. installing a specific a DLL file. Downloading the project source (and following its README) should be enough to put it up and allow further development.
3. **It must be announced in a channel (or channels).** E.g. tweet, blog post, project's own website.
> Note: the objective here is not to gather a lot of users for your project. The intent is to make the project visible in whatever channel(s) you have available.

* **Exception:** if the project is a contribution to an open-source project, rules 1.1 and 1.2 are not required. In such case, the project is said to deliver its core reason to exist and is publicly released when a pull request has been issued and accepted (or declined).

### 2. On-going

A side project is said to be **on-going** when it is not **under development** (according to the previously mentioned rules 1.1 and 1.2) and it is **being used** by someone (including yourself).
> Note: an on-going project might not be under development anymore, but it can still receive maintenance, i.e. bug fixes, or creative work, i.e. new features.

An on-going project only occupies one of the 5 working slots when it fulfills at _least one_ of the following:

1. **It received new features or bug fixes that were not released yet**. E.g. new version of the project.
> Note: releasing features/bug fixes for a on-going project is wrapping them up in a new release version, e.g. `v1.5.0`, and updating the project's CHANGELOG.
2. **It requires work to remain up and running for its users**. E.g. add new content to a movie app, moderate submissions in a news portal, etc.

* **Exception:** if the project is not related to software, then _project version_ can be seen as making content publicly available. Similarly new content can be seen as new features or bug fixes. If you have unpublished content, you have an on-going project occupying a working slot.

### 3. Possible adaptations

Working habits, especially for side projects, are very dependent on personal inclination and energy. For me, 5 working slots is great, but it could be too little/much for you.

Similarly making on-going projects occupy 1 working slot each might be too much. An on-going project could occupy half a working slot, for instance. It's up to you to find the right balance for everything.  
