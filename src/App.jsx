import { useRef } from 'react';
import Header from './components/header/Header';
import Theme from './styles/theme';
import BgAnimation from './components/BackgroundAnimation/BackgroundAnimation';
import { Section } from './styles/globalComponents';
import Hero from './components/hero/Hero';
import Projects from './components/projects/Projects';
import Technologies from './components/technologies/Technologies';
import Timeline from './components/timeline/TimeLine';
import Accomplishments from './components/accomplishments/Accomplishments';
import Footer from './components/footer/Footer';

function App() {
	const aboutRef = useRef(null);

	const aboutScroll = () => aboutRef.current.scrollIntoView();

	return (
		<Theme>
			<Header />
			<Section grid>
				<Hero aboutScroll={aboutScroll} />
				<BgAnimation />
			</Section>
			<Projects />
			<Technologies />
			<Timeline aboutRef={aboutRef} />
			<Accomplishments />
			<Footer />
		</Theme>
	);
}

export default App;
