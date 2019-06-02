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

    <span class="post-date">{{ post.date | date: "%Y-%m-%d" }}</span>

    {{ post.excerpt }} <a href="{{ post.url }}">[read more]</a>
  </div>
  {% endfor %}
</div>
