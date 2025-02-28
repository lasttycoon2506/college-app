export default function Search() {
  return (
    <div className="form-control py-5 px-2">
      <div className="border-b border-blue-900">
        <h1 className="text-center text-lg font-black pb-2">Search</h1>
      </div>
      <input
        type="text"
        placeholder="Keyword"
        className="input input-bordered w-20 md:w-auto my-3 mx-5"
      />
      <input
        type="text"
        placeholder="Location"
        className="input input-bordered w-20 md:w-auto mb-2 mx-5"
      />
      <button className="btn bg-warning shadow-md shadow-black-500/50 border-none text-base mx-12">
        Search
      </button>
    </div>
  );
}
