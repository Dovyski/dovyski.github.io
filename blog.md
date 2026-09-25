---
layout: page
title: Blog
description: Selected writing on AI, software engineering, research tooling and open source, plus Fernando Bevilacqua's complete archive since 2009.
menu: true
---

<section class="selected-writing" aria-labelledby="selected-writing-title">
  <span class="eyebrow">Recommended reading</span>
  <h2 id="selected-writing-title">Start here</h2>
  <div class="writing-grid">
    <article><span>AI &amp; software engineering</span><h3><a href="/blog/2025/01/past-the-event-horizon-why-ai-replacing-developers-is-the-wrong-frame/">Past the Event Horizon</a></h3><p>What AI changes about developer work, and why verification cost matters.</p></article>
    <article><span>Research tooling</span><h3><a href="/blog/2016/11/writing-software-to-write-software/">Writing Software to Write Software</a></h3><p>Why I automated experiments and analysis during applied research.</p></article>
    <article><span>Open source &amp; design constraints</span><h3><a href="/blog/2016/06/cvui-a-very-simple-ui-lib-for-opencv/">cvui: A Very Simple UI Lib for OpenCV</a></h3><p>The problem that led to a UI library built with OpenCV drawing primitives.</p></article>
  </div>
</section>

<h2 class="full-archive-title">Complete archive <small>Since 2009</small></h2>
<div class="posts">
  {% for post in site.posts %}
  <article class="post archive-entry">
    <div class="archive-date"><time datetime="{{ post.date | date: '%Y-%m-%d' }}">{{ post.date | date: '%b %d, %Y' }}</time><span>{{ post.tags | first }}</span></div>
    <div class="archive-copy">
    <h2 class="post-title">
      <a href="{{ post.url }}">
        {{ post.title }}
      </a>
    </h2>

    {% assign excerpt_paragraphs = post.excerpt | split: '<p>' %}
    {% if excerpt_paragraphs.size > 1 %}
      <p>{{ excerpt_paragraphs[1] | split: '</p>' | first }}</p>
    {% else %}
      <p>{{ post.excerpt | strip_html | truncatewords: 75 }}</p>
    {% endif %}
    <a class="read-story" href="{{ post.url }}">Read the story <span aria-hidden="true">↗</span></a>
    </div>
  </article>
  {% endfor %}
</div>
