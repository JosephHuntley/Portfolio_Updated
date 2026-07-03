import { useRef, lazy, Suspense, useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { BarLoader } from "react-spinners";
const Header = lazy(() => import("./components/header/Header"));
const Theme = lazy(() => import("./styles/theme"));
const Footer = lazy(() => import("./components/footer/Footer"));
const Blog = lazy(() => import("./components/Blog/Blog"));
const BlogPost = lazy(() => import("./components/Blog/BlogPost"));
const HomePage = lazy(() => import("./pages/HomePage"));
import useWindowSize from "./customHooks/useWindowSize";
import Menu from "./components/Menu/Menu";

function App() {
  const aboutRef = useRef(null);
  const [isMenu, setIsMenu] = useState(true); // Defaults to mobile view
  const { width } = useWindowSize();

  useEffect(() => {
    setIsMenu(width <= 1124);
  }, [width]);

  document.title =
    "Joseph Huntley | Cybersecurity Specialist | Aspiring Digital Forensics Professional | Malware Analysis Enthusiast";

  const aboutScroll = () => aboutRef.current.scrollIntoView();

  return (
    <Suspense fallback={<BarLoader color="#9cc9e3" />}>
      <Theme>
        {isMenu ? <Menu /> : <Header />}
        <Routes>
          <Route
            path="/"
            element={<HomePage aboutRef={aboutRef} aboutScroll={aboutScroll} />}
          />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
        </Routes>
        <Footer />
      </Theme>
    </Suspense>
  );
}

export default App;