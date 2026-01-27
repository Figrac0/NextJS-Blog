// pages/_app.js
import Head from "next/head";
import "../styles/globals.css";
import Layout from "../components/layout/layout";
import { LanguageProvider } from "../context/language-context";

function MyApp({ Component, pageProps }) {
    return (
        <LanguageProvider>
            <Layout>
                <Head>
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1"
                    />
                </Head>
                <Component {...pageProps} />
            </Layout>
        </LanguageProvider>
    );
}

export default MyApp;
