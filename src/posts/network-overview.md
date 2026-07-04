---
title: "Project Overview (Blue Team Lab)"
date: "2026-06-20"
excerpt: "Designing a segmented home lab network to simulate a corporate environment — five isolated LANs covering the corporate network, security tooling, and a red team testing segment."
coverImage: "/blog/network-overview/image1.webp"
tags: ["Home Lab", "Networking", "Blue Team"]
---

Throughout the following articles we’ll be building a home lab to
simulate a corporate network. We’ll start by designing and explaining
the network in this article, and move on to setting up the firewall in
the next. Before we move onto the network, let go over the project as a
whole.

The project can be broken into three sections at this
moment. The network will be interconnected, but can be broken into the
corporate network, the malware analysis lab, and the penetration testing
environment.

The corporate network is what we will build first, it
will consist of security tools such as a SIEM (Wazuh), a IDS (Security
Onion), and a vulnerability scanner (OpenVAS). It will also have three
servers a web server running a Linux distro, Active Directory, and a
database again likely running on Linux. It will also have to
workstations running Windows 10 & 11.

## Network Overview

![](/blog/network-overview/image1.webp)

The initial network design is based off the project
developed by Marko Andrejic. Several changes have been implemented, but
I feel Mr. Andrejic is deserving of credit for developing the project
that parts of this is based on. If you’d like to read more about his
project, check it out
[here](https://facyber.me/posts/blue-team-lab-guide-part-1/).

The network consists of 5 separate LANs:

- Management: This network has a single purpose, to
  manage the pfSense firewall.

- Corporate WAN: This network operates as the
  internet. Even though we have a connection to the actual internet, we
  need a fake internet to introduce controlled attackers. It gives the
  benefit of allowing us to create a red team lab where we can attack
  our network, and examining the results.

- Corporate LAN: This network is where our users and
  data is stored. It operates as the main portion of our corporate
  network. It requires access to the Corporate WAN as well as other
  devices in the LAN. It shouldn’t have access to the devices in the
  ISOLATED or Security networks.

- Security: This is the segment where our security
  tools are located. Our SIEM, IDS, and vulnerability scanner are
  located in this subnet. It shouldn’t have access to the fake internet,
  but it should be able to access Corporate LAN and ISOLATED
  segments.

- ISOLATED: This segment is optional. It is where
  we’re going to setup our malware analyst environment and run malicious
  software. This can be risky, and you shouldn’t do this unless you’re
  knowledgeable on the topic. With that being said, setting up the
  environment isn’t risky and we won’t be cover running the malware in
  this project.

*Note: We may expand network segments in the future.
You’re also welcome to do this on your own to test your skills. Ideas
for further networks would be a honeynet, a DMZ, IoT, and Remote Office
/ VPN Segment.*

## VLAN Configuration 

Now, configuring your VLANs is going differ depending on if you’re using
VMware, KVM via Virt Manager, or Virtual Box. I’ve never built VLANs in
Virtual Box, but in VMware and KVM it is very similar. I personally use
Fedora on my desktop, so I’ll give the instructions to configure VLANs
in Virt Manager since its the tool I use. The concepts transfer easily
between tools, just make sure you follow the
concepts.

Before we set up the virtual network, there’s one
more concept we should cover. Virt Manager gives you five options for
different modes. We’ll review each of the modes, before explaining why
we’re using Isolated.

![](/blog/network-overview/image2.webp)

- NAT: VMs can talk to each other they can also reach
  the internet through your host.

- Routed: VMs use a subnet that can be routed
  externally. Can communicate to the host, and forwarded to the internet
  with additional configuration.

- Open: VMs operate as if they’re on you LAN.

- SR-IOV pool: This one is a bit complex, so if
  you’re interested I suggest doing some additional research. But
  essentially it allows the NIC to be split into multiple virtual
  functions (VFs). You can then assign these VFs to a VM allowing for
  higher performance.

- Isolated: In an isolated network, VMs can talk to
  each other on the same network, but can’t talk to the host. This is
  perfect for our project as we want the network to exist on its own,
  separate from any devices on the network.

To set up the virtual networks you’ll need to go to
Edit > Connection Details > Virtual Networks (Tab). From there you can
add a new network in the bottom left. You can use the table below to
match the fields:

| Name          | Mode     | IPv4 Range   | DHCP |
|-----------------------------------------|------------------------------------|----------------------------------------|--------------------------------|
| Corporate WAN | Isolated | 10.0.10.0/24 | No   |
| Corporate LAN | Isolated | 10.0.20.0/24 | No   |
| Security      | Isolated | 10.0.50.0/24 | No   |
| ISOLATED      | Isolated | 10.0.99.0/24 | Yes  |
| Management    | Nat      | 10.0.1.0/24  | Yes  |

*Note: If you’re confused by the IPv4 range or by the
CDIR notation (/24) I suggest you research subnets, CDIR, and RFC 1918
as these are important topics to know.*

![](/blog/network-overview/image3.webp)

You might be wondering why all of the network modes are ‘isolated’
except for one. The reason for that is because the management network is
only built so that we can manage the firewall, we could accomplish this
by setting the network as isolated and creating a VM to access the
network, but it’s much easier to set the mode NAT and access the network
through our host. 

## Summary

In this article, we designed a segmented virtual
network to simulate a corporate environment for blue team training. The
lab is divided into five LANs; Management, Corporate WAN, Corporate LAN,
Security, and ISOLATED each with clearly defined roles and access rules.
Most of the segments use isolated networking to prevent unintended
connections, while the Management network leverages NAT for easier
firewall administration.

This setup provides a safe and controlled environment
to practice network defense, incident detection, and malware analysis.
Future expansions such as a honeynet, DMZ, IoT VLAN, or remote office
network can further enhance realism and testing opportunities.

In future articles we will configure the systems in
the diagram such as pfSense, and Active Directory. We will also include
additional resources for future projects where you can implement the
same principles improving your understanding.
