import styled from "@emotion/styled";
import BasicForm from "./basicForm";
import FileForm from "./fileForm";

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
  return (
    <AddNewForm>
      <div className="body">
        <BasicForm />
        <FileForm />
      </div>
      <SubmitBtn>프로젝트 등록하기</SubmitBtn>
    </AddNewForm>
  );
};

export default AddNewProjectForm;
