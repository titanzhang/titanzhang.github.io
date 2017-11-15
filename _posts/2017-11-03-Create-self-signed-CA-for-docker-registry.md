---
layout: post
title:  "Create self signed CA for docker registry"
categories: ops docker
tags: docker registry certificate
permalink: /articles/:title
---
A docker registry server cannot be externally accessible until it is secured by TLS (https). A detailed step-by-step tutorial can be found on [Docker official site](https://docs.docker.com/registry/deploying/#run-an-externally-accessible-registry).  

A self-signed certificate is required by Registry server, as well as the Docker clients who will push images to the server. Here is the how-to.

### Generate self-signed certificate
```
openssl req \
  -newkey rsa:4096 -nodes -sha256 -keyout certs/domain.key \
  -x509 -days 365 -out certs/domain.crt
```

### Setup CA on Registry clients
#### Linux
```
cp domain.crt /etc/docker/certs.d/<myregistrydomain.com>:<port>/ca.crt
```
#### MacOSX
Add the CA file to the KeyChain
```
sudo security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain ca.crt
```
