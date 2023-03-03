import { useRef, lazy } from 'react';
import Header from './components/header/Header';
import Theme from './styles/theme';
const BgAnimation = lazy(() =>
	import('./components/BackgroundAnimation/BackgroundAnimation')
);
import { Section } from './styles/globalComponents';
import Hero from './components/hero/Hero';
const Projects = lazy(() => import('./components/projects/Projects'));
const Technologies = lazy(() =>
	import('./components/technologies/Technologies')
);
const Timeline = lazy(() => import('./components/timeline/TimeLine'));
const Accomplishments = lazy(() =>
	import('./components/accomplishments/Accomplishments')
);
import Footer from './components/footer/Footer';
import Contact from './components/contact/Contact';

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
			<Contact />
			<Footer />
		</Theme>
	);
}

export default App;
