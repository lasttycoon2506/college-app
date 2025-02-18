import College from "@/components/college";

export default function Home() {
  async function getColleges() {
    const data = await fetch("http://localhost:8000/api/colleges/");
    const colleges = await data.json();
    return colleges;
  }

  getColleges();
  return College();
}
