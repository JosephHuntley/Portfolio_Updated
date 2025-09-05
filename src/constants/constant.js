

export const projects = [
  {
    id: 4,
    title: "Corporate Network Simulation",
    description:
      "A simulated corporate network designed and deployed featuring core services such as Active Directory, database, and web servers. Enforcing network security policies through a pfSense firewall with traffic routing and filtering. Wazuh provided endpoint monitoring, log analysis, and real-time alerting of security incidents. The architecture includes dedicated VLANs for the DMZ, security, and internal corporate systems to reflect segmentation. Security Onion was integrated to deliver network intrusion detection and enable proactive threat hunting across segmented traffic.",
    tags: ["pfSense", "Wazuh", "Security Onion", "Active Directory"],
    source: "",
    visit: "",
  },
  {
  id: 7,
  title: "Mock Criminal Digital Forensic Investigation",
  description:
    "Conducted a simulated criminal investigation involving five evidence sources: Windows 8 system, Android phone, Android tablet, Windows memory dump, and drone media. Followed strict chain of custody procedures while verifying integrity through cryptographic hashing (MD5). Applied forensic tools including Autopsy, Magnet AXIOM, and Volatility to uncover stalking and harassment activity. Correlated artifacts across devices (browser history, memory artifacts, GPS metadata, social media accounts) to reconstruct suspect behavior and timeline of events. Produced a detailed client-ready forensic report with methodology, evidence findings, and legal compliance considerations.",
  tags: ["Autopsy", "Magnet AXIOM", "Volatility", "Android Forensics", "Memory Analysis"],
  source: "",
  visit: "",
},
  {
    id: 5,
    title: "Malware Analysis & Threat Hunting",
    description:
      "The Malware Analyst Lab consists of isolated virtual environments running REMnux (Linux) and FlareVM (Windows) to enable safe static and dynamic malware analysis. The lab includes tools such as ProcMon, Regshot, and Wireshark for monitoring malware processes, Windows Registry changes, and network activity. Memory forensics is performed using Volatility to detect indicators of compromise (IoCs) and analyze running processes, providing a controlled environment for comprehensive malware investigation and research.",
    tags: ["REMnux", "FlareVM", "ProcMon", "Regshot", "Wireshark"],
    source: "",
    visit: "",
  },
  {
  id: 6,
  title: "Anti-Forensics in Memory Research",
  description:
    "Authored a research paper analyzing attacker anti-forensics techniques in memory, such as code injection, artifact wiping, and encryption. Applied Volatility and memory dump analysis to evaluate detection strategies against advanced anti-forensic tactics. Produced academic findings with emphasis on investigative rigor, documentation, and forensic resilience.",
  tags: ["Volatility", "Memory Analysis", "Python", "Computer Forensics", "Reporting & Analysis"],
  source: "",
  visit: "",
},
{
    title: "Penetration Testing Environment",
    description:
      "The Red Team Lab consists of a controlled environment featuring Kali Linux, ParrotOS, and vulnerable targets such as DVWA, designed for practicing adversary emulation. The lab enables reconnaissance and vulnerability enumeration using tools like Nmap, and supports exploitation of application and service vulnerabilities with Metasploit to simulate gaining shell access and performing post-exploitation persistence. This setup provides a safe, hands-on environment for learning offensive security techniques.",
    tags: ["Kali", "Parrot", "DVWA", "Nmap", "Metasploit"],
    source: "",
    visit: "",
    id: 2,
  },
  
];

export const TimeLineData = [
  { year: 2019, text: "Began College, starting my journey into Cybersecurity" },
  { year: 2020, text: "Started Programming and Software Development" },
  {
    year: 2021,
    text: "Began Technical Apprenticeship in Software Development",
  },
  {
    year: 2022,
    text: "Earned AWS Certifications and expanded knowledge in Cloud Architecture",
  },
  {
    year: 2023,
    text: "Gained professional experience in Front-End Development",
  },
  {
    year: 2024,
    text: "Focused on Anti-Forensic Techniques in Memory and Incident Response research",
  },
  {
    year: 2025,
    text: "Continuing professional growth in Cybersecurity (to be updated…)",
  },
];
