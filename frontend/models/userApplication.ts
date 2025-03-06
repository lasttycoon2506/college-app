import { College } from "./college";

export type UserApplication = {
  id: number;
  college: College;
  applicant: number;
  dateApplied: string;
};
