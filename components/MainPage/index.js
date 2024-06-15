import AuthIntro from "components/Auth/AuthIntro";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const MainPage = () => {
  const { token } = useSelector((state) => state.auth);
  const router = useRouter();
  useEffect(() => {
    if (token) {
      router.push("/home");
    }
  }, []);
  return token ? (
    <></>
  ) : (
    <>
     
      <AuthIntro />
    </>
  );
};

export default MainPage;
