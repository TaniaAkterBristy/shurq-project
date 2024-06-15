import { useEffect } from "react";
import { useState } from "react";
import jwt from "jsonwebtoken";
const useUserAccounts = () => {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ error: false, errorMessage: "" });
  const getRegionID = (region_id) => {
    if (region_id === 1) return "na";
    if (region_id === 2) return "eu";
    if (region_id === 3) return "sg";
    if (region_id === 4) return "au";
    if (region_id === 5) return "fe";
    if (region_id === 6) return "sa";
  };
  useEffect(() => {
    setLoading(true);
    // current user id from local storage
    const token = localStorage.getItem("token");
    const { userId } = jwt.decode(token);
    console.log("token: ", userId);

    const fetchUserAccounts = async () => {
      try {
        const response = await fetch(
          `${window.location.origin}/api/get-user-accounts?userId=${userId}`
        );
        const data = await response?.json();

        console.log("response", data);

        if (response?.status === 200) {
          if (data.length > 0) {
            let extractedData = [];
            data.map((d) => {
              extractedData.push({
                region_id: getRegionID(d.region_id),
                seller_id: d.seller_id,
                create_date: d.create_date.value,
                update_Date: d.update_Date.value,
                expires_in: d.expires_in,
              });
            });
            setTableData(extractedData);
            console.log(extractedData);
          } else {
            setTableData([]);
          }
        }
        if (response?.status === 500) {
          setError({ error: true, errorMessage: "Network Error" });
        }
      } catch (error) {
        console.log("error while fetching user accounts data..");
        setError({
          error: true,
          errorMessage: "Error Fetching user accounts data!",
        });
      }
      setLoading(false);
    };
    fetchUserAccounts();
  }, []);
  return { tableData, loading, error };
};

export default useUserAccounts;
