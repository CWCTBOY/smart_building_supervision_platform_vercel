import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import {
  Outlet,
  useLocation,
  useNavigate,
  useOutletContext,
} from "react-router-dom";
import useApi from "../../hooks/api/axiosInterceptor";
import { ProjectClassType } from "../../interface/projectInterface";
import { ISessionInfoType } from "../../interface/userInterface";
import GlobalAside from "./aside";
import GlobalHeader from "./header";

const Container = styled.div<{ loc: boolean }>`
  position: relative;
  display: flex;
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.white};
  .outlet {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: calc(100vw - 350px);
    height: 100vh;
    overflow-y: scroll;
    padding: ${({ loc }) => (loc ? "60px 0 0 0" : "80px 20px 20px 20px")};
  }
`;

/* <--> */

const GlobalContainer = () => {
  const loc = useLocation();
  const nav = useNavigate();
  const [sessionInfo, setSessionInfo] = useState<ISessionInfoType>();
  const [projectInputName, setProjectInputName] = useState("");
  const [projectCategory, setProjectCategory] = useState<ProjectClassType>({
    constructionClass: "none",
    detailConstructionClass: "none",
  });
  useEffect(() => {
    (async () => {
      try {
        const { data, status } = await useApi.get<ISessionInfoType>(
          "/session-info"
        );
        if (status === 200) {
          setSessionInfo(data);
        }
      } catch (error: any) {
        const { status } = error.response;
        if (status === 401) {
          alert("세션이 만료되었습니다.");
          nav("/member/signin");
        }
        if (status === 403) {
          alert("접근 권한이 없습니다.");
          nav("/member/signin");
        }
        if (status === 404) {
          alert("다시 로그인을 해주세요.");
          nav("/member/signin");
        }
      }
    })();
  }, [loc.pathname]);
  return (
    <Container loc={loc.pathname.includes("virtualtour")}>
      {sessionInfo && (
        <>
          <GlobalAside sessionInfo={sessionInfo} />
          <div className="outlet">
            <GlobalHeader
              setProjectInputName={setProjectInputName}
              projectCategory={projectCategory}
              setProjectCategory={setProjectCategory}
            />
            <Outlet
              context={{ sessionInfo, projectInputName, projectCategory }}
            />
          </div>
        </>
      )}
    </Container>
  );
};

export const useOutletProps = (): any => {
  const { sessionInfo, projectInputName, projectCategory } =
    useOutletContext<any>();
  if (!sessionInfo) {
    throw new Error("useOutletContext must be used within a OutletContext");
  }
  return { sessionInfo, projectInputName, projectCategory };
};

export default GlobalContainer;
