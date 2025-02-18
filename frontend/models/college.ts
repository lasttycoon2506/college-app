export type College = {
  map(
    arg0: (college: any) => import("react").JSX.Element
  ): import("react").ReactNode;
  id: number;
  name: string;
  address: string;
  tuition: number;
  type: string;
  established: number;
  endowment: number;
  academicStaff: number;
  undergrad: number;
  postgrad: number;
  campusSize: number;
  division: string;
  applicationDeadline: Date;
};
