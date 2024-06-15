import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { find } from 'lodash';

import ButtonLink from "components/ButtonLink";
import Card from "components/Card";

import { GetStores } from '../../redux/store';

export default function ConnectToAmazon() {
  const dispatch = useDispatch();
  const [storesData, setStoresData] = useState([
    {
      region: "na",
      sp_api: false,
      ad_api: false,
      name: 'North America',
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
      name: 'Europe',
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
      name: 'Japan',
      countries: [
        {
          abbr: "jp",
          active: true,
        },
      ],
    },
    {
      region: "fe",
      sp_api: false,
      ad_api: false,
      name: 'Australia',
      countries: [
        {
          abbr: "au",
          active: true,
        },
      ],
    },
    {
      region: "fe",
      sp_api: false,
      ad_api: false,
      name: 'Signapore',
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
      name: 'Asia',
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

  const {
    stores
  } = useSelector(state => state.store);

  useEffect(() => {
    dispatch(GetStores());
  },[]);

  useEffect(() => {
      const data = storesData.map((doc) => {
        let sp_api = false;
        let ad_api = false;
        const store = find(stores, { region: doc.region })
        if (store){
          if (store.sp_api && store.sp_api.is_connected) {
            sp_api = true;
          }
          if (store.ad_api && store.ad_api.is_connected) {
            ad_api = true;
          }
        }
        return {
          ...doc,
          sp_api,
          ad_api,
        }
      })

      setStoresData(data);
  }, [stores]);


  return (
    <Card title="Select Marketplace">
      <section className="grid gap-4 grid-cols-1 flex-wrap">
        {storesData?.map((store) => {
          return (
            <div className="flex items-center justify-between bg-[#ececec] px-8 py-6 rounded-md flex-wrap">
              <div>
                <h1 className="text-2xl font-semibold mb-1">{store?.name}</h1>
                <div className="flex gap-1">
                  {store?.countries?.map((c) => {
                    return (
                      <span
                        key={c?.abbr}
                        className={`flag ${c?.abbr} ${!c?.active ? "disabled" : ""
                          }  `}
                      />
                    );
                  })}
                </div>
              </div>

              <div className="flex justify-between gap-4">
                <ButtonLink link={{
                  pathname: '/settings/connect-selling-partner',
                  query: {
                    region: store?.region,
                    name: store?.name
                  },
                }}
                  icon="link"
                  className={ store.sp_api ? "bg-shurqGreen"  :"bg-shurqBlue"}
                >
                  Connect Seller Account
                </ButtonLink>
                <ButtonLink
                  link={{
                    pathname: '/settings/connect-ads',
                    query: {
                      region: store?.region,
                      name: store?.name
                    },
                  }}
                  icon="link"
                  className={ store.ad_api ? "bg-shurqGreen"  :"bg-shurqBlue"}
                >
                  Ads Account
                </ButtonLink>
              </div>
            </div>
          );
        })}
      </section>
    </Card>
  );
}
