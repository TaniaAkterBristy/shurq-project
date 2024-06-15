
const {getAmazonData} = require("../../lib/bigQueries/amazonAppendData")


export default async function GET(request,resp) {
  try {
    const {region_id, seller_id} = request.query
    console.log('ids from get amz:',region_id, seller_id);
    const res = await getAmazonData({region_id, seller_id})
    console.log("res " + region_id, res);
    return resp.json(res, { status: 200 });
    // const res = await getAmazonData({ 
    //   region_id: request.nextUrl.searchParams.get("region_id"),
    //   seller_id: request.nextUrl.searchParams.get("seller_id"),
    // });
    // console.log("res " + request.nextUrl.searchParams.get("region_id"), res);
    
  } catch (error) {
    console.error("Error getting data:", error);
    return resp.json({ err: error, status: 500 });
  }
}


