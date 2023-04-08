import React from 'react';
import { AiFillGithub, AiFillInstagram, AiFillLinkedin } from 'react-icons/ai';

import { SocialIcons } from '../header/HeaderStyles';
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
} from './FooterStyles';

const Footer = () => {
	return (
		<FooterWrapper>
			<LinkList>
				<LinkColumn>
					<LinkTitle>Call</LinkTitle>
					<LinkItem href='tel:810-620-9271'>810-620-9271</LinkItem>
				</LinkColumn>
				<LinkColumn>
					<LinkTitle>Email</LinkTitle>
					<LinkItem href='mailto:Joseph.Huntley@outlook.com'>
						Joseph.Huntley@outlook.com
					</LinkItem>
				</LinkColumn>
			</LinkList>
			<SocialIconsContainer>
				<CompanyContainer>
					<Slogan>Passionate React Developer</Slogan>
				</CompanyContainer>
				<SocialContainer>
					<SocialIcons
						href='https://github.com/JosephHuntley'
						target='_blank'
						aria-label='Check out my Github'>
						<AiFillGithub size='3rem' />
					</SocialIcons>
					<SocialIcons
						href='https://linkedin.com/in/joseph-huntley-187636196'
						target='_blank'
						aria-label='Check out my LinkedIn'>
						<AiFillLinkedin size='3rem' />
					</SocialIcons>
					{/* <SocialIcons href='https://google.com'>
						<AiFillInstagram size='3rem' />
					</SocialIcons> */}
				</SocialContainer>
			</SocialIconsContainer>
		</FooterWrapper>
	);
};

export default Footer;
