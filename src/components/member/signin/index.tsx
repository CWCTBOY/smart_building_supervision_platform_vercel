import styled from "@emotion/styled";
import { useState } from "react";
import { MdPersonOutline, MdLockOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { signinForm } from "../data";

const SignInForm = styled.form`
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
    height: 50px;
    text-indent: 10px;
    font-size: ${({ theme }) => theme.fonts.size.medium};
    padding: 0;
    border: none;
    background-color: transparent;
    &:focus {
      outline: none;
    }
  }
  .icon {
    width: 50px;
    height: 50px;
    font-size: ${({ theme }) => theme.fonts.size.large};
    color: black;
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
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 10px;
  padding: 0 5px;
  .forgot,
  .signup {
    font-size: ${({ theme }) => theme.fonts.size.small};
    font-weight: ${({ theme }) => theme.fonts.weight.bold};
    cursor: pointer;
    border-bottom: 1px solid black;
  }
`;

/* <--> */

const SignIn = () => {
  const icons = [<MdPersonOutline size={40} />, <MdLockOutline size={40} />];
  const nav = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const { email, password } = form;
  const values = [email, password];
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(form);
    localStorage.setItem("access_token", "1234");
    alert("로그인 성공");
    window.location.href = "/project";
  };
  return (
    <SignInForm onSubmit={handleSubmit}>
      {signinForm.map(({ id, name, placeholder, type }) => (
        <Input key={id}>
          {icons[id - 1]}
          <input
            required
            name={name}
            className="input"
            type={type}
            value={values[id - 1]}
            placeholder={placeholder}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setForm({ ...form, [e.target.name]: e.target.value });
            }}
          />
        </Input>
      ))}
      ;<SubmitBtn type="submit">Sign In</SubmitBtn>
      <Bottom>
        <span
          className="forgot"
          onClick={() => {
            nav("/member/find");
          }}
        >
          Forgot Password?
        </span>
        <span
          className="signup"
          onClick={() => {
            nav("/member/signup");
          }}
        >
          Sign Up
        </span>
      </Bottom>
    </SignInForm>
  );
};

export default SignIn;
