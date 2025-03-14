import Link from "next/link";

export default function RegisterBtn(): React.ReactNode {
  return (
    <div>
      <Link href="/api/register">
        <button className="btn btn-wide bg-info shadow-md shadow-cyan-500/50 border-none text-base">
          Register
        </button>
      </Link>
    </div>
  );
}
