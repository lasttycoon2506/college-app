export default function Search() {
  return (
    <div className="form-control">
      <h3 className="text-center pb-8 text-lg font-black underline underline-offset-2">
        Search:
      </h3>
      <input
        type="text"
        placeholder="Search"
        className="input input-bordered w-24 md:w-auto"
      />
    </div>
  );
}
