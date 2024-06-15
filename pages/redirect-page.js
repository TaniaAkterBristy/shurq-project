import dynamic from "next/dynamic";

const DynamicRedirect= dynamic(()=>import('../components/Auth/Redirect'))

const redirect = () => {
   
  
  return (
    <DynamicRedirect/>
  );
};

export default redirect;
