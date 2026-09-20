---
layout: page
title: Blog
menu: true
---

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
