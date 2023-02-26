import styled from "@emotion/styled";
import { FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useApi from "../../../hooks/api/axiosInterceptor";
import { getProject } from "../../../hooks/projectHooks";
import { useInnerOutletProps } from "../../../pages";
import BasicForm from "../newProjectForm/basicForm";
import FileForm from "../newProjectForm/fileForm";
import basicFormValidater from "../newProjectForm/ProjectFormValidater";

const EditForm = styled.form`
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

const EditNewProjectForm = () => {
  const {
    companyInfo: { companyId },
  } = useInnerOutletProps();
  const { id: projectId } = useParams();
  const [basicForm, setBasicForm] = useState({
    name: "",
    companyId: 0,
    managerId: 0,
    startDate: "",
    endDate: "",
    participants: null,
    constructionClass: "",
    detailConstructionClass: "",
  });
  const [fileForm, setFileForm] = useState({
    floorPlan: null,
    thumbnail: null,
  });
  useEffect(() => {
    if (projectId) {
      (async () => {
        await getProject(
          parseInt(projectId),
          basicForm,
          fileForm,
          setBasicForm,
          setFileForm,
          companyId
        );
      })();
    }
  }, []);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const req = {
      ...basicForm,
      ...fileForm,
    };
    if (!basicFormValidater(req)) {
      return alert("입력값을 확인해주세요.");
    }
    try {
      const { status } = await useApi.put(`/project/edit/${projectId}`, req);
      if (status === 200) {
        alert("프로젝트 수정에 성공했습니다.");
        window.location.href = `/project`;
      }
    } catch (e) {
      alert("프로젝트 수정에 실패했습니다.");
    }
  };
  return (
    <EditForm onSubmit={handleSubmit}>
      <div className="body">
        <BasicForm basicForm={basicForm} setBasicForm={setBasicForm} />
        <FileForm fileForm={fileForm} setFileForm={setFileForm} />
      </div>
      <SubmitBtn>프로젝트 수정하기</SubmitBtn>
    </EditForm>
  );
};

export default EditNewProjectForm;
