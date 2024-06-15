import { deleteAllRecords } from "lib/bigQueries/amazonAppendData";
import { getNextId } from "lib/bigQueries/appendData";

export default async function GET(request, resp) {
  
    // resp.setHeader('Set-Cookie', `jwt=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`);

    return resp.status(200).json({status:200});
    // try {
    //     const data = await getNextId()
    //     return resp.status(200).json('success')

    // } catch (error) {
    //     console.log('errror getting next id :',error);
    //     return resp.status(500).json('error in next id',error.message)
    // }
}
