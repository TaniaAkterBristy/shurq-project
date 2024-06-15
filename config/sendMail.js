import Button from "components/Button";
import nodemailer from "nodemailer";
import { renderToStaticMarkup } from "react-dom/server";

export default async function sendMail({
  email,
  subject,
  message,
  redirect_link,
}) {
  // from environment variables
  const senderMail = process.env.EMAIL;
  const password = process.env.EMAIL_PASSWORD;

  //   transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: senderMail,
      pass: password,
    },
  });

  //   mail options
  const mailOptions = {
    from: senderMail,
    to: email,
  };

  try {
    const response = await transporter.sendMail({
      ...mailOptions,
      subject: subject,

      html: renderToStaticMarkup(
        <MailMessage
          subject={subject}
          message={message}
          redirect_link={redirect_link}
        />
      ),
    });
    return true;
  } catch (error) {
    console.log("error in sending mail", error);
    return false;
  }
}

const MailMessage = ({ subject, message, redirect_link }) => (
  <div
    style={{
      display: "flex",
      width: "100%",
      height: "80vh",
      justifyContent: "center",
      items: "center",
    }}
  >
    <div
  style={{
    padding: "20px",
    width: "90%",
    height: "250px",
    borderRadius: "5px",
    backgroundColor: "#22242b",
    textAlign: "center", // Center content horizontally
    margin: "0 auto", // Center the div horizontally
  }}
>
  <h1 style={{ color: "white" , fontSize:'30px'}}>{subject}</h1>

  <p style={{ color: "white" }}>{message}</p>
  {redirect_link ? (
    <a
      style={{
        backgroundColor: "#007bff",
        color: "#ffffff",
        padding: "10px 20px",
        borderRadius: "5px",
        textDecoration: "none",
        fontSize: "16px",
        fontWeight: "bold",
        border: "none",
        cursor: "pointer",
        textAlign: "center",
        margin: "10px auto",  
        width: "200px",
        display: "inline-block",  
        transition: "background-color 0.3s ease",
      }}
      href={redirect_link}
      target="_blank"
      rel="noopener noreferrer"
    >
      Click here
    </a>
  ) : null}
</div>


  </div>
);
