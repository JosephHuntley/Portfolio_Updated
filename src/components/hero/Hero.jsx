import {
  Section,
  SectionText,
  SectionTitle,
} from "../../styles/globalComponents";
import Button from "../../styles/globalComponents/Button";
import { LeftSection } from "./HeroStyles";

const Hero = ({ aboutScroll }) => (
  <>
    <Section row nopadding>
      <LeftSection>
        <SectionTitle main center>
          Welcome To <br />
          My Personal Portfolio
        </SectionTitle>
        <SectionText>
          Experienced Front-End Developer transitioning into Cybersecurity.
          Proficient in blue team technologies and digital forensics, with a
          strong foundation in problem-solving, incident response, and memory
          analysis.
        </SectionText>
        <Button onClick={aboutScroll}>Learn More</Button>
      </LeftSection>
    </Section>
  </>
);

export default Hero;
