// import { checkUserExist, insertData } from "pages/api/bigQueries/appendData";
import bcrypt from "bcrypt";
import sendMail from "config/sendMail";
import jwt from "jsonwebtoken";
import { checkUserExist, insertData } from "../../lib/bigQueries/appendData";

export default async function POST(request, resp) {
  try {
    const res = await request.body;
    const { firstname, lastname, username, password, email } = res;
    const user = await checkUserExist({ id: "", email, tableId: "" });
    // Send email
    if (user.status===200) {
      return resp.status(409).json({ message: 'username or email already exists! ', status: 409 });
    }
    let mailSent = false;
    try {
      const tokenData = { email };
      const Emailtoken = jwt.sign(tokenData, process.env.ENCRYPTION_KEY, {
        expiresIn: "1d",
      });
      // console.log("Checking for log 1:", Emailtoken);
      mailSent = await sendMail({
        email,
        redirect_link: `${process.env.APP_URL}/redirect-page?token=${Emailtoken}`,
        subject: "Verification Email!",
        message: "Click this Link to Verify the Email",
      });
      console.log("Email Sent => ", mailSent);
    } catch (error) {
      mailSent = false;
      console.error("Error sending mail:", error);
      return resp.status(500).json({ message: 'confirmation mail is not sent! ', status: 500});

    }

    if (mailSent) {
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Insert data into BigQuery
      const result = await insertData({
        firstname,
        lastname,
        username,
        password: hashedPassword,
        email,
      });
      console.log("Result saved in BigQuery:", result);

      if (result.status === 409) {
        return resp.status(409).json({ message: result.error, status: 409 });
      }

      if (result.status === 200) {
        return resp.status(200).json(result);

       
      }
      
    }
    else{
      return resp.status(500).json({ message: 'confirmation mail is not sent! ', status: 500});

    }
  } catch (error) {
    console.error("Error inserting data:", error);
    return resp
      .status(500)
      .json({ error: "Error in saving data.", errorMessage: error });
  }
}