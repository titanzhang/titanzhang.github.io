---
layout: post
title:  "Dockerize develop environment for robotics"
categories: develop robotics
tags: develop robotics docker Player Stage
permalink: /articles/:title
---

Player is a network server for robot control. It provides interfaces of sensors and actuators over network. A program communicates with Player to get sensor data and to send commands to actuators. So basically Player is a bridge between your program and phsical robots/simulator. For more information about Player, you can check this [Player wiki page](http://playerstage.sourceforge.net/index.php?src=player).

Stage is a robot simulator. It simulates mobile robots, sensors and other objects in the environment. For more information, see the [Stage page on Github](https://github.com/rtv/Stage).

In my course of robotics, I used to install Ubuntu in [Parallels Desktop](https://www.parallels.com/) as my develop environment to finish the course assignments. But different usage of keyboard shotcut(I'm kind of a terminal intended guy) between Ubuntu and MacOSX is really annoying to me. I tried to look for a better solution to meet my requirements: 1)Light-weight and easy to maintain; 2)Everything can be done in command line except for writing code in IDE. It ends up to be docker + xforwarding.

For those who just want to use the develop environment, you can pull the docker image [here](https://hub.docker.com/r/titanzhang/robotdev/). More detail information about how this image was built out, you can check out the Dockerfile [here](https://github.com/titanzhang/docker_robotdev).

Besides the docker build, I want to share some trickies of compiling the Player/Stage:

* The package robot-player is removed from APT repository in Ubuntu 16.xx, so stick with 14.xx
* The environment variables LD_LIBRARY_PATH and PKG_CONFIG_PATH must be set BEFORE compile Stage, or the library libstageplugin.so will get built.
* The above variables should be set before every time you use Player/Stage (You can make them persistent by writing to bash profile).
* In 64-bit OS, the Stage library is in STAGE_HOME/lib64 other than STAGE_HOME/lib in 32-bit OS.