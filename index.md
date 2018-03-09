---
layout: default
---
<!-- links -->
**Personal projects**: [RevPrice](http://price.liangzhang.io) | [Algohub](http://algohub.me)
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
