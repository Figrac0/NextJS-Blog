// pages/_document.js
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    <link rel="icon" href="/fav-main.png" type="image/png" />
                    <link rel="shortcut icon" href="/fav-main.png" />
                    <link rel="apple-touch-icon" href="/fav-main.png" />

                    <meta name="theme-color" content="#000000" />
                    <meta
                        name="description"
                        content="Frontend developer blog with projects and tutorials"
                    />
                    <meta charSet="utf-8" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                    <div id="notifications"></div>
                </body>
            </Html>
        );
    }
}

export default MyDocument;
