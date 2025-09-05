import React from "react";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";
import { SiHackthebox } from "react-icons/si";

import { SocialIcons } from "../header/HeaderStyles";
import {
  CompanyContainer,
  FooterWrapper,
  LinkColumn,
  LinkItem,
  LinkList,
  LinkTitle,
  Slogan,
  SocialContainer,
  SocialIconsContainer,
} from "./FooterStyles";

const Footer = () => {
  return (
    <FooterWrapper>
      <LinkList>
        <LinkColumn>
          <LinkTitle>Call</LinkTitle>
          <LinkItem href="tel:810-620-9271">810-620-9271</LinkItem>
        </LinkColumn>
        <LinkColumn>
          <LinkTitle>Email</LinkTitle>
          <LinkItem href="mailto:Joseph.Huntley@outlook.com">
            Joseph.Huntley@outlook.com
          </LinkItem>
        </LinkColumn>
      </LinkList>
      <SocialIconsContainer>
        <CompanyContainer>
          <Slogan>Cybersecurity Specialist | Aspiring Digital Forensics Professional | Malware Analysis Enthusiast</Slogan>
        </CompanyContainer>
        <SocialContainer>
          <SocialIcons
            href="https://github.com/JosephHuntley"
            target="_blank"
            aria-label="Check out my Github"
          >
            <AiFillGithub size={32} />
          </SocialIcons>
          <SocialIcons
            href="https://linkedin.com/in/joseph-huntley-187636196"
            target="_blank"
            aria-label="Check out my LinkedIn"
          >
            <AiFillLinkedin size={32} />
          </SocialIcons>
          <SocialIcons href="https://app.hackthebox.com/profile/2520835">
            <SiHackthebox size={32} />
          </SocialIcons>
        </SocialContainer>
      </SocialIconsContainer>
    </FooterWrapper>
  );
};

export default Footer;
