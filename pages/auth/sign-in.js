import dynamic from "next/dynamic";
import Head from "next/head";
import AuthIntro from "../../components/Auth/AuthIntro";
import AuthModal from "../../components/Auth/AuthModal";
// import SignIn from "../../components/Auth/SignIn";
 
const DynamicSignIn = dynamic(() => import('../../components/Auth/SignIn'));
// const DynamicAuthIntro = dynamic(() => import('../../components/Auth/AuthIntro'));
// const DynamicAuthModal = dynamic(() => import('../../components/Auth/AuthModal'));

 const  SignInPage=() =>{
  return (
    <>
      {/* <Head>
        <title>Sign In | Shurq</title>
      </Head> */}

      <AuthModal>
        <DynamicSignIn   />
      </AuthModal>
      <AuthIntro />
    </>
  );
}
export default SignInPage