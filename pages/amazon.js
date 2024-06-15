"use client";

import React, { useEffect, useState, Suspense } from "react";
import credentials from "../components/SelectMarketPlace/credentials";
import jwt from "jsonwebtoken";
import { useRouter } from "next/router";
import { message } from "antd";
import PageLoader from "components/PageLoader/PageLoader";
export default function Page() {
  const [code, setCode] = useState(null);
  const [token, setToken] = useState(null);

  // const [savedData, setSavedData] = useState(false);
  const [loading, setLoading] = useState(true);
  // debugger;
  const router = useRouter();
  useEffect(() => {
    // from token getting userId
    const token = localStorage.getItem("token");
    const decodedToken = jwt.decode(token);
    const { userId } = decodedToken;

    const spapi_oauth_code = window.location.search.split("&")[0].split("=")[1];
    const state = window.location.search.split("&")[1].split("=")[1];
    const selling_partner_id = window.location.search
      .split("&")[2]
      .split("=")[1];

    let formBody = [];

    formBody.push(
      encodeURIComponent("grant_type") +
        "=" +
        encodeURIComponent("authorization_code")
    );
    formBody.push(
      encodeURIComponent("code") + "=" + encodeURIComponent(spapi_oauth_code)
    );
    formBody.push(
      encodeURIComponent("client_id") +
        "=" +
        encodeURIComponent(credentials.client_id)
    );
    formBody.push(
      encodeURIComponent("client_secret") +
        "=" +
        encodeURIComponent(credentials.client_secret)
    );

    formBody = formBody.join("&");
    fetch("https://api.amazon.com/auth/o2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formBody,
    })
      .then((response) => response.json())
      .then((response) => {
        fetch(`${window.location.origin}/api/POST-amazon`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            region_id: window.location.search.split("&")[1].split("=")[1],
            seller_id: window.location.search.split("&")[2].split("=")[1],
            refresh_token: response.refresh_token,
            access_token: response.access_token,
            expires_in: response.expires_in,
            user_id: userId,
          }),
        })
          .then((response) => {
            if (response.status === 200) {
              setLoading(false);

              message.success("Data saved successfully", 2, () => {
                router.push("/home");
              });
            }
          })
          .then((response) => {})
          .catch((err) => {
            setLoading(false);
            setToken("dddd");
            message.error("Data not saved yet", 4, () => {
              router.push("/home");
            });
          });
      })
      .catch((err) => {
        setLoading(false);
        message.error("Data not saved yet", 4, () => {
          router.push("/home");
        });
        setToken("dddd");
      });
  }, []);
  return (
    <PageLoader loading={loading}>
      <div className="flex w-full h-[100vh] justify-center items-center"></div>
    </PageLoader>
  );
}
