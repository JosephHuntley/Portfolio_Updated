---
title: "Your Smart TV Might Be Someone Else's Attack Infrastructure: Inside the NetNut/Popa Takedown"
date: "2026-07-06"
excerpt: "An overview of botnet proxies and the recent netnut (popa) malware"
coverImage: "/blog/netnut/netnutseizure.webp"
tags: ["Malware", "Botnet", "IoT"]
---

At least 2 million devices, quietly renting out home internet connections to criminal and espionage groups, run by a company listed on NASDAQ. That's the NetNut/Popa story, and it's a lot stranger than the usual "hacker crew gets domains seized" headline.

When most practitioners think of botnets they tend to think about DDoS attacks. A bunch of zombie machines focused on overloading a server and shutting down the service. However, botnets can have many uses, one of which is acting as proxies for malicious actors to hide their origin.

On July 2nd, the FBI and IRS Criminal Investigation, working alongside Google, Lumen, and the Shadowserver Foundation, seized hundreds of domains belonging to NetNut, a residential proxy service run by Alarum Technologies, a publicly traded Israeli company (NASDAQ: ALAR). NetNut's proxy network has been tied to Popa, a component that turned smart TVs, streaming boxes, and other consumer devices into proxy nodes. These proxies were then rented out to malicious actors who could use them to make their traffic look like it was coming from a legitimate residential source, the victim's IP, instead of known-bad hosting infrastructure.

The initial link between NetNut and Popa wasn't the FBI's discovery. Security researchers at Qurium, Synthient, and Spur published findings on June 19th connecting NetNut's infrastructure to the botnet, and journalist Brian Krebs reported on it before the seizure happened. The FBI action came about two weeks later. Google's Threat Intelligence Group (GTIG) did its own teardown of NetNut's backend, disabled Google accounts tied to its command-and-control, and pushed Play Protect updates to warn users and disable apps bundling NetNut's SDK. Worth keeping straight who did what: researchers found it, Google confirmed and mitigated it, the FBI and IRS-CI seized the domains.

## What is a Botnet, and How do they Work?

Unless you're new to cybersecurity you've likely heard the term botnet thrown around. The big scary threats that law enforcement seems to take down several times a year. But, what exactly is a botnet? At its core, a bot net is a large group of computers than an attacker can command, **usually from a C2 server.** Now the purpose of the botnet can vary greatly, below I list a few common uses:

- Distributed Denial of Service (DDoS)
- Cryptocurrency Mining
- Malware Distribution
- Large Scale Reconnaissance
- Proxies

There are more uses than this, and some may have multiple functions such as mine for bitcoin until they receive a command. Botnets begin at infection. There are many ways a device can be infected, a user could download a malicious software, it could be installed by an insider threat, or an attacker could rely on an unpatched exploit. The method doesn't matter as much as the fact than an attacker got software onto the system. At a corporate level, an EDR could be used to spot a suspicious program being installed. Some organizations use tools like ThreatLocker to enforce an allowlist before an application can run. However, this is also the reason why many botnets rely on personal devices.

The next step would be to register or make contact with the Command and Control (C2) server. This basically tells the C2 that this specific device exists and is ready to take commands. Now C2 servers come in many flavors and can be something as simple as a social media post, or more complex as encrypted messaging. Once registered the device just waits for a command. Usually it will check the C2 server every so often to know if a new command has been issued. During this step the botnet can be spotted in the network logs. If a device is trying to make a connection to a random domain every night, that's odd to say the least.

When the compromised device or zombie finally receives a command, **note the botnet could lie dormant for many years.**, every bot follows that command. This is where the power truly comes from and why a DDoS is much harder to deal with than a DoS. Having to defend against a single powerhouse is a lot easier than to defend against thousands of smart thermostats. How this step can be spotted largely depends on what type of command it is. An EDR can spot signs of data exfiltration or crypto mining, and network logs can be used to notice a DDoS. Finally, once the command is executed the device reports back to the C2 server. This can be anything from a confirmation, to exfiltrated data.

## Popa

Now that we refreshed on what a botnet is, let's go over what we know about the Popa botnet. It mainly affected devices running the Android operating system, this includes tablets and smartphones, as well as smart TVs and streaming boxes. Researchers found trojanized SDKs bundled into apps on major platforms too, not just obscure sideloads: nearly half of the LG webOS apps and over a quarter of the Samsung Tizen apps analyzed contained proxy SDKs that turned viewers' devices into traffic relays without meaningful consent. Devices would also become infected after installing what appeared to be legitimate software such as:

- Third-party streaming apps
- Pirated media apps
- Utility applications
- Some Android TV software

No matter the functionality, this software operated as a Trojan horse. Once installed, attackers would use these devices as proxies before carrying out malicious activities. Basically, this allowed the attackers' traffic to appear as if it was coming from the victim's network, making it harder to nail down.

It's worth being precise about what Popa actually is. Rather than being a full standalone piece of malware, researchers at Qurium described it as a networking/tunneling plugin layered on top of Vo1d, an existing large-scale Android TV box botnet that shares command-and-control infrastructure with Badbox 2.0. So NetNut wasn't building its own botnet from scratch, it was buying proxy capacity from an already-compromised device population and reselling it, white-labeled, to other proxy providers. GTIG observed 316 distinct threat clusters using suspected NetNut exit nodes in a single week in June 2026, including both cybercriminal and espionage groups running password-spraying, credential stuffing, ad fraud, and data scraping through those nodes.

Now you may be wondering where the C2 server plays into this. While it may be atypical since the server isn't launching large attacks, it still has a critical place. The C2 server is responsible for forming the connections between the attackers and proxies.

And this wasn't a fly-by-night criminal operation. NetNut is owned by Alarum Technologies, a company listed on NASDAQ. Alarum's legal counsel confirmed the seizure and said the company would cooperate with investigators. That's the part that should sit uncomfortably with defenders: a commercial, legally operating business built a residential proxy product on top of consumer devices that had no real path to giving informed consent.

## Conclusion

If you're wondering how to defend your device against becoming a zombie in a larger botnet, it basically comes down to having good cybersecurity hygiene. Don't install applications or payloads that aren't trustworthy such as applications allowing piracy. Stick to official app stores and Play Protect-certified Android TV devices where possible, since even legitimate-looking apps on major smart TV platforms were found carrying these SDKs. Make sure you're keeping your software updated and your vulnerabilities patched.

For defenders on the blue team side, this is also a detection story, not just a hygiene one. If you're seeing attacker traffic in your logs resolving to residential ISP ranges instead of known-bad hosting providers or VPS infrastructure, that's not automatically a "clean" source, it may be a proxy network like NetNut riding on someone's smart TV. Baseline what "normal" outbound traffic looks like for the device types on your network, and treat unexplained connections from consumer-grade or IoT devices to your environment as worth a second look, not noise to filter out.

---

*Sources: KrebsOnSecurity, Google Threat Intelligence Group, BleepingComputer, Qurium.*