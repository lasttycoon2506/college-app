import Link from "next/link";

export default function CollegesListBtn(): React.ReactNode {
  return (
    <div>
      <Link href="/api/colleges">
        <button className="btn btn-wide bg-info shadow-md shadow-cyan-500/50 border-none text-base">
          Browse
        </button>
      </Link>
    </div>
  );
}
