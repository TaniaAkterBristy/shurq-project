import Link from "next/link";
export default function ButtonLink({ icon, link = "/", children, className = 'bg-shurqBlue' }) {
  return (
    <Link href={link}>
      <a className={`${className} rounded-full text-white h-10 inline-flex items-center justify-between gap-1 p-2 text-xs`} >
        <span className="material-symbols-rounded">{icon}</span>
        {children}
      </a>
    </Link>
  );
}
