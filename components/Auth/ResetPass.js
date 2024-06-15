import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
// formik
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import Button from "components/Button";
import Link from "next/link";

import { Alert, Spin, message } from "antd";

import ErrorMsg from "./ErrorMsg";
import CustomSpinnerIcon from "config/CustomSpinner";
import { colors } from "./styles";
import { ForgotPassword, SendResetEmail } from "../../redux/slices/auth-slice";
import PageLoader from "components/PageLoader/PageLoader";

export default function ResetPass() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [error, setError] = useState({ error: false, errMessage: "" });
  const [loading, setLoading] = useState(false);

  const { token } = useSelector((state) => state.auth);
  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address!")
      .required("Email is required!"),
  });

  useEffect(() => {
    if (token) {
      router.push(`/home`);
    }
  }, [token]);
  const AntMessage = ({ msg }) => (
    <h1 className="text-[#151615] text-[15px] font-semibold">{msg}</h1>
  );

  const handleForgotPassword = useCallback(
    (formik) => {
      setLoading(true);
      dispatch(SendResetEmail(formik.values.email)).then(({ payload }) => {
        console.log("from Reset password payyload:", payload);
        const { status } = payload;
        if (status === 200) {
          setPageLoading(true);
          setError({ error: false, errMessage: "" });
          message.success(
            <AntMessage
              msg="Successfully! An email with reset password link is sent to your mail
          address go and check your mail inbox!"
            />,
            4,
            () => {}
          );
          router.push(`/`);
        } else if (status === 404) {
          setError({ error: true, errMessage: "Email Not found" });
          message.error(
            <AntMessage msg="This email is not registered" />,
            3,
            () => {}
          );

          setLoading(false);
        } else if (status === 403) {
          setError({ error: true, errMessage: "verify email" });
          message.error(
            <AntMessage msg="This email is not Verified first verify your Email.!" />,
            3,
            () => {}
          );

          setLoading(false);
        }
        formik.setSubmitting(false);
        setLoading(false);
      });
    },
    [router, dispatch]
  );
  const [pageLoading, setPageLoading] = useState(false);
  return (
    <PageLoader loading={pageLoading}>
      <div className="w-full ">
        <h1 className="text-2xl font-semibold mb-5">Reset Password</h1>
        {error.error && error.errMessage !== "verify email" ? (
          <Alert
            className="mb-5"
            message={error.errMessage}
            type="error"
            showIcon
          />
        ) : error.error && error.errMessage === "verify email" ? (
          <Alert
            className="mb-5"
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

                <Button
                  additionalClasses="w-full mt-3"
                  color="primary"
                  disabled={
                    !formik.values.email ||
                    formik.errors.email ||
                    formik.isSubmitting
                  }
                  onClick={() => handleForgotPassword(formik)}
                >
                  <span className="flex gap-5 self-center">
                    Send Recovery Email
                    {loading && <Spin indicator={<CustomSpinnerIcon />} />}
                  </span>
                </Button>
              </Form>
            )}
          </Formik>
        </div>

        <p className="mt-6 text-sm">
          Remembered your password?
          <Link href="/auth/sign-in">
            <a
              onClick={() => setPageLoading(true)}
              className="ml-1 text-shurqBlue underline"
            >
              Login
            </a>
          </Link>
        </p>
      </div>
    </PageLoader>
  );
}
