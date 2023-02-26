const addNewFormProperties = [
  {
    name: "name",
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
    name: "constructionClass",
    options: ["건축공사", "토목공사", "플랜트공사", "조경공사"],
    type: "select",
    placeholder: "공사구분",
  },
  {
    name: "detailConstructionClass",
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
