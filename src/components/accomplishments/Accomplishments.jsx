import React from "react";

import {
  Section,
  SectionDivider,
  SectionTitle,
} from "../../styles/globalComponents";
import { Box, Boxes, BoxNum, BoxText } from "./AccomplishmentsStyles";

const data = [
  { number: 3, text: `Security Labs Built & Tested` },
  { number: 100, text: "Hours in Digital Forensics & Memory Analysis" },
  { number: 4, text: "Years of Experience in Technology" },
];

const Accomplishments = () => (
  <Section>
    <SectionTitle>Personal Achievements</SectionTitle>
    <Boxes>
      {data.map((card, index) => (
        <Box key={index}>
          {card.number && <BoxNum>{`${card.number}+`}</BoxNum>}
          <BoxText>{card.text}</BoxText>
        </Box>
      ))}
    </Boxes>
    <SectionDivider />
  </Section>
);

export default Accomplishments;
