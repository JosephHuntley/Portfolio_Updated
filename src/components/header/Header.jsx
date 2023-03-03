import { AiFillGithub, AiFillInstagram, AiFillLinkedin } from 'react-icons/ai';
import { DiCssdeck } from 'react-icons/di';

import {
	Container,
	Div1,
	Div2,
	Div3,
	NavLink,
	SocialIcons,
} from './HeaderStyles';

const Header = () => {
	return (
		<Container>
			<Div1>
				<a
					href='/'
					style={{ display: 'flex', alignItems: 'center', color: 'white' }}>
					<DiCssdeck size='3rem' /> <span>Portfolio</span>
				</a>
			</Div1>
			<Div2>
				<NavLink href='#projects'>Projects</NavLink>

				<NavLink href='#tech'>Technologies</NavLink>

				<NavLink href='#about'>About</NavLink>
			</Div2>
			<Div3>
				<SocialIcons
					href='https://github.com/JosephHuntley'
					target='_blank'
					aria-label='Check out my Github'>
					<AiFillGithub size='3rem' />
				</SocialIcons>
				<SocialIcons
					href='www.linkedin.com/in/joseph-huntley-187636196'
					target='_blank'
					aria-label='Check out my LinkedIn'>
					<AiFillLinkedin size='3rem' />
				</SocialIcons>
				{/* <SocialIcons href='https://google.com'>
					<AiFillInstagram size='3rem' />
				</SocialIcons> */}
			</Div3>
		</Container>
	);
};

export default Header;
