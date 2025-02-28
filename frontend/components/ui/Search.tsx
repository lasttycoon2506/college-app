"use client";
import { useState } from "react";

export default function Search(): React.ReactNode {
  const [keyword, setKeyword] = useState("");

  function handleInputChange() {}

  return (
    <div className="form-control py-5 px-2">
      <div className="border-b border-blue-900">
        <h1 className="text-center text-lg font-black pb-2">Search</h1>
      </div>
      <input
        type="text"
        placeholder="Keyword"
        className="input input-bordered w-20 md:w-auto my-3 mx-5"
        onChange={(e) => handleInputChange()}
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
