import styled from "@emotion/styled";
import {
  MdLogout,
  MdOutlineAdminPanelSettings,
  MdPersonOutline,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { signOut } from "../../../../hooks/signHooks";
import { ServiceRole } from "../../../../type/RoleEnum";

const Container = styled.button`
  display: flex;
  justify-content: space-between;
  width: 100%;
  border: none;
  background-color: white;
  border-radius: 5px;
  .icon {
    color: rgba(0, 0, 0, 0.6);
    transition: all 0.2s ease-in-out;
    cursor: pointer;
    &:hover {
      color: black;
    }
  }
`;

const BottomBox = ({ role }: { role: ServiceRole }) => {
  const nav = useNavigate();
  const ICON_SIZE = 25;
  return (
    <Container>
      <MdLogout
        className="icon"
        size={ICON_SIZE}
        onClick={async () => {
          (await signOut()) && (window.location.href = "/member/signin");
        }}
      />
      {role === ServiceRole.COMPANY_ADMIN && (
        <MdOutlineAdminPanelSettings
          className="icon"
          size={ICON_SIZE}
          onClick={() => {
            nav("/admin/new-members");
          }}
        />
      )}
      <MdPersonOutline
        className="icon"
        size={ICON_SIZE}
        onClick={() => {
          console.log("마이 페이지");
        }}
      />
    </Container>
  );
};

export default BottomBox;
