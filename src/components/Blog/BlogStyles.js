import styled from "styled-components";

export const Grid = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: repeat(2, 1fr);
  justify-items: center;
  row-gap: 64px;
  margin-top: 24px;
  margin-bottom: 40px;
`;

export const BlogCard = styled.div`
  border-radius: 10px;
  box-shadow: 3px 3px 20px rgba(80, 78, 78, 0.5);
  text-align: center;
  width: 400px;
  height: 550px;

  @media ${(props) => props.theme.breakpoints.sm} {
    width: 100%;
    height: initial;
  }
`;

export const TitleContent = styled.div`
  text-align: center;
  z-index: 20;
  width: 100%;
  color: #e4e6e7;
`;

export const HeaderThree = styled.h3`
  font-weight: 500;
  letter-spacing: 2px;
  color: #9cc9e3;
  padding: 0.5rem 0;
  font-size: ${(props) => (props.title ? "3rem" : "2rem")};
`;

export const Hr = styled.hr`
  width: 50px;
  height: 3px;
  margin: 20px auto;
  border: 0;
  background: #d0bb57;
`;

export const Img = styled.img`
  /* width: 100%;
	height: 100%; */
  width: 400px;
  height: 250px;
  object-fit: cover;
  overflow: hidden;
  @media ${(props) => props.theme.breakpoints.sm} {
    width: 100%;
  }
`;
export const CardInfo = styled.p`
  width: 100%;
  padding: 0 40px;
  color: #e4e6e7;
  height: 240px;
  font-style: 2rem;
  line-height: 24px;
  text-align: center;
  @media ${(props) => props.theme.breakpoints.sm} {
    padding: 0.3rem 1rem;
  }
`;
