
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
const DynamicChangePasswordCom= dynamic(()=>import('../../components/Auth/ChangePassword'))
const change_Password = () => {
  const { token } = useSelector((state) => state.auth);
  const router = useRouter();
  useEffect(() => {
    if (!token) {
      router.push("/");
    }
  }, []);

  return token ? (
    <DynamicChangePasswordCom />
  ) : (
    <div className="w-full h-[100vh] flex justify-center items-center">
      <h1 className="text-[24px] text-blue">Un-Authorized Access!</h1>
    </div>
  );
};

export default change_Password;
