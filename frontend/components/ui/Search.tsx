export default function Search() {
  return (
    <div className="form-control py-5 px-5">
      <h3 className="text-center pb-3 text-lg font-black underline underline-offset-2">
        Search:
      </h3>
      <input
        type="text"
        placeholder="Keyword"
        className="input input-bordered w-20 md:w-auto mb-3"
      />
      <input
        type="text"
        placeholder="Location"
        className="input input-bordered w-20 md:w-auto mb-2"
      />
      <button className="btn bg-warning shadow-md shadow-black-500/50 border-none text-base">
        Search
      </button>
    </div>
  );
}
