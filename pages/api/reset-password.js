import jwt from 'jsonwebtoken'
// import { resetPassword } from '../../lib/bigQueries/appendData';
const {resetPassword} = require("../../lib/bigQueries/appendData")
 
export default async function POST(req, res){
   
    try {
        const {email, password} = await req.body
      const { email:decodedEmail } = jwt.decode(emailToken);
         
        const data = await resetPassword({email:decodedEmail, password});
        return res.json(data);
        
    } catch (error) {
        console.log('Error at making the request Error updating password', error);
        return res.status(500).json({error:error.message, status:500})
    }

}