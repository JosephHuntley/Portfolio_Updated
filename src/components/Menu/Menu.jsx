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
} from "./MenuStyles";
import { NavLink } from "../header/HeaderStyles";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Header>
      <a
        href="/"
        style={{ display: "flex", alignItems: "center", color: "white" }}
      >
        <DiCssdeck size="3rem" /> <span>Portfolio</span>
      </a>
      <div>
        <Hamburger
          color="#fff"
          label="menu"
          toggled={isOpen}
          toggle={() => setIsOpen((prevState) => !prevState)}
        />
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
              </Links>
              <Icons>
                <SocialIcons
                  href="https://github.com/JosephHuntley"
                  target="_blank"
                  aria-label="Check out my Github"
                >
                  <AiFillGithub size="3rem" />
                </SocialIcons>
                <SocialIcons
                  href="https://linkedin.com/in/joseph-huntley-187636196"
                  target="_blank"
                  aria-label="Check out my LinkedIn"
                >
                  <AiFillLinkedin size="3rem" />
                </SocialIcons>
              </Icons>
            </Nav>
          </MenuStyle>
        ) : null}
      </div>
    </Header>
  );
};

export default Menu;