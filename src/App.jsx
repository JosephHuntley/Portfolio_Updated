import { useRef, lazy, Suspense } from 'react';
import { BarLoader } from 'react-spinners';
const Header = lazy(() => import('./components/header/Header'));
const Theme = lazy(() => import('./styles/theme'));
const BgAnimation = lazy(() =>
	import('./components/BackgroundAnimation/BackgroundAnimation')
);
import { Section } from './styles/globalComponents';
const Hero = lazy(() => import('./components/hero/Hero'));
const Projects = lazy(() => import('./components/projects/Projects'));
const Technologies = lazy(() =>
	import('./components/technologies/Technologies')
);
const Timeline = lazy(() => import('./components/timeline/TimeLine'));
const Accomplishments = lazy(() =>
	import('./components/accomplishments/Accomplishments')
);
const Footer = lazy(() => import('./components/footer/Footer'));
const Contact = lazy(() => import('./components/contact/Contact'));

function App() {
	const aboutRef = useRef(null);

	const aboutScroll = () => aboutRef.current.scrollIntoView();

	return (
		<Suspense fallback={<BarLoader color='#9cc9e3' />}>
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
		</Suspense>
	);
}

export default App;
