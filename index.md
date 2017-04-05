---
layout: default
---
<a href="/my/resume.pdf" target="_blank" onclick="if (!ga) return true;ga('send','pageview','/my/resume.pdf');">About me</a> | [CS570 HW1](/my/cs_570_hw1.pdf)
{% for post in site.posts limit:50 %}
<h3>{{ post.title}}</h3>
<div class="text-muted">[ {{ post.date | date: "%b %Y" }} ]</div>
{% if post.description %}
{{ post.description | markdownify }}
{% else %}
{{ post.excerpt | strip_html }}
{% endif %}
<span class="readmore">[Read more ...]({{ post.url }})</span>
<hr/>
{% endfor %}