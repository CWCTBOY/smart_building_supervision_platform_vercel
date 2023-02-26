import useApi from "./api/axiosInterceptor";
import { ICompanyType } from "../interface/userInterface";

const formValidater = (
  form: {
    password: string;
    passwordConfirm: string;
    classification: string;
  },
  companyId: number,
  isEmailValid: boolean,
  isCodeValid: boolean,
  isCodeSended: boolean
) => {
  if (!isEmailValid || !isCodeValid || !isCodeSended) {
    alert("인증되지 않은 이메일입니다.");
    return false;
  }
  if (form.password !== form.passwordConfirm) {
    alert("비밀번호가 일치하지 않습니다.");
    return false;
  }
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$/;
  if (!passwordRegex.test(form.password)) {
    alert("비밀번호는 8~16자, 영문, 숫자, 특수문자를 포함해야 합니다.");
    return false;
  }
  if (companyId === 0) {
    alert("회사를 선택해주세요.");
    return false;
  }
  if (form.classification === "") {
    alert("업종을 구분해주세요.");
    return false;
  }
  return true;
};

const searchCompany = async (
  companyName: string,
  setCompanyList: (companyList: ICompanyType[]) => void
) => {
  if (companyName) {
    try {
      const { data, status } = await useApi.get<ICompanyType[]>(
        `/auth/company-list`,
        {
          params: { companyName: encodeURIComponent(companyName) },
        }
      );
      if (status === 200) {
        setCompanyList(data);
        return true;
      }
    } catch (error: any) {
      const { status } = error.response;
      if (status === 404) {
        alert("회사가 존재하지 않습니다. 회사명을 다시 확인해주세요.");
        return false;
      }
    }
  } else {
    alert("회사명을 입력해주세요.");
    return false;
  }
};

const signOut = async () => {
  try {
    const { status } = await useApi.get("/auth/sign-out");
    if (status === 200) {
      alert("로그아웃 되었습니다.");
      return true;
    }
  } catch (e: any) {
    const { status } = e.response;
    alert(`${status}: server error.`);
  }
  return false;
};

const isSessionPresent = async () => {
  try {
    const { status } = await useApi.get("/session-info");
    if (status === 200) {
      window.location.href = "/project";
    }
  } catch (error: any) {
    console.log(error);
  }
};

// 이메일 인증 코드 검증 -> 서버구현 X
const emailValidater = async (
  email: string,
  setIsCodeSended: (isCodeSended: boolean) => void
) => {
  setIsCodeSended(true);
  try {
    const { status } = await useApi.get("/auth/email-validation", {
      params: { email },
    });
    if (status === 200) {
      alert(`인증코드가 ${email}로 전송되었습니다.`);
      setIsCodeSended(true);
      return true;
    }
  } catch (e: any) {
    const { status } = e.response;
    if (status === 401) {
      alert("이미 가입된 이메일입니다.");
      return false;
    }
    alert("이메일 인증에 실패했습니다.");
    return false;
  }
};
// 이메일 인증 코드 검증 -> 서버구현 X
const codeValidater = async (
  code: string,
  setIsEmailValid: (isEmailValid: boolean) => void,
  setIsCodeValid: (isCodeValid: boolean) => void
) => {
  try {
    const { status } = await useApi.get("/auth/code-validation", {
      params: { code },
    });
    if (status === 200) {
      alert("이메일 인증이 완료되었습니다.");
      setIsEmailValid(true);
      return true;
    }
  } catch (e: any) {
    const { status } = e.response;
    if (status === 401) {
      alert("인증코드가 일치하지 않습니다.");
      return false;
    }
  }
};

export {
  emailValidater,
  formValidater,
  codeValidater,
  searchCompany,
  signOut,
  isSessionPresent,
};
