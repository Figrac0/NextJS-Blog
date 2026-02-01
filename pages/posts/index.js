// pages/posts/index.js
import Head from "next/head";
import { Fragment } from "react";
import { useLanguage } from "../../context/language-context";
import AllPosts from "../../components/posts/all-posts";
import { getUniquePosts } from "../../lib/posts-util"; // Импортируем новую функцию
import Footer from "../../components/layout/footer";

function AllPostsPage(props) {
    const { t } = useLanguage();

    return (
        <Fragment>
            <Head>
                <title>{t("allRepositories")}</title>
                <meta name="description" content={t("allPostsDescription")} />
            </Head>
            <AllPosts posts={props.posts} />
            <Footer />
        </Fragment>
    );
}

export function getStaticProps() {
    // Используем getUniquePosts вместо getAllPosts
    const allPosts = getUniquePosts();

    return {
        props: {
            posts: allPosts,
        },
    };
}

export default AllPostsPage;
