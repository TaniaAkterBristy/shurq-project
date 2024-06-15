import sendMail from "config/sendMail";
import jwt from "jsonwebtoken";
const {finUserWithEmail} = require("../../lib/bigQueries/appendData")


export default async function POST(req, res) {
  const { email } = await req.body;
  try {
    const response = await finUserWithEmail({ email: email });
    const token = encryptToken(email);

    if (response.status === 200) {
      const tokenData = {
        email: email,
      };
      const EmailToken = jwt.sign(tokenData, process.env.ENCRYPTION_KEY, {
        expiresIn: "1d",
      });
      const mailResponse = await sendMail({
        email: email,
        redirect_link: `${process.env.APP_URL}/auth/create-new-password?token=${EmailToken}`,
        subject: " Reset your Password ",
        message: "Click this Link to Reset the Password.",
      });
      res.status(200).json({ status: 200, data: "success sending mail" });
      //  return res.status(200).json({status:200,});
    }
    if (response.status === 404) {
      return res.status(404).json({ status: 404 });
    }
    if (response.status === 403) {
      return res.status(403).json({
        status: 403,
      });
    }
  } catch (error) {
    console.log("error while sending request for reset password", error);
    return res.status(500).json(error);
  }
}
