---
permalink: /json/posts
---
[
	{% for post in site.posts %}
	{url:"{{ post.url }}", tags:[{% for tag in post.tags %}"{{ tag }}",{% endfor %}]},
	{% endfor %}
]