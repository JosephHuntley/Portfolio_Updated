import { useRef, lazy, Suspense, useState, useEffect } from "react";
import { BarLoader } from "react-spinners";
const Header = lazy(() => import("./components/header/Header"));
const Theme = lazy(() => import("./styles/theme"));
const BgAnimation = lazy(() =>
  import("./components/BackgroundAnimation/BackgroundAnimation"),
);
import { Section } from "./styles/globalComponents";
const Hero = lazy(() => import("./components/hero/Hero"));
const Projects = lazy(() => import("./components/projects/Projects"));
const Technologies = lazy(() =>
  import("./components/technologies/Technologies"),
);
const Timeline = lazy(() => import("./components/timeline/TimeLine"));
const Accomplishments = lazy(() =>
  import("./components/accomplishments/Accomplishments"),
);
const Footer = lazy(() => import("./components/footer/Footer"));
const Contact = lazy(() => import("./components/contact/Contact"));
import useWindowSize from "./customHooks/useWindowSize";
import Menu from "./components/Menu/Menu";
import Blog from "./components/Blog/Blog";

function App() {
  const aboutRef = useRef(null);
  const [isMenu, setIsMenu] = useState(true); // Defaults to mobile view
  const { width } = useWindowSize();

  useEffect(() => {
    setIsMenu(width <= 1124);
  }, [width]);

  document.title = "Joseph Huntley | .NET & React Specialist";

  const aboutScroll = () => aboutRef.current.scrollIntoView();

  return (
    <Suspense fallback={<BarLoader color="#9cc9e3" />}>
      <Theme>
        {isMenu ? <Menu /> : <Header />}
        <Section grid>
          <Hero aboutScroll={aboutScroll} />
          <BgAnimation />
        </Section>
        <Projects />
        <Technologies />
        <Timeline aboutRef={aboutRef} />
        <Accomplishments />
        <Blog />
        <Contact />
        <Footer />
      </Theme>
    </Suspense>
  );
}

export default App;
