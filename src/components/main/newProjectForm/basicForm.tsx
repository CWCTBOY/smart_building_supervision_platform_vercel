import styled from "@emotion/styled";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import useApi from "../../../hooks/api/axiosInterceptor";
import { IUserType } from "../../../interface/userInterface";
import { useInnerOutletProps } from "../../../pages";
import { FormContainer, Input, Select } from "../../../styles/common/textInput";
import addNewFormProperties from "./data";
import ManagerModal from "./managerModal";

const ManagerSearchInput = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  .search {
    width: 60px;
    height: 100%;
    margin-left: 5px;
    border-radius: 5px;
    background-color: #2e76b6;
    color: white;
    cursor: pointer;
    border: none;
  }
`;

/*<----->*/

const BasicForm = ({
  basicForm,
  setBasicForm,
}: {
  basicForm: any;
  setBasicForm: (basicForm: any) => void;
}) => {
  const isEdit = useLocation().pathname.split("/")[3] === "edit";
  const {
    companyInfo: { companyId },
  } = useInnerOutletProps();
  const [isManagerSelected, setIsManagerSelected] = useState(false);
  const [managerName, setManagerName] = useState("");
  const [managerData, setManagerData] = useState<IUserType[]>();
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBasicForm({ ...basicForm, [name]: value });
  };
  const onChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBasicForm({ ...basicForm, [name]: value });
  };
  const searchManager = async () => {
    if (managerName === "") {
      alert("담당자 이름을 입력해주세요");
      return;
    }
    try {
      const { data, status } = await useApi.get("/crew/company/name", {
        params: { companyId, crewName: managerName },
      });
      if (status === 200) {
        if (data.length === 0) {
          alert("해당 담당자가 없습니다.");
          return;
        }
        setManagerData(data);
        setIsManagerSelected(false);
      }
    } catch (error: any) {
      console.log(error);
    }
  };
  return (
    <FormContainer>
      {!isManagerSelected && managerData && (
        <ManagerModal
          managerData={managerData}
          basicForm={basicForm}
          setBasicForm={setBasicForm}
          setIsManagerSelected={setIsManagerSelected}
        />
      )}
      {addNewFormProperties.map(({ name, type, placeholder, options }) =>
        type === "select" ? (
          <Select key={name}>
            <span className="title">{placeholder}</span>
            <select
              name={name}
              onChange={onChangeSelect}
              required
              value={basicForm[name]}
            >
              <option value="none" disabled hidden>
                {name === "classification" ? "공사구분" : "세부 공사구분"}
              </option>
              {options?.map((option) => (
                <option value={option} key={option}>
                  {option}
                </option>
              ))}
            </select>
          </Select>
        ) : (
          <Input key={name}>
            <span className="title">{placeholder}</span>
            <input
              className="input"
              name={name}
              type={type}
              value={basicForm[name]}
              required
              onChange={onChangeInput}
            />
          </Input>
        )
      )}
      <Input>
        <span className="title">담당자 선택</span>
        <ManagerSearchInput>
          <input
            className="input"
            type="text"
            required={basicForm.managerId === 0}
            value={managerName}
            placeholder={
              isEdit ? "담당자를 재할당 해주세요" : "담당자 이름을 입력해주세요"
            }
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setManagerName(e.target.value)
            }
          />
          <button className="search" type="button" onClick={searchManager}>
            검색
          </button>
        </ManagerSearchInput>
      </Input>
    </FormContainer>
  );
};

export default BasicForm;
