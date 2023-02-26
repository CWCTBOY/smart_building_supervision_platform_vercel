const signinForm = [
  {
    id: 1,
    name: "email",
    type: "email",
    placeholder: "Email",
  },
  {
    id: 2,
    name: "password",
    type: "password",
    placeholder: "Password",
  },
];

const signupForm = [
  {
    id: 1,
    name: "password",
    type: "password",
    placeholder: "Password",
  },
  {
    id: 2,
    name: "passwordConfirm",
    type: "password",
    placeholder: "Password Confirm",
  },
  {
    id: 3,
    name: "name",
    type: "text",
    placeholder: "Name",
  },
  {
    id: 4,
    name: "number",
    type: "tel",
    placeholder: "Phone Number ('-' 제외)",
  },
  {
    id: 5,
    name: "classification",
    type: "select",
    options: ["발주처", "감리사", "건설사", "설계사", "관리자", "게스트"],
    placeholder: "Classification",
  },
];

export { signinForm, signupForm };
