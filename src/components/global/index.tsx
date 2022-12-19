import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { tokenChecker } from "../../hooks/auth/token";
import GlobalAside from "./aside";

const Container = styled.div<{ auth: boolean }>`
  display: flex;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.white};
  .outlet {
    display: flex;
    justify-content: center;
    width: ${({ auth }) => (auth ? "calc(100vw - 350px)" : "100vw")};
    height: 100vh;
    overflow: scroll;
    padding: 20px;
  }
`;

/* <--> */

const GlobalContainer = () => {
  const loc = useLocation();
  const nav = useNavigate();
  const [curLoc, setCurLoc] = useState(loc.pathname);
  const [auth, setAuth] = useState(!tokenChecker());
  useEffect(() => {
    setAuth(tokenChecker());
    setCurLoc(loc.pathname);
  }, []);
  useEffect(() => {
    if (!tokenChecker() && curLoc !== "/member/signin") {
      alert("세션이 만료되었습니다. 다시 로그인해주세요.");
      window.location.href = "/member/signin";
    }
  }, [curLoc]);
  return (
    <Container auth={auth}>
      <GlobalAside />
      <div className="outlet">
        <Outlet />
      </div>
    </Container>
  );
};

export default GlobalContainer;
