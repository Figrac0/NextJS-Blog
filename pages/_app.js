import Head from "next/head";
import "../styles/globals.css";
import Layout from "../components/layout/layout";
import { LanguageProvider } from "../context/language-context";
import PageLoader from "../components/ui/page-loader";

function MyApp({ Component, pageProps }) {
    return (
        <LanguageProvider>
            <Layout>
                <Head>
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1"
                    />
                    <meta name="theme-color" content="#0a0a0a" />
                    <link rel="icon" type="image/png" href="/favicon.png" />
                </Head>
                <PageLoader />
                <Component {...pageProps} />
            </Layout>
        </LanguageProvider>
    );
}

export default MyApp;
