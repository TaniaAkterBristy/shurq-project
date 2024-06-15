import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from "next/router";

import Button from "components/Button";
import Image from "next/image";
import Link from "next/link";
import PageLoader from 'components/PageLoader/PageLoader';

export default function AuthIntro() {
  const router = useRouter();
const [loading, setLoading] =useState(false)
  const {
    token
  } = useSelector(state => state.auth);

  useEffect(() => {
    if (token) {
      router.push(`/home`)
    }
  }, [token])

  return (
    <PageLoader loading={loading}>
      <div className='w-full h-[100vh] '>
      <section className="bg-white shadow-md absolute left-0 z-10 top-0 bottom-0 max-w-screen-sm px-10 md:px-24 py-10">
        <div className="">
          <a href="/"><Image alt="Shurq Logo" src="/logo.png" width="140" height="27" /></a>
        </div>

        <div className="sm:h-[85vh] flex items-center">
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-medium mt-20 sm:m-0">
              Welcome To Shurq
            </h1>
            <Link href="/auth/create-account">
              <Button onClick={()=>setLoading(true)} color="primary">Create account</Button>
            </Link>
            <Link href="/auth/sign-in">
              <Button onClick={()=>setLoading(true)} color="secondary">Sign In</Button>
            </Link>
            <div className="text-sm flex flex-col gap-2 mt-6">
              <p>Message and data rates may apply.</p>
              <p>
                By proceeding, I accept the terms for
                <Link href="/">
                  <a className="mx-1 text-shurqBlue underline">
                    Shurq Shopping Service
                  </a>
                </Link>
                and confirm that I have read
                <Link href="/">
                  <a className="mx-1 text-shurqBlue underline">
                    Shurq's Privacy Policy.
                  </a>
                </Link>
                Links in the app are sponsored.
              </p>
              <p>
                This page is protected by reCAPTCHA. By continuing I confirm
                having read
                <Link href="/">
                  <a className="mx-1 text-shurqBlue underline">
                    Google’s Privacy Policy
                  </a>
                </Link>
                and accepted Google’s{" "}
                <Link href="/">
                  <a className="mx-1 text-shurqBlue underline">Terms</a>
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="hidden  absolute right-0 z-0 top-0 bottom-0 w-6/12 lg:w-8/12 p-10 md:flex items-center justify-center">
        <Image src={"/shurqsignup.png"} layout="fill" objectFit="cover" />
      </section>
      </div>
    </PageLoader>
  );
}
