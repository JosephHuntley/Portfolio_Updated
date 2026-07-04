---
title: "Setting Up Digital Forensics Workstation"
date: "2026-06-27"
excerpt: "Building a dedicated Windows-based digital forensics workstation for practice, covering VM setup, forensic tooling, and configuring WSL."
coverImage: "/blog/setting-up-dfir-workstation/Main_img.webp"
tags: ["Digital Forensics", "Home Lab", "DFIR"]
---

Beyond the technical benefits, building a
digital forensics lab demonstrates initiative, problem-solving, and safe
hands-on practice, qualities that are highly valued in both academic and
professional settings.

True forensics labs require a lot of planning and
equipment. The computer hardware alone usually far surpasses anything
you’ll find in a household. However, we’re not creating a forensic
workstation for actual investigations. We’re creating a workstation for
educational purposes. This can be used for mock examinations, testing
tools, verifying artifacts, etc. For that reason, I recommend using a
VM. In theory, you can perform most of these actions on physical
hardware, but it’s nice to have a separation between your lab
environment and personal data. Plus, it gives you more control over the
system.

We’ll break this article down intro three sections.
We’ll begin by installing Windows and configuring the VM. We will move
onto to install the forensics software on the system and end by
configuring WSL on the system. Besides a brief description we’re not
going to go into a deep dive of the tools.

## Installing Windows

Initially I couldn’t decide between Windows 11 Home,
Pro or Windows 2025 Server. Each had their own benefits and downsides.
Eventually, I decided to go with Windows 11 Pro. One of the biggest
downsides of this version is that you’ll have to either rely on
reverting the VM to a previous snapshot every 180 days, or activate the
Windows installation. Some people use activation scripts, but I
recommend following legal licensing practices.

We’re not going to cover how to install the Windows
.iso file since it changes every so often and is outside the scope of
this article. Just be sure after downloading verify the hash of the
image. This is an important step that you should never skip when
downloading important files.

*Note: Hashing generates a unique digital
‘fingerprint’ of a file. By comparing your downloaded ISO’s hash with
the value published by Microsoft, you can confirm its authenticity and
ensure it hasn’t been tampered with.*

The hardware you give your VM will differ depending
on your physical hardware. I recommend at least 16 GB of RAM if
possible. I’m giving the following specs to my VM:

| **Hardware** | **Quantity** | **Description**                                                                                                                                    |
|----------------------------------------|----------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| RAM          | 20 GB        | Probably overkill, but my system has 32 GB and my host uses 4 GB to run.                                                                           |
| CPU          | 8 Threads    | My system has 16 in total. You can easily get away with 4.                                                                                         |
| Storage      | 100 GB       | I don’t have a lot of free space. This is something that will limit your workstation as it severely limits the size of the images you can examine. |

You’ll likely want to create a local Windows account
rather than logging on to your Microsoft account. I followed
[this](https://www.howtogeek.com/836157/how-to-use-windows-11-with-a-local-account/)
guide to accomplish it. Once you have Windows installed you should be
good to go, I recommend taking a snapshot of vanilla image in case you
need to revert at any moment.

*Note: I recommend setting all the security questions
to ‘None’ or similar since it is a lab environment.* This isn’t secure,
but security isn’t the biggest concern so long as your host is locked
down.

## Installing Windows Tools

If you’re new to field of digital forensics, I
suggest you try to build a Powershell script that accomplishes these
installations. Not because you’ll likely be installing the lab multiple
times, but rather to improve your abilities with Powershell. Scripting
can be a powerful tool in any investigation and this is a great way to
improve those abilities.

To begin, let’s change a few settings on
Windows:

- Set UTC as the timezone

- Show hidden files

- Make a directory for Cases and Tools

- Exclude those directories from Microsoft
  Defenders

- Disable “Cloud-delivered protection” and
  “Automatic sample submission”

*Note: All the above settings can be modified through
Powershell as well as GUI. As an added challenge, do it through
Powershell.*

You might be wondering why we disable certain
Microsoft Defender settings. While reducing security on a live system is
generally bad practice, in a controlled lab environment it helps
maintain strict evidence integrity, prevents accidental modification of
forensic data, and avoids conflicts where security tools might
quarantine or alter the very artifacts you’re trying to
analyze.

Below you’ll find a list of all the software we’re
going to install along with a brief description:

*Note: You should keep your own record of the exact
versions of each of the software installed.*

| **Name**                                                                                                                       | **Description**                                                                                              |
|----------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------|
| [Notepad++](https://notepad-plus-plus.org/)                                                                                    | A text editor that can be used for a variety of file types.                                                  |
| [RegRipper](https://github.com/keydet89/RegRipper3.0)                                                                          | Parse Registry Hives.                                                                                        |
| [Event Log Viewer](https://eventlogxp.com/)                                                                                    | Widely considered a better alternative to Windows built-in event viewer.                                     |
| [Eric Zimmerman’s EZ Tools](https://ericzimmerman.github.io/)                                                                  | Tools created by Eric Zimmerman, widely used by the forensics community.                                     |
| [Sysinternals](https://learn.microsoft.com/en-us/sysinternals/)            | A suite provides a number of tools that can be very helpful for forensic analysis. |
| [Wireshark](https://www.wireshark.org/)                                                                                        | Allows you to capture and analysis network packets.                                                          |
| [Arsenal Image Mounter](https://arsenalrecon.com/downloads/)                                                                   | Can be used to mount images.                                                                                 |
| [Kape](https://www.kroll.com/en/services/cyber-risk/incident-response-litigation-support/kroll-artifact-parser-extractor-kape) | A very flexible and effective tool for collecting triage data off of disk images.                            |
| [FTK Imager](https://accessdata.com/product-download/ftk-imager-version-4-5)                                                   | Common tool for acquiring memory and disk images.                                                            |

Most of these applications are straightforward. I’d
suggest creating a shortcut in the ‘Tools’ folder for any of the
applications that can’t be installed in that location. You may face an
issue installing FTK Imager, since it requires a ‘business email’ and
doesn’t allow outlook, or gmail domains. Once you’ve finished installing
the applications we can move onto WSL.

## Configuring WSL

In case you don’t know, WSL or (Window Subsystem
Linux) is a way where you can run a small virtualized Linux subsystem
within Windows. It allows you run Linux applications as well as Linux
tools on your Windows files, and folders. Its extremely useful bringing
a combination of the best of Windows and Linux.

To start, we need to enable WSL with the below
command as administrator:

`Enable-WindowsOptionalFeature -Online
-FeatureName
Microsoft-Windows-Subsystem-Linux`

After that you have to reboot your system. Now, there
are several options for which system you run, personally I chose Ubuntu.
However, Kali is a strong contender since it has a lot of software and
configurations already installed. I went with Ubuntu so that I would
have more control over the software and tools I install. After choosing
your distro, it’s time to install our tools. We’ll begin with
Volatility3:

`sudo apt install python3-pip` & `pip3 install
volatility3`

You can verify the installation with the `vol`
command. Next, we’ll install Log2Timeline:

`sudo add-apt-repository
ppa:gift/stable` to add the repository and
`sudo apt-get install plaso-tools`

Finally, we will install oletools: `pip3
install oletools`

## Summary

A forensic workstation is an important part in
Digital Forensics. After all, it’s where you conduct your
investigations. It’s the tools you use to extract evidence. It’s where
you verify artifacts, and test theories. This article explained how to
set up a basic workstation. There are likely several additional tools
that you’ll install to expand it. But this is a good starting
point.

Setting up a DFIR lab not only helps you learn the tools but also shows
prospective employers that you can design and manage an investigative
environment safely.
