---
layout: default
---
[About me](/my/resume.pdf) | [CS570 HW1](/my/cs570_hw1.html)
{% for post in site.posts limit:50 %}
<h2>{{ post.title}}</h2>
<div class="text-muted">[ {{ post.date | date: "%b %Y" }} ]</div>
{% if post.description %}
{{ post.description | markdownify }}
{% else %}
{{ post.excerpt | strip_html }}
{% endif %}
<span class="readmore">[Read more ...]({{ post.url }})</span>
{% endfor %}