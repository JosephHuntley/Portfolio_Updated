import { lazy } from "react";
import { Section } from "../styles/globalComponents";
const BgAnimation = lazy(() =>
  import("../components/BackgroundAnimation/BackgroundAnimation"),
);
const Hero = lazy(() => import("../components/hero/Hero"));
const Projects = lazy(() => import("../components/projects/Projects"));
const Technologies = lazy(() =>
  import("../components/technologies/Technologies"),
);
const Timeline = lazy(() => import("../components/timeline/TimeLine"));
const Accomplishments = lazy(() =>
  import("../components/accomplishments/Accomplishments"),
);
const Contact = lazy(() => import("../components/contact/Contact"));
import Blog from "../components/Blog/Blog";

const HomePage = ({ aboutRef, aboutScroll }) => (
  <>
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
  </>
);

export default HomePage;