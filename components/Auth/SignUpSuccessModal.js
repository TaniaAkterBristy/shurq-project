import React, { useState } from "react";
import { Modal } from "antd";
import Image from "next/image";
import Button from "components/Button";

const SignUpSuccessModal = () => {
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="w-full h-auto   flex flex-col justify-center items-center">
      <Image src={"/success.png"} width={50} height={50} alt="success" />
      <h1 className="font-bold text-[30px] text-[#41b457]">Email sent !</h1>
      <p className="text-[grey] text-center font-normal mb-8">
        Successfully we have sent an verification email. Please go to your email
        address and click the confirmation link.
      </p>
      <div className="flex w-full items-center justify-center">

        <Button additionalClasses="w-full bg-[#009129] hover:bg-[#41b457]" >
      <a href="https://mail.google.com/mail/u/0/#inbox" target="_blank ">Open Email Inbox</a>

        </Button>
      </div>
    </div>
  );
};

export default SignUpSuccessModal;
