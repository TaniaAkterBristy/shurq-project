import Meta from "components/Meta";
import Document, { Head, Html, Main, NextScript } from "next/document";
 
export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@48,400,0,0"
          />
          <Meta />
        </Head>
        <body className="font-sans text-gray-800 bg-[#e6ecf2]">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
