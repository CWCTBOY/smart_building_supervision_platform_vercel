import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Profile from "./profile";
import ProjectInfo from "./projectInfo";

const AsideContainer = styled.aside`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 350px;
  height: 100vh;
  padding: 5px;
  background-color: ${({ theme }) => theme.colors.gray};
  animation: ${keyframes`
  from {
    transform: translateX(-350px);
  }
  to {
    transform: translateX(0);
  }
  `} 0.2s ease-in-out forwards;
  .title {
    font-size: ${({ theme }) => theme.fonts.size.large};
    font-weight: ${({ theme }) => theme.fonts.weight.bold};
    margin: 10px 0 20px 0;
  }
`;

const MainBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: calc(100vh - 70px);
`;

const SignOutButton = styled.button`
  width: 100%;
  height: 50px;
  background-color: rgba(0, 0, 0, 0.3);
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

/* <--> */

const GlobalAside = () => {
  const { pathname } = useLocation();
  const [curLoc, setCurLoc] = useState(pathname.split("/"));
  useEffect(() => {
    setCurLoc(pathname.split("/"));
  }, [pathname]);
  return (
    <AsideContainer>
      <span className="title">
        {curLoc[3] === "edit"
          ? "프로젝트 정보수정"
          : curLoc[2] === "new"
          ? "새로운 프로젝트 생성"
          : curLoc[3] === "virtualtour"
          ? "Virtual Tour"
          : curLoc[3] === "upload"
          ? "모델 업로드"
          : "모든 프로젝트"}
      </span>
      <MainBox>
        {(curLoc.length === 2 ||
          curLoc[3] === "edit" ||
          curLoc[2] === "new") && <Profile />}
        {curLoc[3] === "upload" && <ProjectInfo />}
      </MainBox>
      <SignOutButton
        onClick={() => {
          localStorage.removeItem("access_token");
          alert("로그아웃 되었습니다.");
          window.location.href = "/member/signin";
        }}
      >
        Sign Out
      </SignOutButton>
    </AsideContainer>
  );
};

export default GlobalAside;
