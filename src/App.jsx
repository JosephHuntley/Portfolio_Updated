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
	return (
		<Theme>
			<Header />
			<Section grid>
				<Hero />
				<BgAnimation />
			</Section>
			<Projects />
			<Technologies />
			<Timeline />
			<Accomplishments />
			<Footer />
		</Theme>
	);
}

export default App;
