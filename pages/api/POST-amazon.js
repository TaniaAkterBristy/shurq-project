
const {insertAmazonData} = require("../../lib/bigQueries/amazonAppendData")

export default async function POST(request, resp){
   
    let res = await request.body;

   try {
     console.log(" saving in big query");
     await insertAmazonData(res);
     console.log("res saved in bigquery");
    //  return NextResponse.json({ message: "saved in bigquery" }, { status: 200 });
     return resp.json({ message: "saved in bigquery" }, { status: 200 });
   } catch (error) {
     console.error("Error inserting data:", error);
    return resp.status(500).json({error:'error message...'})
    //  return NextResponse.json({error:'error message...'})
   }
 }