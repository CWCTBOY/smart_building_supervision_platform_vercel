// interface SignUpProps {
//   email: string;
//   password: string;
//   passwordConfirm: string;
//   companyName: string;
//   companyAddress: string;
//   classification: string;
//   name: string;
//   number: string;
// }

const formValidater = (form: any, isEmailValid: boolean) => {
  // 1. email check
  if (!isEmailValid) {
    alert("인증되지 않은 이메일입니다.");
    return false;
  }
  // 2. password check
  if (form.password !== form.passwordConfirm) {
    alert("Password does not match");
    return false;
  }

  // 3. phonenumber check
  const regExp = /^\d{3}-\d{3,4}-\d{4}$/;
  if (!regExp.test(form.number)) {
    alert("Please enter the correct phone number");
    return false;
  }
  return true;
};

const emailValidater = (code: string) => {
  //axios fetch with code
  return true;
};

export { formValidater, emailValidater };
