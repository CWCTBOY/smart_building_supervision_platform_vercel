import styled from "@emotion/styled";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupForm } from "../data";
import {
  emailValidater,
  codeValidater,
  formValidater,
  searchCompany,
} from "../../../hooks/signHooks";
import useApi from "../../../hooks/api/axiosInterceptor";
import CompanyListModal from "./companyListModal";
import { ICompanyType } from "../../../interface/userInterface";

const SignUpForm = styled.form<{ isCompanyListModalOpen: boolean }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: ${({ isCompanyListModalOpen }) =>
    isCompanyListModalOpen ? "399px" : "100%"};
  overflow: hidden;
`;
const Input = styled.div`
  display: flex;
  align-items: center;
  width: inherit;
  border: 1px solid black;
  border-radius: 5px;
  margin-bottom: 10px;
  background-color: rgba(0, 0, 0, 0.1);
  .input {
    width: inherit;
    height: 40px;
    text-indent: 10px;
    font-size: ${({ theme }) => theme.fonts.size.medium};
    padding: 0;
    border: none;
    background-color: transparent;
    &:focus {
      outline: none;
    }
  }
  .validate {
    width: 80px;
    height: 40px;
    font-size: ${({ theme }) => theme.fonts.size.small};
    color: white;
    background-color: #2e76b6;
    border: none;
    cursor: pointer;
  }
`;

const Select = styled.div`
  display: flex;
  align-items: center;
  width: inherit;
  border: 1px solid black;
  border-radius: 5px;
  margin-bottom: 10px;
  background-color: rgba(0, 0, 0, 0.1);
  select {
    width: 101.3%;
    height: 35px;
    padding: 0;
    border: 2px solid ${({ theme }) => theme.colors.gray};
    border-radius: 5px;
    text-indent: 5px;
    background-color: ${({ theme }) => theme.colors.gray};
    &:focus {
      outline: none;
    }
  }
`;

const SubmitBtn = styled.button`
  width: 100%;
  height: 40px;
  background-color: #2e76b6;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: ${({ theme }) => theme.fonts.size.small};
  color: ${({ theme }) => theme.colors.white};
`;

/* <--> */

const SignUp = () => {
  const nav = useNavigate();
  const [isCodeInputOpen, setIsCodeInputOpen] = useState(false);
  const [companyId, setCompanyId] = useState(0);
  const [isCompanyListModalOpen, setIsCompanyListModalOpen] = useState(false);
  const [companyList, setCompanyList] = useState<ICompanyType[]>();
  const [companyName, setCompanyName] = useState("");
  const [code, setCode] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isCodeValid, setIsCodeValid] = useState(false);
  const [isCodeSended, setIsCodeSended] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
    number: "",
    classification: "",
  });
  const { email, password, passwordConfirm, name, number, classification } =
    form;
  const values = [password, passwordConfirm, name, number, classification];
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const req = {
      companyId,
      email,
      password,
      name,
      number,
      classification,
    };
    if (
      !formValidater(form, companyId, isEmailValid, isCodeValid, isCodeSended)
    )
      return;
    try {
      const { status } = await useApi.post("/auth/sign-up", req);
      if (status === 201) {
        alert(
          `환영합니다, ${name}님! 
          관리자의 인증을 받을 때까지 로그인이 불가하며, 
          승인허가가 나는 즉시 이메일을 발송해 드리겠습니다.`
        );
        nav("/member/signin");
      }
    } catch (e: any) {
      alert("회원가입에 실패했습니다. 다시 시도해주세요.");
    }
  };
  return (
    <SignUpForm
      onSubmit={handleSubmit}
      isCompanyListModalOpen={isCompanyListModalOpen}
    >
      {isCompanyListModalOpen && companyList && (
        <CompanyListModal
          companyName={companyName}
          setCompanyName={setCompanyName}
          companyList={companyList}
          setCompanyId={setCompanyId}
          setIsCompanyListModalOpen={setIsCompanyListModalOpen}
        />
      )}
      <Input>
        <input
          required
          className="input"
          type="text"
          value={companyName}
          placeholder="Company Name"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setCompanyName(e.target.value);
          }}
        />
        <button
          className="validate"
          type="button"
          onClick={async () => {
            (await searchCompany(companyName, setCompanyList)) &&
              setIsCompanyListModalOpen(true);
          }}
        >
          회사검색
        </button>
      </Input>
      <Input>
        <input
          required
          name="email"
          className="input"
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setForm({ ...form, [e.target.name]: e.target.value });
          }}
        />
        <button
          className="validate"
          type="button"
          onClick={async () => {
            (await emailValidater(email, setIsCodeSended)) &&
              setIsCodeInputOpen(true);
          }}
        >
          {isEmailValid ? "인증완료" : "코드전송"}
        </button>
      </Input>
      {isCodeInputOpen && (
        <Input>
          <input
            required
            name="code"
            className="input"
            type="text"
            placeholder="인증코드 입력"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setCode(e.target.value);
            }}
          />
          <button
            className="validate"
            type="button"
            onClick={async () => {
              (await codeValidater(code, setIsEmailValid, setIsCodeValid)) &&
                setIsCodeInputOpen(false);
            }}
          >
            인증하기
          </button>
        </Input>
      )}
      {signupForm.map(({ id, name, type, placeholder, options }) =>
        type === "select" ? (
          <Select key={name}>
            <select
              name={name}
              required
              defaultValue="none"
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                const { name, value } = e.target;
                setForm({ ...form, [name]: value });
              }}
            >
              <option value="none" disabled hidden>
                업종 구분
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
            <input
              required
              name={name}
              className="input"
              type={type}
              value={values[id - 1]}
              placeholder={placeholder}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const { name, value } = e.target;
                setForm({ ...form, [name]: value });
              }}
            />
          </Input>
        )
      )}
      <SubmitBtn type="submit">Sign Up</SubmitBtn>
    </SignUpForm>
  );
};

export default SignUp;
