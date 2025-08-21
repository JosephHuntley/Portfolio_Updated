import { SlMagnifier } from "react-icons/sl";
import { CiLock } from "react-icons/ci";
import { RiTerminalLine } from "react-icons/ri";
import {
  Section,
  SectionDivider,
  SectionText,
  SectionTitle,
} from "../../styles/globalComponents";
import {
  ImageContainer,
  List,
  ListContainer,
  ListItem,
  ListParagraph,
  ListTitle,
} from "./TechnologiesStyles";

const Technologies = () => (
  <Section id="tech">
    <SectionDivider divider />
    <SectionTitle>Technologies</SectionTitle>
    <SectionText nopadding>
      Worked with a range of cybersecurity technologies with a primary focus on
      Blue Team operations, while also testing Red Team techniques to build a
      complete, well-rounded understanding of the threat landscape.
    </SectionText>
    <List>
      <ListItem>
        <ImageContainer>
          <CiLock size={64} />
        </ImageContainer>
        <ListContainer>
          <ListTitle>Blue-Team</ListTitle>
          <ListParagraph>
            Firewall: pfSense
            <br />
            IDPS: Security Onion
            <br />
            SEIM: Wazuh <br />
            Hardening Systems <br />
            Bash & Python Scripting
            <br />
            Log Analysis
          </ListParagraph>
        </ListContainer>
      </ListItem>
      <ListItem>
        <ImageContainer>
          <SlMagnifier size={64} />
        </ImageContainer>
        <ListContainer>
          <ListTitle>Forensic</ListTitle>
          <ListParagraph>
            Memory Analysis: Volatile
            <br />
            Disk Imaging: FTK Imager <br />
            Disk Analysis: TSK & Autopsy
            <br />
            Malware Analysis
            <br />
            Timeline Analysis
          </ListParagraph>
        </ListContainer>
      </ListItem>
      <ListItem>
        <ImageContainer>
          <RiTerminalLine size={64} />
        </ImageContainer>
        <ListContainer>
          <ListTitle>Red-Team</ListTitle>
          <ListParagraph>
            Vulnerability Scanning: Nmap
            <br />
            Web Application Testing
            <br />
            Metasploit
          </ListParagraph>
        </ListContainer>
      </ListItem>
    </List>
    <SectionDivider colorAlt />
  </Section>
);

export default Technologies;
