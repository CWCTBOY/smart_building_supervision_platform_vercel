import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import useApi from "../../../../../hooks/api/axiosInterceptor";
import { IUserType } from "../../../../../interface/userInterface";
import { useAdminOutletProps } from "../../../../../pages/others/companyAdmin";
import MemberInfo from "../newMember/memberInfo";

const CompanyMembersTable = styled.table`
  width: 100%;
  th {
    border: 1px solid black;
  }
`;

const CompanyMembers = () => {
  const {
    sessionInfo: {
      companyInfo: { companyId },
    },
  } = useAdminOutletProps();
  const [crewList, setCrewList] = useState<IUserType[]>();
  useEffect(() => {
    (async () => {
      try {
        const { data, status } = await useApi.get("/crew/all/authorized", {
          params: { companyId },
        });
        if (status === 200) {
          setCrewList(data);
          console.log(data);
        }
      } catch (e: any) {
        console.log(e);
      }
    })();
  }, []);
  return (
    <CompanyMembersTable>
      <thead>
        <tr>
          <th>id</th>
          <th>이름</th>
          <th>이메일</th>
          <th>전화번호</th>
          <th>분류</th>
          <th>계정정지</th>
          <th>계정삭제</th>
        </tr>
      </thead>
      <tbody>
        {crewList?.map(({ id, name, email, number, classification }) => (
          <MemberInfo
            key={id}
            id={id}
            name={name}
            email={email}
            number={number}
            classification={classification}
          />
        ))}
      </tbody>
    </CompanyMembersTable>
  );
};

export default CompanyMembers;
