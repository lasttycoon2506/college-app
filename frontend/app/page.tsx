import College from "@/components/college";

export default function Home() {
  return College({ data: getColleges() });
}
