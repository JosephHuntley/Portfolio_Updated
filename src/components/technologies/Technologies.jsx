import React from "react";
import { DiFirebase, DiReact, DiCss3Full } from "react-icons/di";
import {
  Section,
  SectionDivider,
  SectionText,
  SectionTitle,
} from "../../styles/globalComponents";
import {
  ImageContainer,
  List,
  ListContainer,
  ListItem,
  ListParagraph,
  ListTitle,
} from "./TechnologiesStyles";

const Technologies = () => (
  <Section id="tech">
    <SectionDivider divider />
    <SectionTitle>Technologies</SectionTitle>
    <SectionText nopadding>
      I've worked with a range a technologies in the web development world. From
      Back-end To Design
    </SectionText>
    <List>
      <ListItem>
        <ImageContainer>
          <DiReact size="3rem" />
        </ImageContainer>
        <ListContainer>
          <ListTitle>Front-End</ListTitle>
          <ListParagraph>
            React.js <br />
            Redux <br />
            JEST <br />
            NextJS <br />
            Typescript
            <br />
          </ListParagraph>
        </ListContainer>
      </ListItem>
      <ListItem>
        <ImageContainer>
          <DiFirebase size="3rem" />
        </ImageContainer>
        <ListContainer>
          <ListTitle>Back-End</ListTitle>
          <ListParagraph>
            NodeJS <br />
            ExpressJS
            <br />
            C#
            <br />
            .NET Core
            <br />
            SQL
            <br />
            MongoDB
          </ListParagraph>
        </ListContainer>
      </ListItem>
      <ListItem>
        <ImageContainer>
          <DiCss3Full size="3rem" />
        </ImageContainer>
        <ListContainer>
          <ListTitle>UI</ListTitle>
          <ListParagraph>
            CSS3
            <br />
            Tailwind
            <br />
            Chakra UI
            <br />
            Styled Component
          </ListParagraph>
        </ListContainer>
      </ListItem>
    </List>
    <SectionDivider colorAlt />
  </Section>
);

export default Technologies;
