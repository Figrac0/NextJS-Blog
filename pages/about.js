import fs from "fs";
import path from "path";
import { Fragment } from "react";
import Head from "next/head";
import { useLanguage } from "../context/language-context";
import AboutContent from "../components/about-page/about-content";
import Footer from "../components/layout/footer";
import { getLocalizedPreviewPosts } from "../lib/posts-util";
import { parseReadingTimeToMinutes } from "../lib/reading-time";

function createCertificateTitle(fileName) {
    return fileName
        .replace(/\.[^.]+$/, "")
        .replace(/_page-\d+$/i, "")
        .replace(/\bpage[- ]?\d+\b/gi, "")
        .replace(/[-_]+/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}

function AboutPage({ stats, techStack, techStackMap, certificates }) {
    const { locale } = useLanguage();

    const meta =
        locale === "ru"
            ? {
                  title: "Обо мне | Сергей Саблин",
                  description:
                      "Страница о Сергее Саблине: опыт, технологии, образование и современная карусель сертификатов.",
              }
            : {
                  title: "About | Sergey Sablin",
                  description:
                      "About Sergey Sablin: frontend software engineer focused on product interfaces, frontend architecture, and a modern certificate carousel.",
              };

    return (
        <Fragment>
            <Head>
                <title>{meta.title}</title>
                <meta name="description" content={meta.description} />
            </Head>
            <AboutContent
                stats={stats}
                techStack={techStack}
                techStackMap={techStackMap}
                certificates={certificates}
            />
            <Footer />
        </Fragment>
    );
}

export function getStaticProps() {
    const posts = getLocalizedPreviewPosts();
    const techStack = Array.from(
        new Set(posts.flatMap((post) => post.tech || [])),
    ).sort((first, second) => first.localeCompare(second, "en"));

    const techStackMap = techStack.reduce((accumulator, tag) => {
        accumulator[tag] = posts
            .filter((post) => Array.isArray(post.tech) && post.tech.includes(tag))
            .map((post) => post.slug);
        return accumulator;
    }, {});

    const projectPosts = posts.filter((post) => post.type === "project");
    const articlePosts = posts.filter((post) => post.type === "article");
    const tutorialPosts = posts.filter((post) => post.type === "tutorial");

    const totalStudyTime = projectPosts.reduce(
        (sum, post) => sum + parseReadingTimeToMinutes(post.readingTime),
        0,
    );

    const certificatesDirectory = path.join(
        process.cwd(),
        "public",
        "about",
        "certificates",
    );

    const certificates = fs.existsSync(certificatesDirectory)
        ? fs.readdirSync(certificatesDirectory)
              .filter((fileName) =>
                  /\.(jpg|jpeg|png|webp|avif)$/i.test(fileName),
              )
              .sort((first, second) => first.localeCompare(second, "ru"))
              .map((fileName, index) => ({
                  id: `${index + 1}-${fileName}`,
                  title: createCertificateTitle(fileName),
                  src: `/about/certificates/${encodeURIComponent(fileName)}`,
              }))
        : [];

    return {
        props: {
            stats: {
                totalPosts: posts.length,
                totalProjects: projectPosts.length,
                totalArticles: articlePosts.length,
                totalTutorials: tutorialPosts.length,
                totalStudyTime,
                totalTechnologies: techStack.length,
            },
            techStack,
            techStackMap,
            certificates,
        },
    };
}

export default AboutPage;
