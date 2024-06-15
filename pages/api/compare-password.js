import bcrypt from "bcrypt";

export default async function POST(request, resp) {
  try {
    const { hashedPassword, password } = await request.body;
    const match = await bcrypt.compare(password, hashedPassword);
    console.log("match:", match);
    if (match) {
      return resp.status(200).json(true);
    } else {
      return resp.status(409).json(false);
    }
  } catch (error) {
    console.log("error in updating status..", error);
    return resp.status(500).json(false);
  }
}
