---
title: "Bad Epoll (CVE-2026-46242): The Vulnerability Mythos Missed"
date: "2026-07-05"
excerpt: "Vulnerability CVE-2026-46242, Bad Epoll. A race condition that leads to local privilege escalation on Linux systems including Android and Chrome's sandbox."
coverImage: "/blog/epoll-vuln/coverimg.webp"
tags: ["Vulnerability", "Linux", "privilege escalation", "android"]
---

A few months back Anthropic's Mythos discovered a vulnerability (CVE-2026-43074) in the Linux Kernel. It was a vulnerability in the eventpoll (epoll) subsystem that led to a use-after-free exploit. This issue has now been patched, but it's closely related to the above issue since they both came from a patch of code added in 2023.

This may raise the question, if the vulnerability was part of a section of code Mythos closely examined, why didn't it spot the second vulnerability? No one knows for sure but security researcher, Jaeyoung Chung, believes that it's due to the timing required to exploit the exploit and the little evidence that the exploit occurred.

Back to the exploit discovered by Jaeyoung Chung, the reason this issue raised alarms is that race-condition bugs are notoriously hard to find, and also because there is no workaround outside of patching the kernel. The exploit is caused by two parts of the kernel cleaning the same internal object, if one frees the memory while the other is writing to it. This causes a collision that allows attackers access to the kernel's memory climbing from a normal account to root.

The race window itself is still only about 6 CPU instructions wide. What makes the exploit reliable isn't a wider window, it's repetition. Chung's technique sets up two pairs of epoll objects, uses one pair to keep re-triggering the race while the other acts as the victim, and loops until it lands. That approach hits root close to 99% of the time on a vulnerable kernel.

At this point no known malicious exploit exists in the wild. However, Jaeyoung Chung has released a public exploit. With it being a local privilege escalation it may seem like it's unlikely to cause much damage unless the network is already compromised. However, as stated above the exploit can be used inside of Chrome's sandbox making it a bigger threat than it first appears. 

## Eventpoll (Epoll)

Epoll is a critical service for servers that handle thousands of simultaneous network connections. At a more technical level, epoll allows applications to efficiently monitor tens of thousands of file descriptors (FDs). Most everything in Linux is represented as a file, as such file descriptors include:
- Files
- Network Sockets
- Pipes
- Eventfds
- Timerfds
- Terminal devices

Epoll allows an application to keep track of this information and receive notice when it changes. Instead of having to repeatedly check the status of a socket, the application can just be informed when it changes. 

Now that we have a better understanding of epoll, let's go over the race condition one more time. First two threads  point towards one object. Afterward, thread A frees the memory allocated for the object while thread B still references it. This  causes a collision and letting the attacker execute code inside the kernel.

## Use-After-Free (UAF) Vulnerabilites
  
As a metaphor you can think of UAF vulnerabilities as a hotel room. In this instance, you're staying at a hotel and after checking out your card is still able to unlock the door. In that instance, the next guest could store their belongings in the room, and you could still enter it and either steal their items or replace them with items of your own. In our example, the attacker would use the empty room to run code in the kernel resulting in increased privilege (root).

## Diagram

![Diagram of the exploit](/blog/epoll-vuln/fig2.svg)

The diagram above was provided by the security researcher who first discovered the bug. I'll attach his write-up below as it's more thorough and contains several more diagrams. However, as this article is mostly just an overview of the exploit I wanted to review this diagram.

The vulnerability can be broken down into 6 steps:

1. Initial Setup
```
ep_waiter = epoll_create1(0);
ep_target = epoll_create1(0);

epoll_ctl(ep_waiter, ADD, ep_target, &ev);
```

This is setting up epoll to watch a target and is pretty typical when establishing epoll to monitor a file descriptor.

2. The Attacker Starts Multiple Threads
The colored boxes at the top represent different threads all running simultaneously.

They repeatedly call things like:

- close(ep_waiter)
- close(ep_target)
- timerfd_create()
- duplicate file descriptors
- create new epoll objects

The exploit is trying to make several kernel operations happen at almost exactly the same time.

Think of several people all trying to remove the same book from a library shelf simultaneously.

3. Closing `ep_waiter`
The blue section shows what happens when we close `ep_waiter`.

The kernel begins cleaning up.

It eventually executes code similar to:
```
Remove epitem
↓

Remove from waiters list

↓

Free resources
```

Notice the highlighted section:

Race Window: 6 instructions

That means there are only about six CPU instructions where another thread can interrupt execution.

Normally that window is tiny.

The attacker's goal is to hit that exact moment.

4. Closing `ep_target`
At the same time another thread closes `ep_target`. This can be seen in the pink section, `kfree()` is the Linux function used to return memory to the allocator.

5. The Exploit Immediately Reallocates that Memory
Instead of letting the freed memory sit unused, the attacker quickly creates another epoll: `ep_target2`

The allocator often reuses recently freed memory. So memory that previously contained `ep_target` now contains `ep_target2`.

Imagine apartment 12 becomes vacant. A minute later someone else moves into apartment 12. The address is identical, but the resident is completely different.

6. The stale pointer

At the same time:

The cleanup code from close `(ep_waiter)` hasn't finished. It still has a pointer saying:

`I know where ep_target lives.`

But that memory now contains `ep_target2`. The kernel doesn't realize the object changed, and it keeps writing through the old pointer.

That's exactly what this label means: `UAF Write`

The kernel thinks it's modifying:

`ep_target`

When in reality it is:

`ep_target2`

## Conclusion

Wondering how to defend against this exploit? Keeping your systems up-to-date means you're likely already defended against it. The exploit was initially reported in Feb, 2026 a patch has been released to fix the bug. If you're curious you can check out Linux kernel commit `a6dc643c6931` to view the update. 

While it requires local code execution first, the Chrome sandbox and container angles mean it's not as niche as a typical local-priv-esc bug. It's always interesting to learn how exploits operate and why they're difficult to discover. Privilege escalation exploits can be some of the most detrimental, it's good that security researchers discovered this before an attacker could. 

If you're interested in this exploit I highly recommend checking out the write-up created by Jaeyoung Chung themselves at [https://github.com/J-jaeyoung/bad-epoll](https://github.com/J-jaeyoung/bad-epoll).
