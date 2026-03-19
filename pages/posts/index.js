// pages/posts/index.js
import Head from "next/head";
import { Fragment } from "react";
import { useLanguage } from "../../context/language-context";
import AllPosts from "../../components/posts/all-posts";
import { getLocalizedPreviewPosts } from "../../lib/posts-util";
import dynamic from "next/dynamic";

function AllPostsPage(props) {
    const { t } = useLanguage();

    const QuantumGame = dynamic(
        () => import("../../components/game/quantum-game"),
        {
            ssr: false,
            loading: () => <div>Loading game...</div>,
        },
    );

    return (
        <Fragment>
            <Head>
                <title>{t("allRepositories")}</title>
                <meta name="description" content={t("allPostsDescription")} />
            </Head>
            <AllPosts posts={props.posts} />
            <QuantumGame />
        </Fragment>
    );
}

export function getStaticProps() {
    const allPosts = getLocalizedPreviewPosts();

    return {
        props: {
            posts: allPosts,
        },
    };
}

export default AllPostsPage;
