---
title: "Red Team Lab (Overview)"
date: "2026-06-25"
excerpt: "A hands-on comparison of Kali Linux, ParrotOS, and BlackArch for building a home red team testing environment, judged on install experience, tooling, and usability."
coverImage: "/blog/red-team-overview/image1.webp"
tags: ["Red Team", "Home Lab", "Linux"]
---

Regardless of your role, everyone in cybersecurity
should have a base level knowledge of red team activities. It’s common
in the industry to know the difference between red and blue teams, but I
think it’s just as important to have a hands-on understanding of common
attack vectors like command injection, basic reconnaissance, password
cracking, etc. It’s one thing to understand how an attack works on
paper, it’s entirely different to see it work in action. Now, I’m
not suggesting everyone needs to perform advanced exploits, but building
a lab provides safe exposure to core attack
techniques.

Now, a lot of professionals will build their own pen
testing environment since signatures of the metadata for baseline pen
testing distros have been developed. Building custom systems for it
makes it more difficult for security tools to flag you as suspicious.
However, that’s outside the scope of this article as we’re only building
this for very basic testing.

This article will be broke down into 5 sections since
we will be examining and comparing three of the most popular Linux
distros for penetration testing. We’ll start with the most well known
Kali Linux before moving onto ParrotOS and finishing it off with
BlackArch. We’ll compare them based of ease of install, tools available,
and design (how easy it is to find a tool).

## Kali Linux

Probably the most mainstream penetration testing
distro. I’ve met people outside of cybersecurity who know about Kali. It
was released over a decade ago and is what a lot of people think of when
they think pen testing. It relies on the testing branch of Debian giving
it a balance between stability and newer packages. It’s a solid
pick and is great for red team labs.

Out of the three distros I tested this was the
easiest to install onto my virtual machine. The website provides access
to `qcow2` which isn’t as common to see as other VM images like
`vmdk` or `OVA`. The file was compressed so it was easy to download,
and once uncompressed I had the VM up and running within 5
minutes. 

![](/blog/red-team-overview/image1.webp)

The user interface is clean, and it’s easy to find
the tools in the top left. It uses the low resource consuming desktop
environment XFCE which ensures everything is easy to use even if it’s
not the most pretty. It’s important to note that other versions of Kali
are available that come with different desktop environments. Personally,
I think XFCE is a good choice since no one should be using Kali as their
daily driver and XFCE provides complete functionality with less
resources consumption compared to more popular environments like
KDE.

As someone who specializes in digital forensics, one
thing I immediately looked for was forensics software. While it does
have more options than I thought a pen testing distro would have, I was
disappointed that it didn’t have Volatility. Volatility is the de facto
tool for conducting memory forensics. Even other forensics software like
Magnet Forensics relies on Volatility to conduct examinations into RAM.
The tool is a small install, and it’s likely Kali already has the
dependencies installed. It’s far from a huge issue though since like I
stated it’s a pen testing distro not forensics.

One thing that may throw you off is Kali uses Zsh
instead of Bash. That being said they’re very similar, and you likely
won’t run into an issue.

*Note: My background in programming won’t allow me to
move forward without noting that Zsh uses 1-based indexing with arrays
rather than 0. If you don’t understand what this means it probably won’t
affect you.*

## ParrotOS

While this can be used for pen testing, it’s
generally considered a lighter more privacy focused alternative to Kali.
Like Kali, ParrotOS is Debian based. Unlike Kali, ParrotOS has a ‘Home’
addition that theoretically can be used as a daily driver. It’s marketed
as usable daily, though most professionals separate lab environments
from personal/work systems.

While it does offer VMs for VirtualBox and VMware, it
doesn’t offer anything for KVM. I can convert it to a compatible format,
but honestly it's just easier to install the `.iso` instead. If you’ve
ever installed a mainstream distro you’ll know that it practically walks
you through the installation. While technically not as easy as Kali, the
difference is minor and shouldn’t be considered.

![](/blog/red-team-overview/image2.webp)

As you can see in the picture above the UI is similar
to Kali and pretty intuitive. It uses Mate instead of XFCE, which are
both low resource desktop environments. I believe XFCE uses less
resources, but it's a marginal difference. I prefer how Parrot sorts the
tools as they’re put into a single folder. This is a personal preference
and opposite of how Kali treats it by putting the desktop tools in a
folder, and spreads out the pen testing tools.

