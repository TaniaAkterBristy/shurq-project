import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
// formik
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { Alert, Spin } from "antd";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import CustomSpinnerIcon from "config/CustomSpinner";
import Button from "components/Button";
import ErrorMsg from "./ErrorMsg";
import { colors } from "./styles";
import { message } from 'antd'; 
import { ChangePassword } from "../../redux/slices/auth-slice";
import jwt from 'jsonwebtoken'
const ChangePasswordCom = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  // getting user email from the state
  const { user } = useSelector((state) => state.auth);
  const { email } = user;

  const [error, setError] = useState({ error: false, errMessage: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  //   const { token, errorMessage } = useSelector((state) => state.auth);

  const initialValues = {
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  };

  const validationSchema = Yup.object({
    oldPassword: Yup.string()
      .required(" old Password is required!")
      .min(8, "Password must be at least 8 characters!")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,}$/,
        "Password must contain lower and uppercase alphabets and special characters!"
      ),
    newPassword: Yup.string()
      .required("New password is required!")
      .min(8, "Password must be at least 8 characters!")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,}$/,
        "Password must contain lower and uppercase alphabets and special characters!"
      ),
    confirmNewPassword: Yup.string()
      .required("Confirm New Password is required!")
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match"),
  });

  const handleChangePassword = useCallback(
    (formik) => {
      console.log('formik',formik);
      // Mm@12345
      setLoading(true);
      const data = {
        oldPassword: formik.values.oldPassword,
        newPassword: formik.values.newPassword,
        email: email,
      };
      dispatch(ChangePassword(data)).then(({ payload }) => {
        const { status } = payload;
        console.log("payload:", payload);

        if (status === 200) {

          setError({ error: false, errMessage: "" });
          formik.resetForm()
          message.success('Password updated successfully!', 5, () => {
            router.push('/home')
           
          });
         } else if (status === 401) {
          setError({ error: true, errMessage: "Incorrect Old Password!" });
          message.error("Incorrect Old Password!", 5, () => {
          
          });
        } else {setError({
          error: true,
          errMessage: "You can not change your password within 24 Hours.",
        });
          formik.resetForm();
          
        }
        setLoading(false);

        formik.setSubmitting(false);
      });
    },
    [dispatch, router]
  );

  return (
    <div className="flex flex-col justify-center items-center w-full min-h-[100vh]">
      {/* <p className="text-lg mb-6"> </p> */}
      <div className=" w-[45%] h-auto flex  gap-2 flex-col">
        <h1 className="text-2xl font-semibold mb-5">Change Password</h1>
        {error.error && (
               <Alert className="mb-3" message={error.errMessage} type="error" closable onClose={()=>setError({error:false,errMessage:''})}/>
              )}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
        >
          {(formik) => {
             
            return <Form>
              <div>
                <div className="relative">
                  <Field
                    placeholder="Enter Old Password"
                    className={`${colors["primary"]} mb-3 px-6 py-3 ${
                      showPassword ? "pr-12" : ""
                    }`}
                    type={showPassword ? "text" : "password"}
                    id="oldPassword"
                    name="oldPassword"
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
                  name="oldPassword"
                  render={(msg) => <ErrorMsg>{msg}</ErrorMsg>}
                  component="div"
                />
              </div>
              <div>
                <div className="relative">
                  <Field
                    placeholder="Enter New Password"
                    className={`${colors["primary"]} mb-3 px-6 py-3 ${
                      showPassword ? "pr-12" : ""
                    }`}
                    type={showPassword ? "text" : "password"}
                    id="newPassword"
                    name="newPassword"
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
                  name="newPassword"
                  render={(msg) => <ErrorMsg>{msg}</ErrorMsg>}
                  component="div"
                />
              </div>
              <div>
                <div className="relative">
                  <Field
                    placeholder="Confirm New Password"
                    className={`${colors["primary"]} mb-3 px-6 py-3 ${
                      showPassword ? "pr-12" : ""
                    }`}
                    type={showPassword ? "text" : "password"}
                    id="confirmNewPassword"
                    name="confirmNewPassword"
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
                  name="confirmNewPassword"
                  render={(msg) => <ErrorMsg>{msg}</ErrorMsg>}
                  component="div"
                />
              </div>
              
              <Button
                additionalClasses="w-full mt-3"
                color="primary"
                disabled={
                  !formik.values.oldPassword ||
                  !formik.values.newPassword ||
                  !formik.values.confirmNewPassword ||
                  formik.errors.oldPassword ||
                  formik.errors.newPassword ||
                  formik.errors.confirmNewPassword ||
                  formik.isSubmitting
                }
                onClick={() => handleChangePassword(formik)}
              >
                <span className="flex gap-5 self-center">
                  Sign
                  {loading && <Spin indicator={<CustomSpinnerIcon />} />}
                </span>
              </Button>
            </Form>
          }}
        </Formik>
      </div>
      <p className="mt-6 text-sm text-slate-500">
        Dont have an account?
        <Link href="/auth/create-account">
          <a className="ml-1 mr-2 text-shurqBlue underline">Create Account.</a>
        </Link>
      </p>
      <p className="mt-1 text-sm text-slate-500">
        Forgot your password?
        <Link href="/auth/reset-password">
          <a className="ml-1 mr-2 text-shurqBlue underline">Reset Password.</a>
        </Link>
      </p>
    </div>
  );
};

export default ChangePasswordCom;
