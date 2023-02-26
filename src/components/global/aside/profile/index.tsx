import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import {
  MdRecentActors,
  MdOutlineConstruction,
  MdAssignment,
} from "react-icons/md";
import useApi from "../../../../hooks/api/axiosInterceptor";
import { IUserType } from "../../../../interface/userInterface";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
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

const Profile = ({ userId }: { userId: number }) => {
  const [userInfo, setUserInfo] = useState<IUserType>();
  useEffect(() => {
    (async () => {
      try {
        const { data, status } = await useApi.get("/crew/one", {
          params: { crewId: userId },
        });
        if (status === 200) {
          setUserInfo(data);
        }
      } catch (err: any) {
        console.log(err);
      }
    })();
  }, []);
  if (!userInfo) return null;
  const {
    name,
    classification,
    companyInfo: { companyName },
  } = userInfo;
  return (
    <Container>
      <div className="header">
        <MdRecentActors size={25} />
        <span>
          {companyName} {name}님
        </span>
      </div>
      <ul className="info_list">
        <li>
          <MdOutlineConstruction size={25} />
          <span>{classification}</span>
        </li>
        <li>
          <MdAssignment size={25} />
          <span>{20}개의 프로젝트 등록</span>
        </li>
      </ul>
    </Container>
  );
};

export default Profile;
