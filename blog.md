---
layout: page
title: Blog
menu: true
---

A bit of everything here. Technical posts and some food for thoughts.

---

<div class="posts">
  {% for post in site.posts %}
  <div class="post">
    <h1 class="post-title">
      <a href="{{ post.url }}">
        {{ post.title }}
      </a>
    </h1>

    <span class="post-meta">
      <i class="fas fa-calendar-alt"></i> {{ post.date | date: "%Y-%m-%d" }}
      <i class="fas fa-user-circle"></i> {{ post.author }}
      <i class="fas fa-tags"></i> {{ post.tags | join: "," }}
    </span>

    {% assign excerpt_paragraphs = post.excerpt | split: '<p>' %}
    {% if excerpt_paragraphs.size > 1 %}
      <p>{{ excerpt_paragraphs[1] | split: '</p>' | first }}</p>
    {% else %}
      <p>{{ post.excerpt | strip_html | truncatewords: 75 }}</p>
    {% endif %}
    <a href="{{ post.url }}">[read more]</a>
  </div>
  {% endfor %}
</div>
