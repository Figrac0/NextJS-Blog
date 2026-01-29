import { Fragment } from "react";
import Head from "next/head";
import { useLanguage } from "../context/language-context";
import FeaturedPosts from "../components/home-page/featured-posts";
import Hero from "../components/home-page/hero";
import QuantumGame from "../components/game/quantum-game";
import { getAllPosts } from "../lib/posts-util";

function HomePage(props) {
    const { t } = useLanguage();

    return (
        <Fragment>
            <Head>
                <title>{t("siteTitle") || "Figrac0 Blog"}</title>
                <meta name="description" content={t("siteDescription")} />
            </Head>
            <Hero />

            <FeaturedPosts posts={props.posts} />
            <QuantumGame />
        </Fragment>
    );
}

export function getStaticProps() {
    const allPosts = getAllPosts();

    return {
        props: {
            posts: allPosts,
        },
    };
}

export default HomePage;
