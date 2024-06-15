import { useState, useCallback } from "react";
import { useRouter } from "next/router";
// formik
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import Button from "components/Button";
import Link from "next/link";

import { Alert, Spin } from "antd";
import CustomSpinnerIcon from "config/CustomSpinner";
import ErrorMsg from "./ErrorMsg";
import { colors } from "./styles";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import PageLoader from "components/PageLoader/PageLoader";
import axios from "axios";

export default function SignIn( ) {
  const router = useRouter();
  const [pageLoading, setPageLoading] = useState(false)

  const [error, setError] = useState({ error: false, errMessage: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
   const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    password: Yup.string()
      .required("password is required!")
      .min(8, "Password must be at least 8 characters!")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,}$/,
        "Password must contain lower and uppercase alphabets and special characters!"
      ),
    email: Yup.string()
      .email("Invalid email address!")
      .required("Email is required!"),
  });


  const handleSignIn = useCallback(
    (formik) => {
      setLoading(true);
      console.log('formik.values2 ', formik.values);
      if (formik?.values) {
        axios.post('http://localhost:8000/sigin', formik?.values)
          .then(res => {
            if (res.data === 'Success') {
              router.push(`/dashboard/add-product`);
            }
            else {
              alert('pass or email are wrong')
            }
          })
          .then(err => console.log(err))
      }

    },
    [router]
  );

  return (
    <PageLoader loading={pageLoading}>
    <div className="w-full">
      <h1 className="text-2xl font-semibold mb-5">Welcome Back</h1>
      {error.error && error.errMessage !== "verify email" ? (
                <Alert className="mb-5"
               message={error.errMessage}
               type="error"
               showIcon
             />
              ) : error.error && error.errMessage === "verify email" ? (
                <Alert className="mb-5"
                  message="Email not verified! Go to your given email address and click the redirect link to verify the email."
                  type="warning"
                  showIcon
                />
              ) : null}
      <div className="flex gap-2 flex-col">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
        >
          {(formik) => (
            <Form>
              <div>
                <Field
                  placeholder="Email"
                  className={`${colors["primary"]} mb-3
              px-6 py-3`}
                  type="email"
                  id="email"
                  name="email"
                />
                <ErrorMessage
                  name="email"
                  render={(msg) => <ErrorMsg>{msg}</ErrorMsg>}
                />
              </div>
              <div>
                <div className="relative">
                  <Field
                    placeholder="Password"
                    className={`${colors["primary"]} mb-3 px-6 py-3 ${
                      showPassword ? "pr-12" : ""
                    }`}
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                  />
                  <div
                    className="absolute inset-y-0 right-0 flex items-center pb-2 pr-3 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeInvisibleOutlined className="text-[20px] " />
                    ) : (
                      <EyeOutlined className=" text-[20px] " />
                    )}
                  </div>
                </div>
                <ErrorMessage
                  name="password"
                  render={(msg) => <ErrorMsg>{msg}</ErrorMsg>}
                  component="div"
                />
              </div>
               
              <Button
                additionalClasses="w-full mt-3"
                color="primary"
                disabled={
                  !formik.values.email ||
                  !formik.values.password ||
                  formik.errors.email ||
                  formik.errors.password ||
                  formik.isSubmitting
                }
                onClick={() => handleSignIn(formik)}
              >
                <span className="flex gap-5 self-center">
                  Sign
                  {loading && <Spin indicator={<CustomSpinnerIcon />} />}
                </span>
              </Button>
            </Form>
          )}
        </Formik>
      </div>
      <p className="mt-6 text-sm text-slate-500">
        Dont have an account?
        <Link href="/auth/create-account">
          <a onClick={()=>setPageLoading(true)} className="ml-1 mr-2 text-shurqBlue underline">Create Account.</a>
        </Link>
      </p>
      <p className="mt-1 text-sm text-slate-500">
        Forgot your password?
        <Link href="/auth/reset-password">
          <a onClick={()=>setPageLoading(true)} className="ml-1 mr-2 text-shurqBlue underline">Reset Password.</a>
        </Link>
      </p>
    </div>
    </PageLoader>
  );
}
