---
title: "Reverse Engineering CVE-2026-11405: A Missing Backdoor and a Plaintext Password Leak"
date: "2026-07-07"
excerpt: "Tenda Routers were found with an undocumented backdoor spanning across several versions. (CVE-2026-11405)"
coverImage: "/blog/tenda/check_password_function.webp"
tags: ["Backdoor", "Tenda", "Networking", "ghidra"]
---

Routers, typically the entry point of your network, if unsecured can lead to a large headache and at worse can lead to a complete network compromise. Tenda, a Chinese network device manufacturer, recently became the focus of scrutiny when CERT/CC discovered a backdoor into their routers that spanned a multitude of firmware versions. To make matters worse, this backdoor is undocumented and has a static password across all systems meaning it's unlikely anyone using Tenda routers would be aware of this critical flaw.

Backdoors are rarely if ever useful. The sole exception being maintenance access, which while can be classified as a backdoor, typically only exists to prevent devices from becoming bricks if credentials are forgotten. Even when implemented, these maintenance backdoors typically require physical access to the device or at the very least cryptographically signed challenge unique per device. The major issue with the Tenda backdoor is that it's both undocumented and can be remotely executed with a static password.

As stated by CERT/CC the following versions are impacted by the vulnerability:

- US_FH1201V1.0BR_V1.2.0.14(408)_EN_TD
- US_W15EV1.0br_V15.11.0.5(1068_1567_841)_EN_TDE
- US_AC10V1.0re_V15.03.06.46_multi_TDE01
- US_AC5V1.0RTL_V15.03.06.48_multi_TDE01
- US_AC6V2.0RTL_V15.03.06.51_multi_T

## Replicating the Results 

If there's one thing I love about writing these articles it's replicating the results. I had fun hunting down the firmware and decompiling `httpd` with ghidra. Although I wasn't able to confirm CERT/CC findings I do go over what I found and the steps I took below. I confirmed I was testing the correct hardware revision (v1.0), since Tenda reuses model names across firmware families with incompatible version schemes.

I was unable to verify the findings in `US_AC10V1.0re_V15.03.06.46_multi_TDE01`. I attempted searching the `httpd` file manually with ghidra and found no reference to a login function nor a `getValue("sys.rzadmin.password")`. Furthermore, I also ran `grep -rl "rzadmin" squashfs-root/` over the entire firmware, but I got no hits. Finally, I ran `strings httpd | grep -i "sys\."` against the `httpd` file to see if the researchers were obscuring the actual configuration variable with `rzadmin`, but I found nothing of note. This isn't to say that the backdoor doesn't exist, just that I couldn't find it. Also, it's worth noting that I tried both `15.03.06.46` and as well as `15.03.06.45` (even though 45 isn't on the list of affected versions). I also tried downloading from Tenda's official source as well as archive.org. I wasn't able to thoroughly check all these version, but none of them seem to reference `rzadmin`.

However, that's not to say I didn't find anything strange in `httpd`. While looking through the decompiled code I noticed something odd in the `check_password`. For some reason, in the `check_password` function there's a line that prints the password to the console. Now this wouldn't be odd to see this in an application being developed, but seeing it in production firmware is at best sloppy development and at worse an intentional vulnerability.

![check_password function](/blog/tenda/check_password_function.webp)

As you can see on the left line 29, check_password prints the password to the console every time it has to validate it. The true problem is that it prints the admin password, not the attempted password. This struck me as odd behavior in production software, but it's likely just leftover from development. The severity of this largely depends on where httpd's stdout actually goes on a running device. There's a big difference between logging it to the console which would require physical access to the router, and logging to a file that's reachable over LAN. Either way, this should likely be removed as logging the admin password is poor security posture.

## Conclusion

No patch, or plan for a patch has been released at the point of writing this. If you're wondering how you can protect yourself from this vulnerability in the meantime, CERT/CC recommends disabling remote management of the systems and changing the default LAN IP address to make it harder for automatic scanners from targeting the system. This doesn't offer any protection from insider threats as anyone on the same network can deliberately find and attack the router. However, until a patch to remove the backdoor has been released this is the best protection outside replacing the network devices.

Source: [https://kb.cert.org/vuls/id/213560](https://kb.cert.org/vuls/id/213560)

---

*Sources: The Hacker News, CERT/CC*