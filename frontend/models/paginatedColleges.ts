import { College } from "./college";

export type PaginatedColleges = {
  count: number;
  colleges: College[];
  resultsPerPg: number;
};
