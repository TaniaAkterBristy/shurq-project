import { Spin } from "antd";
import { useRouter } from "next/router";
import { useEffect } from "react";

import React from "react";
import { message } from "antd";

const Redirect = () => {

    const router = useRouter();
  const { token } = router.query;
  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi
      .open({
        type: "loading",
        content: "Verifying your Email...",
        duration: 2.5,
      })
      .then(() => message.success("Email Verified !", 4))
      .then(() => router.push("/auth/sign-in"));
  };
  useEffect(() => {
    const verifyEmail = async () => {
      try {
        if (token) {
          const approve = await fetch(
            `${window.location.origin}/api/verify-email?token=${token}`
          );
        }
      } catch (error) {
        console.log("errror in email verification", error);
      }
    };

    verifyEmail();
  }, [token]);
  useEffect(() => {
    success();
  }, []);


  return (
    <div className="flex w-full h-[100vh] justify-center items-center">
      <Spin style={{ fontSize: "100px" }} />
      {contextHolder}
    </div>
  )
}

export default Redirect



 
