import axios from "axios";
import { IBasicFormType, IFileFormType } from "../interface/formInterface";
import {
  IParticipantsType,
  IProjectType,
  ProjectClassType,
} from "../interface/projectInterface";
import useApi from "./api/axiosInterceptor";

const getProject = async (
  projectId: number,
  basicForm: IBasicFormType,
  fileForm: IFileFormType,
  setBasicForm: (basicForm: any) => void,
  setFileForm: any,
  companyId: number
) => {
  try {
    const { data, status } = await useApi.get("/project", {
      params: { projectId },
    });
    if (status === 200) {
      const {
        name,
        startDate,
        endDate,
        constructionClass,
        detailConstructionClass,
        participants,
        thumbnailUrl,
        floorPlanUrl,
      } = data;
      setBasicForm({
        ...basicForm,
        name,
        startDate,
        endDate,
        constructionClass,
        detailConstructionClass,
        participants,
        companyId,
      });
      setFileForm({
        ...fileForm,
        thumbnail: thumbnailUrl,
        floorPlan: floorPlanUrl,
      });
    }
  } catch (error) {
    throw new Error("프로젝트 정보를 불러오는데 실패했습니다.");
  }
};

const isParticipants = (participants: IParticipantsType[], userId: number) => {
  return participants.some((participant) => participant.crewId === userId);
};

const projectCategorizer = (
  projectInputName: string,
  projectCategory: ProjectClassType,
  data: IProjectType[],
  setProjectList: (projectList: IProjectType[]) => void
) => {
  const copyOfProjectList = [...data];
  const { constructionClass, detailConstructionClass } = projectCategory;
  if (
    projectInputName === "" &&
    constructionClass === "none" &&
    detailConstructionClass === "none"
  ) {
    setProjectList(data);
  }
  if (
    projectInputName === "" &&
    constructionClass !== "none" &&
    detailConstructionClass === "none"
  ) {
    setProjectList(
      copyOfProjectList.filter(
        ({ constructionClass: projectConstructionClass }) =>
          projectConstructionClass === constructionClass
      )
    );
  }
  if (
    projectInputName === "" &&
    constructionClass === "none" &&
    detailConstructionClass !== "none"
  ) {
    setProjectList(
      copyOfProjectList.filter(
        ({ detailConstructionClass: projectDetailConstructionClass }) =>
          projectDetailConstructionClass === detailConstructionClass
      )
    );
  }
  if (
    projectInputName === "" &&
    constructionClass !== "none" &&
    detailConstructionClass !== "none"
  ) {
    setProjectList(
      copyOfProjectList.filter(
        ({
          constructionClass: projectConstructionClass,
          detailConstructionClass: projectDetailConstructionClass,
        }) =>
          projectConstructionClass === constructionClass &&
          projectDetailConstructionClass === detailConstructionClass
      )
    );
  }
  if (
    projectInputName !== "" &&
    constructionClass === "none" &&
    detailConstructionClass === "none"
  ) {
    setProjectList(
      copyOfProjectList.filter(({ name }) => name.includes(projectInputName))
    );
  }
  if (
    projectInputName !== "" &&
    constructionClass !== "none" &&
    detailConstructionClass === "none"
  ) {
    setProjectList(
      copyOfProjectList.filter(
        ({ name, constructionClass: projectConstructionClass }) =>
          name.includes(projectInputName) &&
          projectConstructionClass === constructionClass
      )
    );
  }
  if (
    projectInputName !== "" &&
    constructionClass === "none" &&
    detailConstructionClass !== "none"
  ) {
    setProjectList(
      copyOfProjectList.filter(
        ({ name, detailConstructionClass: projectDetailConstructionClass }) =>
          name.includes(projectInputName) &&
          projectDetailConstructionClass === detailConstructionClass
      )
    );
  }
  if (
    projectInputName !== "" &&
    constructionClass !== "none" &&
    detailConstructionClass !== "none"
  ) {
    setProjectList(
      copyOfProjectList.filter(
        ({
          name,
          constructionClass: projectConstructionClass,
          detailConstructionClass: projectDetailConstructionClass,
        }) =>
          name.includes(projectInputName) &&
          projectConstructionClass === constructionClass &&
          projectDetailConstructionClass === detailConstructionClass
      )
    );
  }
};

const imgUploader = async (file: File) => {
  let payload = new FormData();
  payload.append("image", file);
  try {
    const { data, status } = await axios.post(
      `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_IMGBB_KEY}`,
      payload
    );
    if (status === 200) {
      return data.data.url;
    }
  } catch (error: any) {
    alert("이미지 업로드에 실패했습니다.");
  }
};

export { isParticipants, projectCategorizer, imgUploader, getProject };
