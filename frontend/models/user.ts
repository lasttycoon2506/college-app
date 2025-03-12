import { UserApplication } from "./userApplication";

export type UserBackend = {
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  essay?: string;
  sat?: number;
  gpa?: number;
};

export type User = {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  essay: string;
  sat: string;
  gpa: string;
  userApplications?: UserApplication[];
};

export function mapBackendToFrontend(userBackend: UserBackend): User {
  return {
    firstName: userBackend.first_name,
    lastName: userBackend.last_name,
    email: userBackend.email,
    username: userBackend.username,
    essay: userBackend.essay || "",
    sat: userBackend.sat ? userBackend.sat.toString() : "",
    gpa: userBackend.gpa ? userBackend.gpa.toString() : "",
  };
}
