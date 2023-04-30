import styled from "styled-components";

export const Header = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 1.6rem;
  position: fixed;
  z-index: 15;

  background-color: ${(props) => props.theme.colors.background1};
`;

export const MenuStyle = styled.section`
  width: 100vw;
  height: 100vh;
  margin-top: 48px;

  background-color: ${(props) => props.theme.colors.background1};

  position: fixed;
  z-index: 10;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const Nav = styled.nav`
  height: calc(100% - 48px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.6rem;
`;

export const Links = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

export const Icons = styled.div`
  width: 126px;
  display: flex;
  justify-content: space-between;
`;

export const SocialIcons = styled.a`
  transition: 0.3s ease;
  color: white;
  border-radius: 50px;
  &:hover {
    background-color: #212d45;
    transform: scale(1.2);
  }
`;
