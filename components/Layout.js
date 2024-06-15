// import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AuthModal from "./Auth/AuthModal";
import SignIn from "./Auth/SignIn";
import { useRouter } from "next/router";

export default function Layout({ children }) {
  const router =useRouter()
  const { token } = useSelector((state) => state.auth);


  useEffect(() => {
    if (token) {
      router.push(`/home`);
    }
  }, [token]);

  return (
    <>
      {!token ? (
        <>
          <AuthModal>
            <SignIn title="Unauthorized. | Please Sign in First" welcome="" />
          </AuthModal>
        </>
      ) : (
        <>
         
          <main
            className={`
             ml-12
             text-gray-800 mt-8 px-10 py-8 pt-16 `}
          >
            {children}
          </main>
        </>
      )}
    </>
  );
}
