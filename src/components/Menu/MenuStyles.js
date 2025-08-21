import styled from "styled-components";

export const Header = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 1.6rem;
  position: fixed;
  z-index: 10;

  background-color: ${(props) => props.theme.colors.background1};
`;

export const MenuStyle = styled.section`
  width: 100vw;
  height: 100vh;
  margin-top: 48px;

  background-color: ${(props) => props.theme.colors.background1};

  position: fixed;
  z-index: 5;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  overflow-x: hidden;
`;

export const Nav = styled.nav`
  height: calc(100% - 48px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.6rem;
  position: relative;
  z-index: 15;
`;

export const Links = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

export const Icons = styled.div`
  width: 50vw;
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

export const DivBlur = styled.div`
  width: 450px;
  height: 450px;
  border-radius: 9999px;
  opacity: 0.3;
  filter: blur(24px);

  background-color: ${(props) => props.theme.colors.accent2};

  position: absolute;
  z-index: 5;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const NavLink = styled.a`
  font-size: 2.5rem;
  color: ${(props) => props.theme.colors.text};
  transition: 0.4s ease;
  &:hover {
    color: #fff;
    opacity: 1;
    cursor: pointer;
  }
`;
