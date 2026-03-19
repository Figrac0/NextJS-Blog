import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "posts");
const shouldUsePostsCache = process.env.NODE_ENV === "production";

const directoryEntriesCache = new Map();
const fileExistenceCache = new Map();
const parsedMatterCache = new Map();
let uniquePostsFilesCache = null;

function getCachedValue(cache, key, factory) {
    if (!shouldUsePostsCache) {
        return factory();
    }

    if (cache.has(key)) {
        return cache.get(key);
    }

    const value = factory();
    cache.set(key, value);
    return value;
}

function cloneFrontmatterValue(value) {
    if (Array.isArray(value)) {
        return [...value];
    }

    if (value && typeof value === "object") {
        return { ...value };
    }

    return value;
}

function cloneFrontmatterData(data) {
    return Object.fromEntries(
        Object.entries(data).map(([key, value]) => [
            key,
            cloneFrontmatterValue(value),
        ]),
    );
}

function readDirectory(directoryPath) {
    const entries = getCachedValue(directoryEntriesCache, directoryPath, () =>
        fs.readdirSync(directoryPath),
    );

    return [...entries];
}

function fileExists(filePath) {
    return getCachedValue(fileExistenceCache, filePath, () =>
        fs.existsSync(filePath),
    );
}

function readMatterFile(filePath) {
    const parsed = getCachedValue(parsedMatterCache, filePath, () => {
        const fileContent = fs.readFileSync(filePath, "utf-8");
        return matter(fileContent);
    });

    return {
        data: cloneFrontmatterData(parsed.data),
        content: parsed.content,
    };
}

export function getPostsFiles() {
    return readDirectory(postsDirectory);
}

export function getUniquePostsFiles() {
    if (shouldUsePostsCache && uniquePostsFilesCache) {
        return [...uniquePostsFilesCache];
    }

    const uniqueSlugs = new Set();

    getPostsFiles().forEach((file) => {
        const baseName = file
            .replace(/\.(en|ru)\.md$/, "")
            .replace(/\.md$/, "");

        uniqueSlugs.add(baseName);
    });

    const uniqueFiles = Array.from(uniqueSlugs);

    if (shouldUsePostsCache) {
        uniquePostsFilesCache = uniqueFiles;
    }

    return [...uniqueFiles];
}

function getEnglishPostFilePath(postSlug) {
    const defaultEnglishPath = path.join(postsDirectory, `${postSlug}.md`);
    if (fileExists(defaultEnglishPath)) {
        return defaultEnglishPath;
    }

    const explicitEnglishPath = path.join(postsDirectory, `${postSlug}.en.md`);
    if (fileExists(explicitEnglishPath)) {
        return explicitEnglishPath;
    }

    return null;
}

function getRussianPostFilePath(postSlug) {
    const russianPath = path.join(postsDirectory, `${postSlug}.ru.md`);
    return fileExists(russianPath) ? russianPath : null;
}

function readPostFrontmatter(filePath, locale) {
    const { data } = readMatterFile(filePath);

    return {
        ...data,
        locale,
    };
}

function createPreviewTranslation(postData) {
    if (!postData) {
        return null;
    }

    return {
        title: postData.title,
        excerpt: postData.excerpt,
        readingTime: postData.readingTime ?? null,
        difficulty: postData.difficulty ?? null,
    };
}

export function getLocalizedPreviewPosts() {
    const uniqueSlugs = getUniquePostsFiles();

    const previewPosts = uniqueSlugs
        .map((slug) => {
            const englishFilePath = getEnglishPostFilePath(slug);
            if (!englishFilePath) {
                console.warn(`English post ${slug} not found`);
                return null;
            }

            const englishPost = readPostFrontmatter(englishFilePath, "en");
            const russianFilePath = getRussianPostFilePath(slug);
            const russianPost = russianFilePath
                ? readPostFrontmatter(russianFilePath, "ru")
                : null;

            const supportsRussianPreview =
                englishPost.type !== "tutorial" && !!russianPost;

            return {
                slug,
                ...englishPost,
                locale: "en",
                hasRussianVersion: !!russianPost,
                isTranslation: false,
                previewTranslations: {
                    en: createPreviewTranslation(englishPost),
                    ru: supportsRussianPreview
                        ? createPreviewTranslation(russianPost)
                        : null,
                },
            };
        })
        .filter((post) => post !== null);

    return previewPosts.sort((postA, postB) =>
        postA.date > postB.date ? -1 : 1,
    );
}

export function getPostData(postIdentifier, locale = "en") {
    const postSlug = postIdentifier.replace(/\.(md|en\.md|ru\.md)$/, "");

    const fileWithLang = `${postSlug}.${locale}.md`;
    const filePathWithLang = path.join(postsDirectory, fileWithLang);

    if (fileExists(filePathWithLang)) {
        const { data, content } = readMatterFile(filePathWithLang);

        return {
            slug: postSlug,
            ...data,
            content,
            locale,
            hasRussianVersion: fileExists(
                path.join(postsDirectory, `${postSlug}.ru.md`),
            ),
            isTranslation: locale !== "en",
        };
    }

    const filePath = path.join(postsDirectory, `${postSlug}.md`);
    if (fileExists(filePath)) {
        const { data, content } = readMatterFile(filePath);

        return {
            slug: postSlug,
            ...data,
            content,
            locale: "en",
            hasRussianVersion: fileExists(
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

    const enFilePath = path.join(postsDirectory, `${postSlug}.md`);
    if (fileExists(enFilePath)) {
        const { data, content } = readMatterFile(enFilePath);
        postData.english = {
            slug: postSlug,
            ...data,
            content,
            locale: "en",
        };
    }

    const enMdFilePath = path.join(postsDirectory, `${postSlug}.en.md`);
    if (fileExists(enMdFilePath)) {
        const { data, content } = readMatterFile(enMdFilePath);
        postData.english = {
            slug: postSlug,
            ...data,
            content,
            locale: "en",
        };
    }

    const ruFilePath = path.join(postsDirectory, `${postSlug}.ru.md`);
    if (fileExists(ruFilePath)) {
        const { data, content } = readMatterFile(ruFilePath);
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
