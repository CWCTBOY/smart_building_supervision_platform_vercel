import { ServiceRole } from "../type/RoleEnum";

interface IUserType {
  id: number;
  name: string;
  email: string;
  number: string;
  classification: string;
  role: ServiceRole;
  authorized: boolean;
  companyInfo: ICompanyType;
}

interface ISessionInfoType {
  companyInfo: ICompanyType;
  role: ServiceRole;
  userId: number;
}

interface ICompanyType {
  companyId: number;
  companyAddress: string;
  companyName: string;
}

export type { IUserType, ISessionInfoType, ICompanyType };
