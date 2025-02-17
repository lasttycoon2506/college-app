import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-3">
      <div className="flex items-center flex-shrink-0 text-white mr-12">
        <Image
          className="dark:invert mr-6"
          src="/college.svg"
          alt="clg icon"
          width={45}
          height={45}
        />
        <span className="font-semibold text-xl tracking-tight">EZ Apply</span>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
          <a
            href="#responsive-header"
            className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
          >
            Docs
          </a>
          <a
            href="#responsive-header"
            className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
          >
            Examples
          </a>
          <a
            href="#responsive-header"
            className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white"
          >
            Blog
          </a>
        </div>
        <div className="flex flex-shrink-0 text-white">
          <form>
            <input
              className="shadow rounded py-3 px-3 text-gray-700 leading-tight focus:shadow-outline mr-2"
              id="username"
              type="text"
              placeholder="Username"
            />
            <input
              className="shadow rounded py-3 px-3 text-gray-700 leading-tight focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Password"
            />
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-2 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}