Similar to Kali, the first thing I checked was
forensics software. I know, it's not a forensics distro, but it piqued
my interest. While it does have more forensics software, I was
disappointed to see the lack of volatility once again. I’m far from an
expert on red team exploits, looking through the software Parrot has a
lot of the more popular ones such as Nmap, Wireshark, and Metasploit. I
also found some interesting ‘application’ that allows the user to
stop/start and restarted services like ssh, SQL, and HTTP. While this
can be accomplished with a quick and easy terminal command, it's nice to
see these small QoL features.

Finally, it's important to note that popular training
tools like Hack the Box use and provide access to ParrotOS VMs. You can
even install the HTB VM on ParrotOS website. Now this isn’t necessarily
prove that it’s better than any other tool, but I’m sure HTB choose it
over other distros for a reason.

## BlackArch

This one is an interesting case, most people probably
haven’t used it or maybe not even heard about it. However, it has more
tools than Kali or Parrot. If you’re familiar with Arch, Black Arch is
very similar. It's more of a hobby distro, it’s better suited for
hobbyist exploration than enterprise labs. Overall,
I’d say Black Arch fits into that category as well.

Downloading the iso is no different from ParrotOS,
but installing the OS is a whole different beast. Optimally, you’d
probably have this installed on a bootable USB that you can plug in and
use whenever you need it. While I believe this works on tools like
VMware and VirtualBox, KVM or maybe Virt-Manager automatically removes
the image after rebooting which is a little annoying but not an issue
with Black Arch.

If you’re familiar with Arch you’ll know the
installation is a lot more hands on versus other distros. While it's not
too difficult if you follow the documentation, it's not as streamlined
as Kali or Parrot and can be a hassle if you have to download it more
than once.

![](/blog/red-team-overview/image3.webp)

Black Arch doesn’t use mainline desktop environment
instead it uses a window manager named Fluxbox. Now if you’re familiar
with the shortcuts I’m sure it improves your speed with a lower resource
consumption. However, if you’re unfamiliar, it adds a steep learning
curve. Windows managers, while some people prefer, I think the resources
saved aren’t worth the lack of ease of use. This is again what I meant
by Arch is very good at being a hobby distro that you can spend time
configuring exactly what you want, but personally it's not what I’m
looking for in a tool.

![](/blog/red-team-overview/image4.webp)

Now, Black Arch has a lot of tools available,
forensics alone takes multiple pages to display the names of these tools
alone. Any tools you could need are here. That being said, the way it's
sorted and the lack of icons make it more difficult to find tools you
need. It's easier to find the icon for Metasploit or Autopsy than it is
to find the name. There’s a lot of information, and you won’t likely use
most of these tools.

Overall, Black Arch is fun to play around with, but
falls far behind Kali or Parrot as a tool. While it does have a lot of
security applications, finding them can be a headache. At the end of the
day Black Arch can be fun to configure and design, but its role isn’t as
a training tool or a tool most pen testing teams will use. It might have
a place as a WSL tool since you access most of the tools through the
terminal when using WSL.

# Comparison 

The installation between Kali and ParrotOS are basically the same.
They’re both streamlined, and easy to use whether you create a bootable
USB or install the operating system directly. Black Arch on the other
hand is more complex and not something you’ll want to do if you need to
quickly use a tool.

Again, the interface between Kali and ParrotOS is
basically the same. It more comes down to personal preference. I prefer
Parrot personally, but it's a preference and largely
interchangeable depending on user workflow. Black
Arch again, is a tad bit complex for my taste and leans towards the
hobbyist. If you want to learn how to navigate with fluxbox, great.
However, it does cut down into the time you could be focusing on
learning the pen testing tools.

Parrot advertises 600+ security tools. I couldn’t
find a count with Kali, but I’m guessing it's similar. Both ship with
popular, mainstream tools. You’ll likely not find many tools on one
that’s not on the other. Any tools that you need you’ll likely be able
to easily install. Black Arch comes with the mindset of having access to
all the tools. I couldn’t find an exact count, but it's safe to say it's
double if not triple the number of tools found on Kali or Parrot. That
being said this can cause more harm than good.

Kali is the most mainstream pen testing distro. That
means most training you see regarding pen testing will be focused on
Kali. Parrot has some resources especially Hack the Box, but overall the
majority will use Kali. Black Arch, while some training might utilize
it, I bet it's far less than either of the other two.

## Summary

While I wouldn’t recommend BlackArch, either ParrotOS
or Kali is perfect for a red team lab. Deciding between them mostly lies
in personal preference. I lean toward Parrot due to familiarity,
but both Parrot and Kali are strong, well-supported options for building
a red team lab.
