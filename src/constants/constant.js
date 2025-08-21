import img1 from "/Restaurant.webp";
import img2 from "/GymExercises.webp";
import img3 from "/FinanceFlow.webp";
import img4 from "/Cryptoverse.webp";
import img5 from "/Nexus.webp";
import img6 from "/ZenithUI.webp";

export const projects = [
  {
    id: 4,
    title: "Blue Team Lab",
    description:
      "A simulated corporate network designed and deployed featuring core services such as Active Directory, database, and web servers. Enforcing network security policies through a pfSense firewall with traffic routing and filtering. Wazuh provided endpoint monitoring, log analysis, and real-time alerting of security incidents. The architecture includes dedicated VLANs for the DMZ, security, and internal corporate systems to reflect segmentation. Security Onion was integrated to deliver network intrusion detection and enable proactive threat hunting across segmented traffic.",
    image: img5,
    tags: ["pfSense", "Wazuh", "Security Onion", "Active Directory"],
    source: "",
    visit: "",
  },
  {
    id: 5,
    title: "Malware Analyst Lab",
    description:
      "The Malware Analyst Lab consists of isolated virtual environments running REMnux (Linux) and FlareVM (Windows) to enable safe static and dynamic malware analysis. The lab includes tools such as ProcMon, Regshot, and Wireshark for monitoring malware processes, Windows Registry changes, and network activity. Memory forensics is performed using Volatility to detect indicators of compromise (IoCs) and analyze running processes, providing a controlled environment for comprehensive malware investigation and research.",
    image: img6,
    tags: ["REMnux", "FlareVM", "ProcMon", "Regshot", "Wireshark"],
    source: "",
    visit: "",
  },
  {
    title: "Red Team Lab",
    description:
      "The Red Team Lab consists of a controlled environment featuring Kali Linux, ParrotOS, and vulnerable targets such as DVWA, designed for practicing adversary emulation. The lab enables reconnaissance and vulnerability enumeration using tools like Nmap, and supports exploitation of application and service vulnerabilities with Metasploit to simulate gaining shell access and performing post-exploitation persistence. This setup provides a safe, hands-on environment for learning offensive security techniques.",
    image: img3,
    tags: ["Kali", "Parrot", "DVWA", "Nmap", "Metasploit"],
    source: "",
    visit: "",
    id: 2,
  },
  // {
  //   title: "Restaurant Landing Page",
  //   description:
  //     "This is a responsive landing page designed to optimize user engagement and conversion. It was built using TypeScript, ReactJS, and Tailwind CSS, ensuring high performance, full responsiveness, and a visually-appealing design. I have the expertise to deliver similar results for any project using these modern front-end technologies.",
  //   image: img1,
  //   tags: ["React", "Tailwind", "Typescript"],
  //   source: "https://github.com/JosephHuntley/restaurant",
  //   visit: "https://josephhuntley.github.io/restaurant/",
  //   id: 0,
  // },
  // {
  //   title: "Gym Exercises",
  //   description:
  //     "This responsive webpage allows users to search for popular exercises and corresponding demonstration videos. It utilizes exerciseDB and YouTube Search API from RapidAPI to filter exercises by muscle group and save favorites for easy access. Built with modern front-end technologies, it is optimized for all screen sizes and offers a seamless user experience.",
  //   image: img2,
  //   tags: ["React", "Material UI"],
  //   source: "https://github.com/JosephHuntley/gym_exercises",
  //   visit: "https://josephhuntley.github.io/gym_exercises/",
  //   id: 1,
  // },
  // {
  //   title: "CryptoNexus",
  //   description:
  //     "This project is a dashboard for cryptocurrency, powered by Coinranking and Bing News Search API. Built using React, Redux, and Ant Design, it provides an overview of the current prices and performance of major cryptocurrencies, as well as the latest news and articles related to the crypto market. It showcases the ability to integrate multiple APIs and create a functional and user-friendly dashboard.",
  //   image: img4,
  //   tags: ["React", "Ant Design", "Redux"],
  //   source: "https://github.com/JosephHuntley/CryptoNexus",
  //   visit: "https://josephhuntley.github.io/CryptoNexus/",
  //   id: 3,
  // },
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
