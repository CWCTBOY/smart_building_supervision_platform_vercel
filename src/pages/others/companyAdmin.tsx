import styled from "@emotion/styled";
import { Outlet, useOutletContext } from "react-router-dom";
import { useOutletProps } from "../../components/global";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const CompanyAdmin = () => {
  const { sessionInfo } = useOutletProps();
  return (
    <Container>
      <Outlet context={{ sessionInfo }} />
    </Container>
  );
};

export const useAdminOutletProps = (): any => {
  const { sessionInfo } = useOutletContext<any>();
  if (!sessionInfo) {
    throw new Error("useOutletContext must be used within a OutletContext");
  }
  return { sessionInfo };
};

export default CompanyAdmin;
