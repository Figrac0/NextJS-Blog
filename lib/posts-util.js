// lib/posts-util.js
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "posts");

export function getPostsFiles() {
    return fs.readdirSync(postsDirectory);
}

export function getPostData(postIdentifier) {
    const postSlug = postIdentifier.replace(/\.md$/, "");
    const filePath = path.join(postsDirectory, `${postSlug}.md`);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContent);

    const postData = {
        slug: postSlug,
        ...data,
        content,
    };

    return postData;
}

export function getAllPosts() {
    const postFiles = getPostsFiles();

    const allPosts = postFiles.map((postFile) => {
        return getPostData(postFile);
    });

    const sortedPosts = allPosts.sort((postA, postB) =>
        postA.date > postB.date ? -1 : 1,
    );

    return sortedPosts;
}

export function getFeaturedPosts() {
    const allPosts = getAllPosts();

    const featuredPosts = allPosts.filter((post) => post.isFeatured);

    return featuredPosts;
}

// Функция для получения постов по типу
export function getPostsByType(type) {
    const allPosts = getAllPosts();
    return allPosts.filter(post => post.type === type);
}

// Функция для получения всех уникальных технологий
export function getAllTechStack() {
    const allPosts = getAllPosts();
    const allTech = new Set();
    
    allPosts.forEach(post => {
        if (post.tech && Array.isArray(post.tech)) {
            post.tech.forEach(tech => allTech.add(tech));
        }
    });
    
    return Array.from(allTech);
}