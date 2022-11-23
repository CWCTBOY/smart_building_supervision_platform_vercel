import styled from "@emotion/styled";

const HeaderContainer = styled.nav`
  width: 100%;
  height: 90px;
  background-color: ${({ theme }) => theme.colors.black};
`;

const GlobalHeader = () => {
  return <HeaderContainer></HeaderContainer>;
};

export default GlobalHeader;
