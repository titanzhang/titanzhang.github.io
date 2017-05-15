---
layout: default
---
<a href="/my/resume.pdf" target="_blank" onclick="if (!ga) return true;ga('send','pageview','/my/resume.pdf');">About me</a> | [CS-570 HW1](/my/cs_570_hw1.pdf) | [CS-570 HW4](/my/cs-570-hw4.html)

<hr/>
<!-- Posts -->
{% for post in site.posts limit:10 %}
<h3>{{ post.title}}</h3>
<p><span class="glyphicon glyphicon-time"></span>{{ post.date | date: "%b %Y" }}</p>
<p>
{% if post.description %}
{{ post.description | markdownify }}
{% else %}
{{ post.excerpt | strip_html }}
{% endif %}
</p>
<a class="btn btn-primary" href="{{ post.url }}">Read More <span class="glyphicon glyphicon-chevron-right"></span></a>
<hr>
{% endfor %}

<!-- Pager -->
<!--ul class="pager">
    <li class="previous">
        <a href="#">&larr; Older</a>
    </li>
    <li class="next">
        <a href="#">Newer &rarr;</a>
    </li>
</ul-->

