export interface CustomerType {
  fin: string;
  serial: string;
  firstName: string;
  lastName: string;
  fatherName: string;
  dateOfBirth: string;
  registrationAddress: string;
  actualAddress: string;
  email: string;
  phone: string;
  isGuarantor: boolean;
  job?: CustomerJobType;
  credits: number[];
  createBy: string;
  createdAt: string;
}

export interface CustomerJobType {
  jobTitle: string;
  company: string;
  region: string;
  salary: number;
  experienceYears: number;
  experienceMonths: number;
}
