import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ISessionInfoType } from "../../../interface/userInterface";
import Profile from "./profile";
import ProjectInfo from "./projectInfo";
import company_logo from "../../../assets/company_logo.png";
import BottomBox from "./bottom";
import CompanyAdminAside from "./admin/company";

const AsideContainer = styled.aside`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 350px;
  height: 100vh;
  padding: 20px 10px 5px 10px;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 2px 4px 0px;
  background-color: ${({ theme }) => theme.colors.white};
  z-index: 2;
  animation: ${keyframes`
  from {
    transform: translateX(-350px);
  }
  to {
    transform: translateX(0);
  }
  `} 0.2s ease-in-out forwards;
  .company_logo {
    width: 100%;
    cursor: pointer;
    margin-bottom: 30px;
    .logo {
      width: 50%;
    }
  }
`;

const MainBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: calc(100vh - 70px);
`;

/* <--> */

const GlobalAside = ({ sessionInfo }: { sessionInfo: ISessionInfoType }) => {
  const { role, userId } = sessionInfo;
  const { pathname } = useLocation();
  const [curLoc, setCurLoc] = useState(pathname.split("/"));
  useEffect(() => {
    setCurLoc(pathname.split("/"));
  }, [pathname]);

  return (
    <AsideContainer>
      <div
        className="company_logo"
        onClick={() => {
          window.location.href = "/project";
        }}
      >
        <img className="logo" src={company_logo} alt="company_logo" />
      </div>
      <MainBox>
        {(curLoc.length === 2 ||
          curLoc[3] === "edit" ||
          curLoc[2] === "new") && <Profile userId={userId} />}
        {curLoc[3] === "upload" && <ProjectInfo />}
        {curLoc[1] === "admin" && <CompanyAdminAside />}
      </MainBox>
      <BottomBox role={role} />
    </AsideContainer>
  );
};

export default GlobalAside;
