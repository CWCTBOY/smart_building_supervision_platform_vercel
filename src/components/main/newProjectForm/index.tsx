import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import useApi from "../../../hooks/api/axiosInterceptor";
import { useInnerOutletProps } from "../../../pages";
import { ServiceRole } from "../../../type/RoleEnum";
import BasicForm from "./basicForm";
import FileForm from "./fileForm";
import basicFormValidater from "./ProjectFormValidater";

const AddNewForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  .body {
    display: flex;
  }
`;

const SubmitBtn = styled.button`
  width: 100%;
  height: 50px;
  background-color: #2e76b6;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: ${({ theme }) => theme.fonts.size.small};
  color: ${({ theme }) => theme.colors.white};
  margin-top: 10px;
`;

const AddNewProjectForm = () => {
  const {
    companyInfo: { companyId },
    role,
  } = useInnerOutletProps();
  if (!(role === ServiceRole.COMPANY_ADMIN)) {
    alert("프로젝트 생성 권한이 없습니다.");
    window.history.back();
  }
  const [basicForm, setBasicForm] = useState({
    name: "",
    companyId,
    managerId: 0,
    startDate: "",
    endDate: "",
    constructionClass: "",
    detailConstructionClass: "",
  });
  const [fileForm, setFileForm] = useState({
    floorPlan: null,
    thumbnail: null,
  });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const req = {
      ...basicForm,
      ...fileForm,
    };
    if (!basicFormValidater(req)) {
      return alert("입력값을 확인해주세요.");
    }
    try {
      const { status } = await useApi.post("/project/new", req);
      if (status === 201) {
        alert("프로젝트가 등록되었습니다.");
        window.location.href = `/project`;
      }
    } catch (e: any) {
      const { status } = e.response;
      if (status >= 400) {
        alert("프로젝트 생성에 실패하였습니다.");
      }
    }
  };
  useEffect(() => {});
  return (
    <AddNewForm onSubmit={handleSubmit}>
      <div className="body">
        <BasicForm basicForm={basicForm} setBasicForm={setBasicForm} />
        <FileForm fileForm={fileForm} setFileForm={setFileForm} />
      </div>
      <SubmitBtn>프로젝트 등록하기</SubmitBtn>
    </AddNewForm>
  );
};

export default AddNewProjectForm;
