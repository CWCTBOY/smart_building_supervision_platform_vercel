import styled from "@emotion/styled";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupForm } from "../data";
import EmailValidater from "./emailValidater";
import { formValidater } from "./validater";
import { MdCheckCircleOutline } from "react-icons/md";

const passwordRegex =
  "^(?=.*[A-Za-z])(?=.*d)(?=.*[$@$!%*#?&])[A-Za-zd$@$!%*#?&]{8,}$";

const SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
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
  const [code, setCode] = useState("");
  const [isCodeSended, setIsCodeSended] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
    companyName: "",
    classification: "",
    name: "",
    number: "",
  });
  const { email, password, companyName, name, number, classification } = form;
  const values = [email, password, companyName, name, number, classification];
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // if (formValidater(form, isEmailValid)) {
    //   alert("회원가입 성공!");
    //   nav("/member/signin");
    // }
    console.log(form);
  };
  const codeSender = (email: string) => {
    // 이메일 중복검사
    // fetch code sender server
    // if code is sended, set validater true
    setIsCodeSended(true);
  };
  return (
    <SignUpForm onSubmit={handleSubmit}>
      <Input>
        <input
          disabled={isEmailValid || isCodeSended}
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
          onClick={() => codeSender(email)}
        >
          {isEmailValid ? "Verified" : "Send"}
        </button>
      </Input>
      {isCodeSended && ( // 이메일 인증코드 입력창
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
            onClick={
              EmailValidater(code)
                ? () => setIsEmailValid(true)
                : () => alert("인증코드가 일치하지 않습니다.")
            }
          >
            Verify
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
              value={values[id]}
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
