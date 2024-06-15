"use client";

import credentials from "./credentials";
import { useEffect, useState } from "react";
//import ButtonLink from "./components/ButtonLink";
import Link from "next/link";

import DropDownMenu from "./DropDownMenu";

import UserAccountsTable from "./UserAccounts";
import AuthModal from "components/Auth/AuthModal";
import SignIn from "components/Auth/SignIn";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
//

const SelectMarketPlaces = () => {
  const [menu, setMenu] = useState(false);
  const { token } = useSelector((state) => state.auth);

  const router = useRouter();


  const [storesData, setStoresData] = useState([
    {
      region: "na",
      sp_api: false,
      ad_api: false,
      name: "North America",
      countries: [
        {
          abbr: "us",
          active: true,
        },
        {
          abbr: "ca",
          active: true,
        },
        {
          abbr: "mx",
          active: true,
        },
        {
          abbr: "br",
          active: true,
        },
      ],
    },
    {
      region: "eu",
      sp_api: false,
      ad_api: false,
      name: "Europe",
      countries: [
        {
          abbr: "uk",
          active: true,
        },
        {
          abbr: "de",
          active: true,
        },
        {
          abbr: "es",
          active: true,
        },
        {
          abbr: "fr",
          active: true,
        },
        {
          abbr: "it",
          active: true,
        },
        {
          abbr: "nl",
          active: true,
        },
        {
          abbr: "pl",
          active: true,
        },
        {
          abbr: "se",
          active: true,
        },
        {
          abbr: "tr",
          active: true,
        },
      ],
    },
    {
      region: "fe",
      sp_api: false,
      ad_api: false,
      name: "Japan",
      countries: [
        {
          abbr: "jp",
          active: true,
        },
      ],
    },
    {
      region: "au",
      sp_api: false,
      ad_api: false,
      name: "Australia",
      countries: [
        {
          abbr: "au",
          active: true,
        },
      ],
    },
    {
      region: "sg",
      sp_api: false,
      ad_api: false,
      name: "Signapore",
      countries: [
        {
          abbr: "sg",
          active: true,
        },
      ],
    },
    {
      region: "as",
      sp_api: false,
      ad_api: false,
      name: "Asia",
      countries: [
        {
          abbr: "in",
          active: true,
        },
        {
          abbr: "ae",
          active: true,
        },
        {
          abbr: "eg",
          active: true,
        },
        {
          abbr: "sa",
          active: true,
        },
      ],
    },
  ]);

  const { region, name } = { name: "Amazon - US", region: "na" };

  useEffect(() => {

    // if (!token) {
    //   router.push("/auth/sign-in");
    // }
    const fetchData = async () => {
      try {
        let newStoresData = storesData;
        newStoresData.map(async (store) => {
          const response = await fetch(
            `${window.location.origin}/api/GET-amazon?region_id=${store.region}&seller_id=A1MI295KNKDCXA`
          );
          console.log("response::", response);

          if (response?.status === 200) {
              const data = await response.json();
            // console.log("data:",data);

            //   // Check if data is available
              if (data) {
                // Set sp_api to true
                // debugger;
                console.log(data);
                store.sp_api = data.length > 0 ? true : false;

              }
          } else {
            store.sp_api = false;
          }
        });
        setStoresData([...newStoresData]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // const deleteIt = (region) => {};
  const handleLoginWithAmazon = (region) => {
    // if (!region) {
    //   router.push('/settings/onboarding')
    // }
    // router.push('/auth/login')
    const state = region; //crypto.randomBytes(20).toString("hex");
    const payload = {
      state,
      region,
    };
    //dispatch(amazonStoreInfo(payload));

    let url;
    // if (region === "eu") {
    //   url = `https://sellercentral-europe.amazon.com/apps/authorize/consent?application_id=amzn1.sp.solution.332c49a6-487f-41f5-9765-1383670215d7&state=${state}&version=beta&redirect_uri=${window.location.origin}/amazon`;
    // } else if (region === 'na') {
    url = `https://sellercentral.amazon.com/apps/authorize/consent?application_id=${credentials.application_id}&state=${state}&version=beta&redirect_uri=${window.location.origin}/amazon`;
    // } else {
    //   url = `https://sellercentral-japan.amazon.com/apps/authorize/consent?application_id=amzn1.sp.solution.332c49a6-487f-41f5-9765-1383670215d7&state=${state}&version=beta&redirect_uri=https://app.shurq.io/settings/amazon-login`;
    // }

    window.open(url, "_self");
    // window.open(url, '_self', "height=700,width=1080");
  };
  const Card = ({ title = "Shurq", children }) => (
    <section className="border bg-white border-[#D1DCE5] rounded-lg flex flex-col justify-between ">
      <div className="text-lg font-semibold mb-2 border-b border-[#EAF1F5] py-4 px-6">
        {title}
      </div>
      <div className="py-4 px-6">{children}</div>
    </section>
  );

  return token ? (
    <div className="w-full min-h-[100vh]">
      <Card title="Select Marketplace">
        <div className="absolute top-2 right-4 bg-red-500 text-white px-3 py-1 rounded ">
          <DropDownMenu menu={menu} setMenu={setMenu} />
        </div>
        <div class="grid grid-cols-4 gap-4">
          {storesData?.map((store, i) => {
            return (
              <section key={i} className="grid gap-4 grid-cols-1 flex-wrap">
                <div
                  key={i}
                  className="flex items-center justify-between bg-[#ececec] px-8 py-6 rounded-md flex-wrap"
                >
                  <div>
                    <h1 className="text-2xl font-semibold mb-1">
                      {store?.name}
                    </h1>
                    <div className="flex gap-1 pb-5">
                      {store?.countries?.map((c, j) => {
                        return (
                          <span
                            key={"country-" + j}
                            className={`flag ${c?.abbr} ${
                              !c?.active ? "disabled" : ""
                            }  `}
                          />
                        );
                      })}
                    </div>
                  </div>
                  <div className="flex justify-between gap-4">
                    {store.sp_api ? (
                      <button
                        key={"sp-api-" + i}
                        style={{ backgroundColor: "#063e63" }}
                        className="inline-flex items-center px-5 py-2 text-sm font-medium text-center text-white bg-gray-700 rounded-lg hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                        onClick={() => {}}
                      >
                        Disconnect Seller Account
                      </button>
                    ) : (
                      <button
                        key={"ads-api-" + i}
                        onClick={() => handleLoginWithAmazon(store?.region)}
                        className="inline-flex items-center px-5 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Connect Seller Account
                      </button>
                    )}
                    <button
                      // link={{
                      //   //  pathname: '/settings/connect-ads',
                      //   query: {
                      //     region: store?.region,
                      //     name: store?.name
                      //   },
                      // }}
                      // icon="link"
                      className="inline-flex items-center px-5 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Connect Ads Account
                    </button>
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      </Card>
      <UserAccountsTable />
    </div>
  ) : (
    <>
      <AuthModal>
        <SignIn />
      </AuthModal>
    </>
  );
};

export default SelectMarketPlaces;

// const [accessToken, setAccessToken] = useState(null);

// useEffect(() => {
//   if (!accessToken) {
//     var formBody = [];
//     for (var property in credentials) {
//       var encodedKey = encodeURIComponent(property);
//       var encodedValue = encodeURIComponent(credentials[property]);
//       formBody.push(encodedKey + "=" + encodedValue);
//     }
//     formBody = formBody.join("&")

//     fetch('https://api.amazon.com/auth/o2/token', {
//       method: "POST",
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded'
//       },
//       body: formBody//JSON.stringify(credentials.getCredentials())
//     }).then(response => response.json())
//       .then(response => { console.log(response); setAccessToken(response.access_token) })
//       .catch(error => console.error('Error:', error))
//     // console.log(response.access_token)
//     //   setAccessToken(response.access_token)
//     //   console.log(JSON.stringify(credentials.getCredentials()))
//   }
// }, [accessToken])
// return (
//   <p style={{ wordWrap: 'break-word', }}>{accessToken ?
//   <p>{accessToken}</p> :
//   <p>loading</p>}</p>
// );
// }
