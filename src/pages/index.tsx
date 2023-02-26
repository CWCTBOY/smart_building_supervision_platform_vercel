import styled from "@emotion/styled";
import Content from "../components/main";
import { MdAddCircleOutline } from "react-icons/md";
import {
  Outlet,
  useLocation,
  useNavigate,
  useOutletContext,
} from "react-router-dom";
import { useOutletProps } from "../components/global";
import { ServiceRole } from "../type/RoleEnum";
import { useEffect, useState } from "react";
import useApi from "../hooks/api/axiosInterceptor";
import { IProjectType } from "../interface/projectInterface";
import { ISessionInfoType } from "../interface/userInterface";
import { projectCategorizer } from "../hooks/projectHooks";

const GridContainer = styled.div`
  width: 100%;
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(3, 3fr);
  .add {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 320px;
    border: 2px dotted ${({ theme }) => theme.colors.gray};
    border-radius: 10px;
    color: ${({ theme }) => theme.colors.gray};
    cursor: pointer;
    transition: all 0.2s linear;
    &:hover {
      color: black;
      border: 2px dotted black;
    }
    .desc {
      font-size: ${({ theme }) => theme.fonts.size.large};
    }
  }
`;
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const Main = () => {
  const nav = useNavigate();
  const { pathname } = useLocation();
  const { sessionInfo, projectInputName, projectCategory } = useOutletProps();
  const {
    userId,
    companyInfo: { companyId },
    role,
  } = sessionInfo;
  const [projectList, setProjectList] = useState<IProjectType[]>();
  useEffect(() => {
    (async () => {
      if (role === ServiceRole.COMPANY_ADMIN) {
        try {
          const { data, status } = await useApi.get("/project/all", {
            params: { companyId },
          });
          if (status === 200) {
            projectCategorizer(
              projectInputName,
              projectCategory,
              data,
              setProjectList
            );
          }
        } catch (e: any) {
          console.log(e);
        }
      } else {
        try {
          const { data, status } = await useApi.get(
            "/project/all/nonattendance",
            {
              params: { companyId, userId },
            }
          );
          if (status === 200) {
            projectCategorizer(
              projectInputName,
              projectCategory,
              data,
              setProjectList
            );
          }
        } catch (e: any) {
          console.log(e);
        }
      }
    })();
  }, [projectInputName, projectCategory]);
  return (
    <>
      {pathname === "/project" ? (
        <GridContainer>
          {role === ServiceRole.COMPANY_ADMIN && (
            <div
              className="add"
              onClick={() => {
                nav("/project/new");
              }}
            >
              <MdAddCircleOutline size={150} />
              <div className="desc">Add New Project</div>
            </div>
          )}
          {projectList?.reverse().map((projectData) => (
            <Content
              key={projectData.id}
              projectData={projectData}
              role={role}
              userId={userId}
              pathname={pathname}
            />
          ))}
        </GridContainer>
      ) : (
        <Container>
          <Outlet context={sessionInfo} />
        </Container>
      )}
    </>
  );
};

export const useInnerOutletProps = (): ISessionInfoType => {
  const sessionInfo = useOutletContext<ISessionInfoType>();
  if (!sessionInfo) {
    throw new Error("useOutletContext must be used within a OutletContext");
  }
  return sessionInfo;
};

export default Main;
