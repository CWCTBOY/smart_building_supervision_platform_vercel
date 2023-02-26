import styled from "@emotion/styled";
import { useLocation } from "react-router-dom";
import { ProjectClassType } from "../../../interface/projectInterface";
import CategorySelector from "./CategorySelector";

const Container = styled.header`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  padding: 15px 20px;
  width: calc(100vw - 350px);
  height: 60px;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: rgba(0, 0, 0, 0.3) 0px 2px 4px 0px;
`;

const GlobalHeader = ({
  projectCategory,
  setProjectInputName,
  setProjectCategory,
}: {
  projectCategory: ProjectClassType;
  setProjectInputName: (projectInputName: string) => void;
  setProjectCategory: (projectCategory: ProjectClassType) => void;
}) => {
  const pathname = useLocation().pathname;
  return (
    <Container>
      {(pathname === "/admin/company-projects" || pathname === "/project") && (
        <CategorySelector
          setProjectInputName={setProjectInputName}
          projectCategory={projectCategory}
          setProjectCategory={setProjectCategory}
        />
      )}
    </Container>
  );
};

export default GlobalHeader;
