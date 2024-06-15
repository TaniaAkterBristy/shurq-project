import dynamic from "next/dynamic";
import Head from "next/head";
const DynamicMainPage= dynamic(() => import("../components/MainPage"));
export default function Index() {
  return (
    <>
      <Head>
        <title>Login | Shurq</title>
      </Head>
      <DynamicMainPage />
    </>
  );
}
