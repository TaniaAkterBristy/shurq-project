import { Spin } from "antd";
import PageLoader from "components/PageLoader/PageLoader";
import Link from "next/link";
import { useState } from "react";
export default function AuthModal({ children }) {
  const [loading, setLoading] = useState(false)
  return (
    <PageLoader loading={loading}>
    <div className="bg-black z-50 w-full h-full fixed bg-opacity-50 p-4 overflow-x-auto md:py-20">
      <div className="bg-white px-20 py-16 mx-auto max-w-2xl rounded-md shadow-lg relative">
        <Link href="/">
          <a  onClick={()=>setLoading(true)} className="absolute top-5 right-5">
            <span className="material-symbols-rounded text-red-700 hover:text-red-800">close</span>
          </a>
        </Link>
        {children}
      </div>
    </div>
    </PageLoader>
  );
}
