---
title: "Setting Up the Firewall"
date: "2026-06-22"
excerpt: "Installing and configuring pfSense as the firewall for a home blue team lab, from downloading the ISO through interface configuration and DHCP setup."
coverImage: "/blog/setting-up-the-firewall/image1.webp"
tags: ["Home Lab", "pfSense", "Blue Team"]
---

## Installing pfSense

In this article we will discuss setting up the
pfSense firewall for your blue team cyber security lab. Before we start,
make sure you’ve completed the previous steps and created the
appropriate virtual LANs; without them you won’t be able to follow along
with the steps provided here.

Throughout the article, we will install and configure
the firewall. Below is a quick overview of the steps:

1.  Download ISO

2.  Create VM

3.  Install pfSense

4.  Configure Interfaces

5.  Establish Rules

To begin, we need to download the `.iso` file on
our host system. We will be using pfSense as it’s open-source and easy
to acquire. The exact firewall you use doesn’t matter; just know the
installation and configuration will differ depending on what you use.
[Here](https://docs.netgate.com/pfsense/en/latest/install/download-installer-image.html)
are the installation docs, and
[here](https://shop.netgate.com/products/netgate-installer) is where you
can get installation media at the time of writing this.

You may need to extract the file after installation,
but afterward you’ll be left with a file similar to
*netgate-installer-v1.0-RC-amd64-20240919-1435.iso.* Once you have this
file, we can get on to creating the virtual machine.

- 64-bit amd64 (x86-64) compatible CPU

- 1 GB or more RAM

- 8 GB or larger disk drive (SSD, HDD, etc.)

Above are the requirements given by Netgate. We’ll be
following closely with the below specifications:

- 1 CPU

- 2 GB of RAM

- 24 GB of drive space (You might be able to shrink
  this a bit; this is just the value I used.)

Finally, check the box to further configure before
installing the media. We will need to add the interfaces for Management
(LAN), Corporate WAN, Corporate LAN, Security, and ISOLATED. We will
also need a NIC that we can use to MacTap our local connection. Now
eventually we will need all of those interfaces, but I find the
installation messy if we add them all now, so instead I recommend just
adding Management (LAN), and setting the current one to MacTap as these
two interfaces are required for installation.

![](/blog/setting-up-the-firewall/image1.webp)

![](/blog/setting-up-the-firewall/image2.webp)

The installation is pretty straightforward, since we
will be keeping most of the default settings. The only two things we
need to be concerned with are setting the firewall's WAN as our MacTap
interface and setting the LAN as the Management interface. If you did
everything correctly, you should get a screen similar to the one
below.

![](/blog/setting-up-the-firewall/image3.webp)

Finally, we need to set the LAN interface to have a
static IP address of 10.0.1.2. We can do this by selecting option 2 and
answering the prompts according to the table below:

| Configure IPv4 DHCP: | No                                                           |
|------------------------------------------------|----------------------------------------------------------------------------------------|
| Enter IPv4 Address:  | 10.0.1.2 (You can use any unused address; I choose this one) |
| Enter Subnet:        | 24                                                           |
| If LAN, leave blank: | Leave Blank                                                  |
| Configure IPv6:      | No                                                           |
| Enter IPv6 Address:  | Blank                                                        |
| Enable DHCP on LAN:  | No                                                           |
| Revert to HTTP       | No                                                           |

If you followed the previous steps correctly, you
should be able to access the web interface by going to 10.0.1.2 in your
browser. The default credentials:

- Username: admin

- Password: pfsense

## Configuring the Firewall

After signing in for the first time, it will walk you through the
initial configuration. The configuration is fairly basic; make sure you
note down the hostname and domain name. Mine personally are `pfsense`
and `zenith.test`.

Once you get through the initial configuration, it's
time to begin configuring your interfaces. Before we can configure the
interfaces, we have to assign them to the virtual machine.
pfSense should allow you to assign the new interfaces while the system
is running, but you may need to restart it before you can access the new
interfaces. The order you add the interfaces doesn’t matter, but note
down the virtual MAC addresses associated with each interface so you can
use them later.

### Interface Assignment

![](/blog/setting-up-the-firewall/image4.webp)

At the top of the dashboard, you’ll see a number of
options. Right now, we’ll be focusing on interfaces > interface
assignment. If you’ve followed the previous steps, you should see
two interfaces, WAN and LAN. You should be able to add the other
interfaces by clicking the ‘add’ button at the bottom. You can configure
each of the new interfaces following the below format:

- Enable: Check

- Description: Follow a consistent format, but it's
  your choice what you choose. A suggested format would be
  `[Network-Name] | VLAN [VLAN-ID] | [Purpose/Zone]`

- IPv4 Configuration Type: Static IPv4

- IPv6 Configuration Type: None

- MAC Address: leave empty

- MTU: leave empty

- MSS: leave empty

- Speed and Duplex: Default

- IPv4 Address: It doesn’t exactly matter what you
  provide as the static IP address. Usually I’d recommend
  `<network-prefix>.1` for example, `10.0.1.1`. However, that
  address is already used on my machine since they’re virtual networks.
  So instead, I’m using `<network-prefix>.254` i.e.,
  10.0.1.254.

- IPv4 Upstream gateway: None (only the WAN interface
  should have configured this field)

- Block private networks: unchecked (this field
  should be checked for WAN interface only)

- Block bogon networks: unchecked (this field should
  be checked for WAN interface only)

*Note: If you accidentally misconfigure the LAN
interface, you might lose connection to your system. If that happens,
you’ll have to use the terminal to reconfigure the LAN
interface.*

With all the interfaces up and running, we can begin
setting up the rule that will dictate the flow of traffic inside our
home lab. You can access these rules through Firewall > Rules. Below we
will go through the set of rules for each network:

### WAN

![](/blog/setting-up-the-firewall/image5.webp)

We don’t add any additional rules here; while it is
the connection to the internet, in our lab environment we have a false
interface that represents the internet.

*Note: If you don’t see these rules, return to the
WAN interface configuration and enable ‘Block bogon networks’ and ‘Block
private networks’*

### LAN (Management)

![](/blog/setting-up-the-firewall/image6.webp)

This interface is what you’re using to connect to the
firewall. That being said, it’s best practice to disable the IPv6 rule
since you’re likely using IPv4 to connect and there shouldn’t be any
connections through IPv6. If you’re testing IPv6, feel free to leave
this rule enabled. Just note, **on an actual corporate network, you want
to disable any service/rule that’s not being used, as it opens an
additional attack vector into your network.**

### Corporate WAN

![](/blog/setting-up-the-firewall/image7.webp)

This interface represents the internet in our
simulated environment. For that reason, the rules are simple. We can’t
control what happens on the internet, and most organizations need
traffic between their LAN and the internet in some capacity. So for this
interface, we allow any traffic to other devices on the WAN and allow
connections to the LAN.

### Corporate LAN

![](/blog/setting-up-the-firewall/image8.webp)

This interface will likely be expanded upon in the
future as we develop rules to prevent malicious attackers from accessing
our network. But for now, we’re just going to leave it basic.

### Security

![](/blog/setting-up-the-firewall/image9.webp)

The security segment shouldn’t have access to the
real or fake internet; it also shouldn’t have access to the Management
(LAN) interface we created. Everything else on the network, Corporate
LAN, ISOLATED, and other segments we add in the future, it should have
access.

### ISOLATED

![](/blog/setting-up-the-firewall/image10.webp)

This interface should have no access to anything. It
should be completely isolated to prevent the spread of malware. pfSense
should deny all by default, but this serves as a reminder when
configuring rules and as a precaution.

## Summary

I hope after reading this you’re one step closer to
setting up your home lab and that you have a better understanding of
pfSense and its role in a corporate network. Make sure you’re running
this virtual machine anytime you’re trying to connect two other machines
in your corporate network, or you may run into issues.
