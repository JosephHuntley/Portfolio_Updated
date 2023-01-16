import React from 'react';

import {
	Section,
	SectionDivider,
	SectionTitle,
} from '../../styles/globalComponents';
import { Box, Boxes, BoxNum, BoxText } from './AccomplishmentsStyles';

const data = [
	{ number: 8, text: 'Certifications' },
	{ number: 300, text: 'Hours Coding' },
	{ number: 3, text: 'Years Experience' },
];

const Accomplishments = () => (
	<Section>
		<SectionTitle>Personal Achievements</SectionTitle>
		<Boxes>
			{data.map((card, index) => (
				<Box key={index}>
					<BoxNum>{`${card.number}+`}</BoxNum>
					<BoxText>{card.text}</BoxText>
				</Box>
			))}
		</Boxes>
		<SectionDivider />
	</Section>
);

export default Accomplishments;
