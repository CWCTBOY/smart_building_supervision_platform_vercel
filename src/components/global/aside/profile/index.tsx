import styled from "@emotion/styled";
import {
  MdRecentActors,
  MdOutlineConstruction,
  MdAssignment,
} from "react-icons/md";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px;
  background-color: white;
  border-radius: 5px;
  .header {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 5px;
    font-size: ${({ theme }) => theme.fonts.size.medium};
    font-weight: ${({ theme }) => theme.fonts.weight.bold};
    color: black;
    span {
      margin-left: 10px;
    }
  }
  .info_list {
    li {
      display: flex;
      align-items: center;
      &:first-of-type {
        margin-bottom: 5px;
      }
      span {
        margin-left: 10px;
      }
    }
  }
`;

const userInfo = {
  name: "김태훈",
  company: "설곽건설",
  classification: "건설사",
  assignedProject: 3,
};

const Profile = () => {
  // call the user information using the access token [fetch]
  const { name, company, classification, assignedProject } = userInfo;
  return (
    <Container>
      <div className="header">
        <MdRecentActors size={25} />
        <span>
          {company} {name}님
        </span>
      </div>
      <ul className="info_list">
        <li>
          <MdOutlineConstruction size={25} />
          <span>{classification}</span>
        </li>
        <li>
          <MdAssignment size={25} />
          <span>{assignedProject}개의 프로젝트 등록</span>
        </li>
      </ul>
    </Container>
  );
};

export default Profile;
