// pages/posts/index.js
import Head from "next/head";
import { Fragment } from "react";
import { useLanguage } from "../../context/language-context";
import AllPosts from "../../components/posts/all-posts";
import JavaScriptChallengeSection from "../../components/game/javascript-challenge-section";
import { getLocalizedPreviewPosts } from "../../lib/posts-util";

function AllPostsPage(props) {
    const { t } = useLanguage();

    return (
        <Fragment>
            <Head>
                <title>{t("allRepositories")}</title>
                <meta name="description" content={t("allPostsDescription")} />
            </Head>
            <AllPosts posts={props.posts} />
            <JavaScriptChallengeSection />
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
