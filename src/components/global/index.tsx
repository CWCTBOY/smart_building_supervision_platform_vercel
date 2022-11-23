import styled from "@emotion/styled";
import React from "react";
import GlobalHeader from "./header";

const globalWidth = 1350;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.white};
  overflow: scroll;
  .body {
    width: ${globalWidth}px;
    min-height: 100vh;
    background-color: gray;
  }
`;

const GlobalContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container>
      <div className="body">
        <GlobalHeader></GlobalHeader>
        {children}
      </div>
    </Container>
  );
};

export default GlobalContainer;
