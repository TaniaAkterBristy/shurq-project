import { useEffect } from "react";
import { useSelector } from "react-redux";

// import CreateNewPassword from "components/Auth/CreateNewPassword";
import dynamic from "next/dynamic";
   const DynamicCreateNewPassword = dynamic(()=>import('../../components/Auth/CreateNewPassword')) 
const createNewPassword = () => {
  const { token } = useSelector((state) => state.auth);
  useEffect(() => {
    if (token) {
      router.push(`/home`);
    }
  }, [token]);

  return token ? (
    <div className="flex w-full h-[100vh] justify-center items-center ">
      Unauthorized | Access
    </div>
  ) : (
    <DynamicCreateNewPassword />
  );
};
export default createNewPassword;
