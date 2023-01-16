import {
	Section,
	SectionText,
	SectionTitle,
} from '../../styles/globalComponents';
import Button from '../../styles/GlobalComponents/Button';
import { LeftSection } from './HeroStyles';

const Hero = (props) => (
	<>
		<Section
			row
			nopadding>
			<LeftSection>
				<SectionTitle
					main
					center>
					Welcome To <br />
					My Personal Portfolio
				</SectionTitle>
				<SectionText>
					Experienced Front-End Developer with over three years of experience in
					HTML, CSS, JavaScript, and ReactJS. Proficient in design frameworks
					such as MaterialUI and TailwindCSS.
				</SectionText>
				<Button onclick="window.location.href='#about';">Learn More</Button>
			</LeftSection>
		</Section>
	</>
);

export default Hero;
