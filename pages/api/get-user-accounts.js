const { getUserAccounts } = require("../../lib/bigQueries/amazonAppendData");

export default async function GET(req, res) {
  try {
    const { userId } = await req.query;

    const response = await getUserAccounts({userId});
    // console.log("from get user acount api response :", response);
    res.status(200).json(response);
  } catch (error) {
    console.log("Error getting user acounts in api :", error);
    res.status(500).json("An UnExpected Error!");
  }
}
