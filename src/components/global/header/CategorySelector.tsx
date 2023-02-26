import styled from "@emotion/styled";
import { useState } from "react";
import { MdSearch, MdRestartAlt } from "react-icons/md";
import { ProjectClassType } from "../../../interface/projectInterface";

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  .reset {
    width: 38px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    cursor: pointer;
    color: rgba(0, 0, 0, 0.3);
    transition: all 0.2s ease-in-out;
    &:hover {
      color: black;
    }
  }
`;

const SearchByClassBox = styled.div`
  height: 100%;
  margin-right: 10px;
  .selector {
    width: inherit;
    height: 100%;
    border: none;
    &:focus {
      outline: none;
    }
  }
`;

const SearchByNameBox = styled.form`
  display: flex;
  width: 170px;
  height: 100%;
  border-bottom: 2px solid rgba(0, 0, 0, 0.3);
  margin-right: 10px;
  .search_by_name_input {
    width: inherit;
    height: 100%;
    padding: 0;
    border: none;
    &:focus {
      outline: none;
    }
  }
  .search_by_name_btn {
    width: 38px;
    height: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    border: none;
    background-color: transparent;
    cursor: pointer;
  }
`;

const CategorySelector = ({
  setProjectInputName,
  projectCategory,
  setProjectCategory,
}: {
  projectCategory: ProjectClassType;
  setProjectInputName: (projectInputName: string) => void;
  setProjectCategory: (projectCategory: ProjectClassType) => void;
}) => {
  const [projectName, setProjectName] = useState("");
  const onChangeCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProjectCategory({ ...projectCategory, [name]: value });
  };
  return (
    <Container>
      <SearchByNameBox
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          if (projectName === "") {
            alert("검색어를 입력해주세요");
            return;
          }
          setProjectInputName(projectName);
        }}
      >
        <input
          className="search_by_name_input"
          type="text"
          placeholder="프로젝트명으로 검색"
          onChange={(e) => setProjectName(e.target.value)}
        />
        <button className="search_by_name_btn">
          <MdSearch size={20} />
        </button>
      </SearchByNameBox>
      <SearchByClassBox>
        <select
          name="constructionClass"
          className="selector"
          onChange={(e) => {
            onChangeCategory(e);
          }}
        >
          <option value="none">공사구분 (전체)</option>
          <option value="건축공사">건축공사</option>
          <option value="토목공사">토목공사</option>
          <option value="플랜트공사">플랜트공사</option>
          <option value="조경공사">조경공사</option>
        </select>
      </SearchByClassBox>
      <SearchByClassBox>
        <select
          name="detailConstructionClass"
          className="selector"
          onChange={(e) => {
            onChangeCategory(e);
          }}
        >
          <option value="none">세부공사구분 (전체)</option>
          <option value="주거용 건축물">주거용 건축물</option>
          <option value="사무용 건축물">사무용 건축물</option>
          <option value="상업용 건축물">상업용 건축물</option>
          <option value="공업용 건축물">공업용 건축물</option>
          <option value="병원">병원</option>
          <option value="학교">학교</option>
          <option value="기타">기타</option>
        </select>
      </SearchByClassBox>
      <div
        className="reset"
        onClick={() => {
          console.log("reset");
          window.location.reload();
        }}
      >
        <MdRestartAlt size={20} />
      </div>
    </Container>
  );
};
export default CategorySelector;
