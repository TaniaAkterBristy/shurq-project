import jwt from 'jsonwebtoken'
import { updateVerificationStatus } from '../../lib/bigQueries/appendData';
export default async function GET(request, resp) {
  try {
  const {token} = await  request.query;
  console.log('token encrypted :', token);
  const {email} =  jwt.decode(token);
  // console.log('decoded:',decoded);
      const result = await updateVerificationStatus({email:email})
    console.log(result);
    return resp.status(200).json({email:email})
    
} catch (error) {
    console.log('error in updating status..',error);
    return resp.status(500).json({error:error})
}
 }