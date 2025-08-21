import React, { useState } from "react";
import { DiCssdeck } from "react-icons/di";
import { Divide as Hamburger } from "hamburger-react";
import {
  Header,
  MenuStyle,
  Nav,
  Icons,
  Links,
  SocialIcons,
  DivBlur,
  NavLink,
} from "./MenuStyles";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Header>
        <a
          href="/"
          style={{ display: "flex", alignItems: "center", color: "white" }}
        >
          <DiCssdeck size="3rem" /> <span>Portfolio</span>
        </a>

        <Hamburger
          color="#fff"
          label="menu"
          toggled={isOpen}
          toggle={() => setIsOpen((prevState) => !prevState)}
        />
      </Header>
      {isOpen ? (
        <MenuStyle>
          <Nav>
            <Links>
              <li onClick={() => setIsOpen(false)}>
                <NavLink href="#projects">Projects</NavLink>
              </li>
              <li onClick={() => setIsOpen(false)}>
                <NavLink href="#tech">Technologies</NavLink>
              </li>
              <li onClick={() => setIsOpen(false)}>
                <NavLink href="#about">About</NavLink>
              </li>
              {/* <li onClick={() => setIsOpen(false)}>
                <NavLink href="#blog">Blog</NavLink> 
              </li>*/}
            </Links>
            <Icons>
              <SocialIcons
                href="https://github.com/JosephHuntley"
                target="_blank"
                aria-label="Check out my Github"
              >
                <AiFillGithub size="4.5rem" />
              </SocialIcons>
              <SocialIcons
                href="https://linkedin.com/in/joseph-huntley-187636196"
                target="_blank"
                aria-label="Check out my LinkedIn"
              >
                <AiFillLinkedin size="4.5rem" />
              </SocialIcons>
            </Icons>
          </Nav>
          <DivBlur />
        </MenuStyle>
      ) : null}
    </>
  );
};

export default Menu;
