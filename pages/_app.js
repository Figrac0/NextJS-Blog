import Head from "next/head";
import "../styles/globals.css";
import Layout from "../components/layout/layout";
import { LanguageProvider } from "../context/language-context";
import PageLoader from "../components/ui/page-loader";

// Suppress a known harmless warning emitted by Next.js 13.5's bundled
// react-dom canary about the `fetchPriority` prop on <img>. The next/image
// component already passes the correct prop spelling for the installed React
// version; the warning is a stale check inside the bundled build.
if (
    process.env.NODE_ENV !== "production" &&
    typeof console !== "undefined" &&
    !globalThis.__nextImageFetchPriorityFilterInstalled
) {
    const originalConsoleError = console.error.bind(console);
    console.error = (...args) => {
        const firstArg = args[0];
        if (
            typeof firstArg === "string" &&
            firstArg.includes("React does not recognize the `fetchPriority` prop")
        ) {
            return;
        }
        originalConsoleError(...args);
    };
    globalThis.__nextImageFetchPriorityFilterInstalled = true;
}

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
                    <link rel="icon" type="image/png" href="/fav-main.png" />
                </Head>
                <PageLoader />
                <Component {...pageProps} />
            </Layout>
        </LanguageProvider>
    );
}

export default MyApp;
