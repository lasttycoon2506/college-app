export default async function getColleges() {
  const data = await fetch("http://localhost:8000/api/colleges/");
  const colleges = await data.json();
  console.log(colleges);

  return colleges;
}
