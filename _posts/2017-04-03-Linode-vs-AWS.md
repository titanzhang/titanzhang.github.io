---
layout: post
title:  "Linode vs. AWS"
categories: ops cloud
tags: linode aws cloud vm
permalink: /articles/:title
---
I'v been a ***[Linode](http://linode.com)*** user for several years. During these years I kept going with Linode even many other better clould providers emerged, such as ***[AWS](http://aws.amazon.com)***, util last week. Now I'm happy with my web services running on EC2 and enjoying other services, ECR is one of them. There are reasons triggered me making this change.

Back to the time when I started using Linode, I was suffering from being blocked to access some internet resources, such as Google/Wikipedia, thanks to the GFW. The blocking is archieved by returning a REJECT message for any HTTP connections requesting a blocked website. A popular workaround is set up a VPN server in the network outside of GFW and access restricted websites via the VPN tunnel. After comparing the network performance between Linode and AWS, I ended up choosing Linode to host my VPN server. But now I'm physically living outside of the GFW, so I don't have the motivation to own a VPN server any more.

In the past few weeks, I was practising seting up Docker on my VMs in Linode. To better understand how the Docker swarm mode works, I applied up to 4 VMs in Linode, 1 for database, 2 for web and 1 for Docker registry. As Docker nodes communicate with each other via several TCP ports, my plan is to create a local network among my VMs and allow any network traffic inside.   
To allow network traffic from a VM, the iptables rule is like:
```bash
-A INPUT -s 192.168.0.10/32 -j ACCEPT # allow any traffic from 192.168.0.10
```
If I want to allow traffic for all of my VMs, I should write the rule like this:

```bash
-A INPUT -s 192.168.0.10/32 -j ACCEPT # web1
-A INPUT -s 192.168.0.21/32 -j ACCEPT # web2
-A INPUT -s 192.168.0.15/32 -j ACCEPT # database
-A INPUT -s 192.168.0.56/32 -j ACCEPT # registry
```
Actually the local ip subnet of all VMs is 192.168.0.0/16, so a better way to define the rules is use the subnet other than specify ips one by one:
```bash
-A INPUT -s 192.168.0.0/16 -j ACCEPT # allow traffic from any ip of this subnet
```
This rule seems a perfect solution for my requirement, but it's not true. Linode puts all VMs in the same local ip subnet, that leads to a VM owned by another user can connect to my VMs. So I have no other choices but specify the ips one by one in my iptables rule. Based on my experience on other cloud service providers, I expected a "private network" service provided by Linode, which can create a isolated virtual network for a user. No lucky, that's not the case with Linode.

Now I have 5 EC2s to host web services, 1 ECR(EC2 Container Registry) to store my Docker images, 1 VPC(Virtual Private Cloud) to network my VMs and Route53 to manage my private DNS. From my point of view, AWS is rich of features(though it took me a quite of time to know even the very basic ones), while the management console is too complicated(I miss Linode badly).

