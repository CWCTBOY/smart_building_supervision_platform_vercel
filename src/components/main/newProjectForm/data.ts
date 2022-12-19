const addNewFormProperties = [
  {
    name: "projectName",
    type: "text",
    placeholder: "프로젝트명",
  },
  {
    name: "startDate",
    type: "date",
    placeholder: "시작일",
  },
  {
    name: "endDate",
    type: "date",
    placeholder: "종료일",
  },
  {
    name: "email",
    type: "email",
    placeholder: "담당자 이메일",
  },
  {
    name: "phone",
    type: "tel",
    placeholder: "담당자 연락처",
  },
  {
    name: "classification",
    options: ["건축공사", "토목공사", "플랜트공사", "조경공사"],
    type: "select",
    placeholder: "공사구분",
  },
  {
    name: "detailClassification",
    options: [
      "주거용 건축물",
      "사무실용 건축물",
      "상업용 건축물",
      "공업용 건축물",
      "병원",
      "학교",
      "기타",
    ],
    type: "select",
    placeholder: "세부 공사구분",
  },
];

export default addNewFormProperties;
