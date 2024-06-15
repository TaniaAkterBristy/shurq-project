import jwt from "jsonwebtoken";
import { getData } from "lib/bigQueries/appendData";
 
export default async function POST(request, resp) {
  try {
    const { email, password } = await request.body;
    const response = await getData({ email: email, password: password });
    console.log("in logi router: ", response);
    if (response.status === 200) {
      // Token creation
      const tokenData = {
        userId: response.data.id,
        username: response.data.username,
      };
      const token = jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, {
        expiresIn: "1d",
      });
      // Storing in a cookie
      // const cookieOptions = {
      //   httpOnly: true,
      //   expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 7 days
      // };
      // request.user = response.data;
      // console.log("request user::::", request.user);

      return resp.json({ user: response.data, token: token, status: 200 });
    } else if (response.status === 404) {
      return resp
        .status(404)
        .send({ message: "credentials not found!", status: 404 });
    } else if (response.status === 403) {
      return resp.status(403).send({ message: response.error, status: 403 });
    } else if (response.status === 401) {
      return resp.status(401).send({ message: response.error, status: 401 });
    }
  } catch (error) {
    return resp.json({ err: error, status: 500 });
  }
}
