import styled from "@emotion/styled";
import Accordion from "./accordian";

const Container = styled.div`
  width: 100%;
`;

const { permit, etc } = {
  permit: {
    title: "승인 관리",
    contents: [
      {
        title: "신규 회원",
        navTo: "/admin/new-members",
      },
      {
        title: "프로젝트 참여요청",
        navTo: "/admin/participants-request",
      },
      {
        title: "프로젝트 열람요청",
        navTo: "/admin/read-request",
      },
    ],
  },
  etc: {
    title: "기타 서비스",
    contents: [
      {
        title: "회원 관리",
        navTo: "/admin/company-members",
      },
      {
        title: "프로젝트 관리",
        navTo: "/admin/company-projects",
      },
    ],
  },
};

const CompanyAdminAside = () => {
  return (
    <Container>
      {<Accordion data={permit} />}
      {<Accordion data={etc} />}
    </Container>
  );
};

export default CompanyAdminAside;
