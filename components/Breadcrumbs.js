import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { navLinks } from "./Sidebar";

export default function BreadCrumbs() {
  const router = useRouter();
  const [path, setPath] = useState(null);

  //TODO: to refactor....
  useEffect(() => {
    setPath(navLinks.find((p) => p.link == router?.asPath));
  }, []);

  const displayLinks = () => {
    if (router?.asPath === "/") {
      return (
        <>
          <Link href="/">
            <a className="hover:underline underline-offset-4">Dashboard</a>
          </Link>
          <span className="material-symbols-rounded">chevron_right</span>
          <Link href="/">
            <a className="hover:underline underline-offset-4">Overview</a>
          </Link>
        </>
      );
    } else {
      return (
        <>
          <Link href="/">
            <a className="hover:underline underline-offset-4">Dashboard</a>
          </Link>
          <span className="material-symbols-rounded">chevron_right</span>
          <div className="hover:underline underline-offset-4 cursor-pointer">
            {path?.page}
          </div>
        </>
      );
    }
  };

  return (
    <div className="text-[#063E63] text-sm font-bold mb-6 flex items-center gap-1">
      {displayLinks()}
    </div>
  );
}
