import { Spin } from "antd";
import React from "react";
 const PageLoader = ({ children, loading }) => {
  return (
    <Spin
      spinning={loading}
   
      tip="Loading..."
      size="large"
      className="w-full h-[100vh]"
    >
      {children}
    </Spin>
  );
};

export default PageLoader;
