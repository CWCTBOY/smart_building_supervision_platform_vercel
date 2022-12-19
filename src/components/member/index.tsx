import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import bg_img from "../../assets/member/signin_bg.avif";
import logo from "../../assets/member/snust_main.png";
import { tokenChecker } from "../../hooks/auth/token";

const MemberContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  align-items: center;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  .bg_img {
    position: absolute;
    width: 100%;
  }
  .header {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    top: 20px;
    z-index: 2;
    .logo {
      width: 200px;
      margin-bottom: 20px;
    }
    .desc {
      font-size: ${({ theme }) => theme.fonts.size.large};
      font-weight: ${({ theme }) => theme.fonts.weight.bold};
    }
  }
`;

/* <--> */

const Container = styled.div<{ pathname: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: ${({ pathname }) =>
    pathname !== "/member/signin" ? "white" : "rgba(255, 255, 255, 0.5)"};
  z-index: 1;
  overflow: hidden;
  .form_box {
    position: absolute;
    top: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 360px;
    padding: 10px 0 10px 0;
    .title {
      font-size: 35px;
      font-weight: ${({ theme }) => theme.fonts.weight.regular};
      margin-bottom: 20px;
    }
  }
`;

const Member = () => {
  const { pathname } = useLocation();
  const [path, setPath] = useState(pathname);
  const navigate = useNavigate();
  useEffect(() => {
    tokenChecker() && navigate("/project");
  }, []);
  useEffect(() => {
    setPath(pathname);
  }, [pathname]);
  return (
    <MemberContainer>
      <img src={bg_img} alt="img" className="bg_img" />
      <div className="header">
        <img src={logo} alt="logo" className="logo" />
        <span className="desc">SMART BUILDING SUPERVISION PLATFORM</span>
      </div>
      <Container pathname={path}>
        <div className="form_box">
          <Outlet />
        </div>
      </Container>
    </MemberContainer>
  );
};

export default Member;
