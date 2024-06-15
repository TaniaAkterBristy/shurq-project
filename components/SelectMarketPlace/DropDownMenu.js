import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import jwt from 'jsonwebtoken';

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Logout } from "../../redux/slices/auth-slice";
import { Spin, message } from "antd";
// import CustomSpinnerIcon from "config/CustomSpinner";
import PageLoader from "components/PageLoader/PageLoader";

export default function DropDownMenu({ menu, setMenu }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useSelector((state) => state.auth);
  const { email, password, username } = user;
  const [pageLoading, setPageLoading] = useState(false);
  // const token = localStorage.getItem("token");
  // const decodedToken = jwt.decode(token);
  // const {userId} = decodedToken
  // console.log("token:", userId);
  const handleLogout = () => {
 
    setPageLoading(true);
    
    setTimeout(() => {
      dispatch(Logout()).then(({ payload }) => {
        const { status } = payload;
        if (status === 200) {
          message.success("Successfully logout!", 4, () => {});
          router.push('/')
        } else {
          console.log("Something went wrong in logout");
          setPageLoading(false);
          message.error("Error logging out!", 4, () => {});
        }
      });
    }, 3000);
  };

  return (
      <div className="relative cursor-pointer z-[9999]">
        <div
          className="flex gap-4 items-center select-none"
          onClick={() => setMenu(!menu)}
        >
          <div className="bg-white text-shurqBlue flex items-center justify-center h-10 w-10 rounded-full">
            <div className="material-symbols-rounded">person</div>
          </div>
          <div>{username}</div>
          <div className="material-symbols-rounded">
            {menu ? "expand_less" : "expand_more"}
          </div>
        </div>

        {menu && (
          <div className="absolute top-[65px] right-0 bg-white text-shurqBlue shadow-sm border rounded-md">
            {/* <Link href="/account"> */}
            <a className="pl-3 pr-5 py-2 border-b flex items-center gap-2">
              <span className="material-symbols-rounded">person</span>
              <span>Account</span>
            </a>
            {/* </Link> */}

            {/* <Link href="/account/settings"> */}
            <a className="pl-3 pr-5 py-2 border-b flex items-center gap-2">
              <span className="material-symbols-rounded">settings</span>
              <span>Settings</span>
            </a>
            {/* </Link> */}

            <Link href="/setting/change-password">
              <a className="pl-3 pr-1 py-2 border-b flex items-center gap-2">
                <span className="material-symbols-rounded">password</span>
                <span>Change Password </span>
              </a>
            </Link>

            <button
            disabled={pageLoading}
              onClick={handleLogout}
              className="pl-3 pr-5 py-2 flex items-center gap-2 hover:text-blue-600"
            >
              {
                pageLoading? <div className="flex gap-1 items-center justify-center">
                <span  className="material-symbols-rounded text-[grey]">lock</span>
              <span className="text-[grey]" > Logout</span>
              <Spin   size='small'/>

                </div>:<>
                <span className="material-symbols-rounded">lock</span>
              <span> Logout</span>
                </>
              }
             
            </button>
          </div>
        )}
      </div>
  );
}
