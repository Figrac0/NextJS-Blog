import Head from "next/head";
import { Fragment } from "react";

import PostContent from "../../components/posts/post-detail/post-content";
import { getPostWithAllLanguages, getPostsFiles } from "../../lib/posts-util";

function PostDetailPage(props) {
    return (
        <Fragment>
            <Head>
                <title>{props.english.title}</title>
                <meta name="description" content={props.english.excerpt} />
            </Head>
            <PostContent
                english={props.english}
                russian={props.russian}
                hasRussianVersion={props.hasRussianVersion}
            />
        </Fragment>
    );
}

export function getStaticProps(context) {
    const { params } = context;
    const { slug } = params;

    // Получаем данные для обоих языков
    const postData = getPostWithAllLanguages(slug);

    return {
        props: {
            english: postData.english,
            russian: postData.russian,
            hasRussianVersion: postData.hasRussianVersion,
        },
        revalidate: 600,
    };
}

export function getStaticPaths() {
    const postFilenames = getPostsFiles();

    const slugs = postFilenames.map((fileName) =>
        fileName.replace(/\.md$/, "").replace(/\.(en|ru)$/, ""),
    );

    // Удаляем дубликаты
    const uniqueSlugs = [...new Set(slugs)];

    return {
        paths: uniqueSlugs.map((slug) => ({ params: { slug } })),
        fallback: false,
    };
}

export default PostDetailPage;
