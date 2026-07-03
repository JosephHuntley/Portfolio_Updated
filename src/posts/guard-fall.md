---
title: "GuardFall: When Shell-Guard Blocklists Aren't Enough"
date: "2026-07-02"
excerpt: "A look at Adversa AI's GuardFall research on shell-guard blocklist bypasses in AI agents, and what it means for anyone deploying agents with shell access."
coverImage: ""
tags: ["AI Security", "Research"]
---

Run echo r""m"" -rf ~/ in a bash shell. It prints rm -rf /root/. Not r""m"" — bash strips the empty quotes before anything else happens, and what's left is a perfectly normal rm -rf.  

That's the entire vulnerability. No zero-day, no memory corruption, nothing new. Just a shell quoting behavior that's been true since before most of us were born, and it's now enough to walk straight past the safety filters in 10 of the 11 most popular open-source AI coding agents.  
## The finding  

Adversa AI published research in late June naming this bypass class **GuardFall**. The core problem: most AI coding agents protect themselves from running dangerous shell commands with a blocklist, a filter that checks the command text against known-bad patterns like rm -rf before letting it run. The flaw is that the filter checks the command as *written*, while bash rewrites that text before actually executing it. Quotes get stripped, variables get expanded, command substitutions get evaluated all after the filter already made its decision.  

*The agents surveyed run shell commands with the operator's full account authority, SSH keys, cloud credentials, everything reachable from the home directory*. Point one of these agents at a booby-trapped repository, a poisoned README, or a malicious MCP server, and a hidden instruction can get the agent to emit a command that looks harmless to the filter and destructive to bash.  

Adversa tested eleven of the most-used open-source coding and computer-use agents. A group with roughly 755,000 combined GitHub stars, as of July 2026, against five bypass classes covering quote removal, $IFS expansion, command substitution, base64-piped-to-shell, and destructive argv flags on ordinary tools like find and dd. Ten failed. The only one that held up in its default mode, Continue, did it by actually tokenizing the command the way bash would before matching it, rather than pattern-matching on raw text.  

## Verifying it myself  
I wanted to see the core bypass the quote-removal trick for myself before writing about it, rather than taking the write-up at face value. Here's a plain bash shell on my linux box:  
![Lab Demo Bypass](/blog/guard-fall/lab-demo-quote-bypass.webp)

echo rm -rf ~/ prints rm -rf /root/, as expected. Then echo r""m"" -rf ~/ prints the exact same thing: rm -rf /root/. Two empty double-quote pairs sitting in the middle of the word rm, and bash treats them as if they were never there. A filter doing a literal string match for rm never sees rm in the input it sees r""m"", which looks nothing like the pattern it's watching for.  

What made this more interesting was checking whether an AI coding assistant itself understood this. I asked Aider directly about it, and it confidently told me the opposite of what my terminal had just shown:  
![Aider demo](/blog/guard-fall/aider-misjudges-bypass.webp)

Aider's summary stated flatly that r"m" isn't valid bash and would error out. That's wrong, my terminal output above proves it runs cleanly as rm. This is a small but pointed illustration of a point Adversa makes directly: the model itself isn't a reliable defense here. A direct "run rm -rf" gets refused by most models, but the same underlying command, dressed up differently, doesn't get correctly evaluated even when you ask the model to reason about it directly. If the AI assisting you can't correctly predict what bash will do with a quoted string, it's not in a position to gate whether that string is safe to execute.

## Why this isn't just a patch-one-thing bug  
Adversa's framing is that GuardFall isn't a single bug, it's a structural problem with an entire category of defense. Blocklists that string-match raw commands can't model what bash's parser does, so no amount of adding more patterns closes the gap. They grouped the ten failing agents into four architectural patterns: guards that exist but only check raw text (Hermes, opencode, Goose), guards that tokenize but still miss quoted substitutions and destructive flags (Cline, Roo-Code), agents that skip static checking entirely and rely on a human approval step that gets disabled by an auto-execute flag in CI (Aider, Plandex, Open Interpreter), and sandboxed agents that are safe by default but ship a documented "local mode" that removes the sandbox entirely (OpenHands, SWE-agent).

Continue was the exception. Instead of pattern-matching text, its evaluator tokenizes the command the way bash would, recursively evaluates command substitutions, flags variable expansion, checks where pipes terminate, and only then checks the result against a canonical list of destructive patterns. Adversa notes this design is portable  reimplementing it is roughly a two-day effort for an experienced engineer though it comes with a real cost: more prompts for benign commands, which is exactly the friction that pushes people toward the auto-execute flags that reopen the hole.  

## What this means if you're running any of these tools  
- If you're using an agent with an --auto-exec, --auto-run, --auto-test, or dangerously-skip-permissions flag turned on, understand that the "safety filter" underneath it is very likely a raw-text blocklist that this bypass class defeats completely.  
- Run agents with $HOME redirected to a throwaway directory. It's a one-line wrapper and it keeps your real SSH keys, cloud credentials, and shell history out of reach even if a command does slip through.  
- Don't let agents run unattended against pull requests from forks that's the easiest path from an attacker-controlled file to your secrets.  
- Treat repo-shipped config files (like .aider.conf.yml) as untrusted code. A malicious one can flip auto-execute behavior with no flag from you at all.  

## What’s Next?  
I plan to continue attempting to replicate the tests conducted by Adversa. I'll update this article if I discover any additional information or if my findings contradict Adversa's conclusions.  

The full research, including the complete bypass taxonomy and the agent-by-agent breakdown, is worth reading directly check out the link below.  
**Source:** [GuardFall: a universal shell injection vulnerability in open-source AI agents — Adversa AI, also covered by ](https://adversa.ai/blog/opensource-ai-coding-agents-shell-injection-vulnerability/ "https://adversa.ai/blog/opensource-ai-coding-agents-shell-injection-vulnerability/")[The Hacker News.](https://thehackernews.com/2026/06/guardfall-exposes-open-source-ai-coding.html "https://thehackernews.com/2026/06/guardfall-exposes-open-source-ai-coding.html")  
