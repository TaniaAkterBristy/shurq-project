import dynamic from "next/dynamic";
import Head from "next/head";

// import AuthIntro from "../../components/Auth/AuthIntro";
// import AuthModal from "../../components/Auth/AuthModal";
// import ResetPass from "../../components/Auth/ResetPass";

const DynamicResetPass = dynamic(() => import('../../components/Auth/ResetPass'));
const DynamicAuthIntro = dynamic(() => import('../../components/Auth/AuthIntro'));
const DynamicAuthModal = dynamic(() => import('../../components/Auth/AuthModal'));

  const CreateAccountPage=()=> {
  return (
    <>
      <Head>
        <title>Reset Password | Shurq</title>
      </Head>

      <DynamicAuthModal>
        <DynamicResetPass />
      </DynamicAuthModal>
      <DynamicAuthIntro />
    </>
  );
}
export default  CreateAccountPage
