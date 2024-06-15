import bcrypt from "bcrypt";

export default async function POST(request, resp) {
  try {
    const { password } = await request.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return resp.status(200).json(hashedPassword);
  } catch (error) {
    console.log("error in updating status..", error);
    return resp.status(500).json(null);
  }
}
