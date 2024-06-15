const {updatePasswordInBQ} = require("../../lib/bigQueries/appendData")
export default async function POST(req, res) {
  try {
      const {email, oldPassword, newPassword} = await req.body
      console.log(oldPassword, newPassword);
      const data = await updatePasswordInBQ({email, oldPassword, newPassword});
      return res.json(data);
  } catch (error) {
      console.log('Error at making the request Error updating password', error);
      return res.status(500).json({error:error.message, status:500})
  }
}
