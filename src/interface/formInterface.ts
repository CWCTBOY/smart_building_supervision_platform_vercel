import { IParticipantsType } from "./projectInterface";

interface IBasicFormType {
  name: string;
  companyId: number;
  managerId: number;
  startDate: string;
  endDate: string;
  constructionClass: string;
  detailConstructionClass: string;
  participants?: IParticipantsType[] | null;
}

interface IFileFormType {
  thumbnail: string | null;
  floorPlan: string | null;
}

export type { IBasicFormType, IFileFormType };
