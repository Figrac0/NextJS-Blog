// lib/posts-util.js
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "posts");

export function getPostsFiles() {
    return fs.readdirSync(postsDirectory);
}

export function getUniquePostsFiles() {
    const allFiles = fs.readdirSync(postsDirectory);

    const uniqueSlugs = new Set();

    allFiles.forEach((file) => {
        const baseName = file
            .replace(/\.(en|ru)\.md$/, "")
            .replace(/\.md$/, "");

        uniqueSlugs.add(baseName);
    });

    return Array.from(uniqueSlugs);
}

export function getPostData(postIdentifier, locale = "en") {
    const postSlug = postIdentifier.replace(/\.(md|en\.md|ru\.md)$/, "");

    const fileWithLang = `${postSlug}.${locale}.md`;
    const filePathWithLang = path.join(postsDirectory, fileWithLang);

    if (fs.existsSync(filePathWithLang)) {
        const fileContent = fs.readFileSync(filePathWithLang, "utf-8");
        const { data, content } = matter(fileContent);

        return {
            slug: postSlug,
            ...data,
            content,
            locale: locale,
            hasRussianVersion: fs.existsSync(
                path.join(postsDirectory, `${postSlug}.ru.md`),
            ),
            isTranslation: locale !== "en",
        };
    }

    const filePath = path.join(postsDirectory, `${postSlug}.md`);
    if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, "utf-8");
        const { data, content } = matter(fileContent);

        return {
            slug: postSlug,
            ...data,
            content,
            locale: "en",
            hasRussianVersion: fs.existsSync(
                path.join(postsDirectory, `${postSlug}.ru.md`),
            ),
            isTranslation: false,
        };
    }

    throw new Error(`Post ${postSlug} not found`);
}

export function getUniquePosts(locale = "en") {
    const uniqueSlugs = getUniquePostsFiles();

    const uniquePosts = uniqueSlugs
        .map((slug) => {
            try {
                return getPostData(slug, locale);
            } catch (error) {
                console.warn(`Post ${slug} not found for locale ${locale}`);
                return null;
            }
        })
        .filter((post) => post !== null)
        .filter((post) => {
            if (post.locale !== "en" && post.hasRussianVersion) {
                return false;
            }
            return true;
        });

    const sortedPosts = uniquePosts.sort((postA, postB) =>
        postA.date > postB.date ? -1 : 1,
    );

    return sortedPosts;
}

export function getAllPosts(locale = "en") {
    const uniquePosts = getUniquePosts(locale);
    return uniquePosts;
}

export function getPostWithAllLanguages(postIdentifier) {
    const postSlug = postIdentifier.replace(/\.(md|en\.md|ru\.md)$/, "");

    const postData = {
        slug: postSlug,
        english: null,
        russian: null,
        hasRussianVersion: false,
    };

    // Английская версия (базовая .md)
    const enFilePath = path.join(postsDirectory, `${postSlug}.md`);
    if (fs.existsSync(enFilePath)) {
        const fileContent = fs.readFileSync(enFilePath, "utf-8");
        const { data, content } = matter(fileContent);
        postData.english = {
            slug: postSlug,
            ...data,
            content,
            locale: "en",
        };
    }

    // Английская версия (.en.md)
    const enMdFilePath = path.join(postsDirectory, `${postSlug}.en.md`);
    if (fs.existsSync(enMdFilePath)) {
        const fileContent = fs.readFileSync(enMdFilePath, "utf-8");
        const { data, content } = matter(fileContent);
        postData.english = {
            slug: postSlug,
            ...data,
            content,
            locale: "en",
        };
    }

    // Русская версия
    const ruFilePath = path.join(postsDirectory, `${postSlug}.ru.md`);
    if (fs.existsSync(ruFilePath)) {
        const fileContent = fs.readFileSync(ruFilePath, "utf-8");
        const { data, content } = matter(fileContent);
        postData.russian = {
            slug: postSlug,
            ...data,
            content,
            locale: "ru",
        };
        postData.hasRussianVersion = true;
    }

    return postData;
}

export function getFeaturedPosts() {
    const allPosts = getUniquePosts();
    const featuredPosts = allPosts.filter((post) => post.isFeatured);
    return featuredPosts;
}

export function getPostsByType(type) {
    const allPosts = getUniquePosts();
    return allPosts.filter((post) => post.type === type);
}

export function getAllTechStack() {
    const allPosts = getUniquePosts();
    const allTech = new Set();

    allPosts.forEach((post) => {
        if (post.tech && Array.isArray(post.tech)) {
            post.tech.forEach((tech) => allTech.add(tech));
        }
    });

    return Array.from(allTech);
}
