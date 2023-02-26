import { ProjectRole } from "../type/RoleEnum";

type constructionClassType =
  | "none"
  | "건축공사"
  | "토목공사"
  | "플랜트공사"
  | "조경공사";

type detailConstructionClassType =
  | "none"
  | "주거용 건축물"
  | "사무실용 건축물"
  | "상업용 건축물"
  | "공업용 건축물"
  | "병원"
  | "학교"
  | "기타";

interface ProjectClassType {
  constructionClass: constructionClassType;
  detailConstructionClass: detailConstructionClassType;
}

interface IProjectType {
  id: number;
  name: string;
  processRate: number;
  startDate: string;
  endDate: string;
  constructionClass: constructionClassType;
  detailConstructionClass: detailConstructionClassType;
  participants: IParticipantsType[];
  floorPlanUrl: string;
  thumbnailUrl: string;
}

interface IParticipantsType {
  classification: string;
  crewId: number;
  email: string;
  name: string;
  number: string;
  projectRole: ProjectRole;
}

export type {
  ProjectClassType,
  IProjectType,
  IParticipantsType,
  constructionClassType,
  detailConstructionClassType,
};
