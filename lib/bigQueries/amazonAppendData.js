const bigquery = require("./bigQueryClient");

function getRegionID(region_id) {
  if (region_id === "na") return 1;
  if (region_id === "eu") return 2;
  if (region_id === "sg") return 3;
  if (region_id === "au") return 4;
  if (region_id === "fe") return 5;
  if (region_id === "sa") return 6;
  //   else return 0
}

async function insertAmazonData({
  region_id,
  seller_id,
  refresh_token,
  access_token,
  expires_in,
  user_id,
}) {
  const datasetId = "sp_api";
  const tableId = "seller_tokens";
  const dateNow = new Date();
  const data = [
    {
      u_id: user_id,
      region_id: getRegionID(region_id),
      seller_id,
      refresh_token,
      access_token,
      expires_in,
      create_date:
        dateNow.getFullYear() +
        "-" +
        String(dateNow.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(dateNow.getDate()).padStart(2, "0"),
      update_date:
        dateNow.getFullYear() +
        "-" +
        String(dateNow.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(dateNow.getDate()).padStart(2, "0"),
    },
  ];

  try {
    await bigquery.dataset(datasetId).table(tableId).insert(data);
  } catch (error) {
    if (error?.errors[0]?.errors) {
      console.error("Error inserting data:", error.errors[0].errors);
    } else if (error?.errors[0]?.message) {
      console.error("Error inserting data:", error.errors[0].message);
    } else {
      console.error("Error inserting data:", error);
    }
  }
}

async function getAmazonData({ region_id, seller_id }) {
  const datasetId = "sp_api";
  const tableId = "seller_tokens";
  try {
    const get_region_id = getRegionID(region_id);
    const query = `SELECT * FROM ${datasetId}.${tableId} WHERE
     seller_id = @seller_id`;
    //  region_id = @region_id AND
    const queryOptions = {
      query: query,
      params: {
        // region_id: get_region_id,
        seller_id: seller_id,
      },
    };
    console.log("fro amz bq func :", get_region_id, seller_id);
    const [rows] = await bigquery.query(queryOptions);
    return rows;
  } catch (error) {
    console.error("Error getting data:", error);
  }
}

async function deleteAmazonData({ region_id, seller_id }) {
  const datasetId = "sp_api";
  const tableId = "seller_tokens";
  const query = `DELETE FROM ${datasetId}.${tableId} WHERE region_id = ${getRegionID(
    region_id
  )} AND seller_id = '${seller_id}'`;
  try {
    await bigquery.query(query);
  } catch (error) {
    console.error("Error deleting data:", error);
  }
}

async function getUserAccounts({ userId }) {
  const datasetId = "sp_api";
  const tableId = "seller_tokens";
  try {
    const query = `SELECT * FROM ${datasetId}.${tableId} WHERE u_id = @u_id`;

    const queryOptions = {
      query: query,
      params: { u_id: userId },
    };
    const [rows] = await bigquery.query(queryOptions);
    return rows;
  } catch (error) {
    console.log("error getting data from all colums:", error);
    throw new Error("error");
    // return { status: 500, message: "unexpected error!" };
  }
}

async function deleteAllRecords() {
  const datasetId = "sp_api";
  const tableId = "seller_tokens";

  // Delete all rows from the table
  const query = `DELETE FROM ${datasetId}.${tableId} WHERE 1=1`;
  const options = {
    query: query,
    params: {},
  };

  try {
    const [job] = await bigquery.createQueryJob(options);
    await job.getQueryResults();
    console.log(`All records deleted from ${datasetId}.${tableId}`);
    return "success";
  } catch (error) {
    console.log("error", error);
    return "failed";
  }
}

export {
  insertAmazonData,
  getAmazonData,
  deleteAmazonData,
  getUserAccounts,
  deleteAllRecords,
};
