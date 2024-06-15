const bigquery = require("./bigQueryClient");

 

export default async function createDatasetTableAndInsertData() {
  const datasetId = "users";
  // const tableId = "user_accounts";
  const tableId = "verified_accounts";

  // Create dataset
 

  // Create table
  const schema = [
    { name: "id", type: "STRING" },
    { name: "email_verified", type: "INTEGER" },
    { name: "created_at", type: "STRING" },
    { name: "deleted_at", type: "STRING" },
  ];

  const tableOptions = {
    schema: schema,
  };

  try {
  //   await bigquery.dataset(datasetId).table(tableId).delete();
  //   console.log(`Table.${datasetId}.${tableId} deleted successfully.`);
  // return;
  
    await bigquery.dataset(datasetId).table(tableId).create(tableOptions);
    console.log(`Table ${tableId} created successfully.`);
  } catch (error) {
    console.error("Error creating table:", error);
    return;
  }
}
