import dynamic from "next/dynamic";
import Head from "next/head";

import AuthIntro from "../../components/Auth/AuthIntro";
import AuthModal from "../../components/Auth/AuthModal";
const DynamicCreateAccount = dynamic(() => import('../../components/Auth/CreateAccount'));
// const DynamicAuthIntro = dynamic(() => import('../../components/Auth/AuthIntro'));
// const DynamicAuthModal = dynamic(() => import('../../components/Auth/AuthModal'));

const CreateAccountPage=()=> {
   return (
     <>
      <Head>
        <title>Create Account | Shurq</title>
      </Head>

      <AuthModal>
        <DynamicCreateAccount />
      </AuthModal>
      <AuthIntro />
     </>
  );
}
export default CreateAccountPage