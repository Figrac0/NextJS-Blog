// pages/posts/index.js
import Head from "next/head";
import { Fragment } from "react";
import { useLanguage } from "../../context/language-context";
import AllPosts from "../../components/posts/all-posts";
import { getAllPosts } from "../../lib/posts-util";

function AllPostsPage(props) {
    const { t } = useLanguage();

    return (
        <Fragment>
            <Head>
                <title>{t("allRepositories")}</title>
                <meta name="description" content={t("allPostsDescription")} />
            </Head>
            <AllPosts posts={props.posts} />
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

export default AllPostsPage;
