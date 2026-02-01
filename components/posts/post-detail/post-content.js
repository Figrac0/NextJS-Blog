import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import atomDark from "react-syntax-highlighter/dist/cjs/styles/prism/atom-dark";
import ReactMarkdown from "react-markdown";

import javascript from "react-syntax-highlighter/dist/cjs/languages/prism/javascript";
import typescript from "react-syntax-highlighter/dist/cjs/languages/prism/typescript";
import jsx from "react-syntax-highlighter/dist/cjs/languages/prism/jsx";
import tsx from "react-syntax-highlighter/dist/cjs/languages/prism/tsx";
import json from "react-syntax-highlighter/dist/cjs/languages/prism/json";
import css from "react-syntax-highlighter/dist/cjs/languages/prism/css";
import scss from "react-syntax-highlighter/dist/cjs/languages/prism/scss";
import python from "react-syntax-highlighter/dist/cjs/languages/prism/python";
import bash from "react-syntax-highlighter/dist/cjs/languages/prism/bash";
import sql from "react-syntax-highlighter/dist/cjs/languages/prism/sql";
import markup from "react-syntax-highlighter/dist/cjs/languages/prism/markup";
import yaml from "react-syntax-highlighter/dist/cjs/languages/prism/yaml";
import markdown from "react-syntax-highlighter/dist/cjs/languages/prism/markdown";
import java from "react-syntax-highlighter/dist/cjs/languages/prism/java";
import csharp from "react-syntax-highlighter/dist/cjs/languages/prism/csharp";
import php from "react-syntax-highlighter/dist/cjs/languages/prism/php";
import c from "react-syntax-highlighter/dist/cjs/languages/prism/c";
import cpp from "react-syntax-highlighter/dist/cjs/languages/prism/cpp";
import rust from "react-syntax-highlighter/dist/cjs/languages/prism/rust";
import go from "react-syntax-highlighter/dist/cjs/languages/prism/go";
import swift from "react-syntax-highlighter/dist/cjs/languages/prism/swift";
import kotlin from "react-syntax-highlighter/dist/cjs/languages/prism/kotlin";
import graphql from "react-syntax-highlighter/dist/cjs/languages/prism/graphql";
import powershell from "react-syntax-highlighter/dist/cjs/languages/prism/powershell";
import shell from "react-syntax-highlighter/dist/cjs/languages/prism/shell-session";
import diff from "react-syntax-highlighter/dist/cjs/languages/prism/diff";
import nginx from "react-syntax-highlighter/dist/cjs/languages/prism/nginx";
import ini from "react-syntax-highlighter/dist/cjs/languages/prism/ini";
import toml from "react-syntax-highlighter/dist/cjs/languages/prism/toml";
import makefile from "react-syntax-highlighter/dist/cjs/languages/prism/makefile";
import docker from "react-syntax-highlighter/dist/cjs/languages/prism/docker";

SyntaxHighlighter.registerLanguage("javascript", javascript);
SyntaxHighlighter.registerLanguage("js", javascript);
SyntaxHighlighter.registerLanguage("typescript", typescript);
SyntaxHighlighter.registerLanguage("ts", typescript);
SyntaxHighlighter.registerLanguage("jsx", jsx);
SyntaxHighlighter.registerLanguage("tsx", tsx);
SyntaxHighlighter.registerLanguage("json", json);
SyntaxHighlighter.registerLanguage("css", css);
SyntaxHighlighter.registerLanguage("scss", scss);
SyntaxHighlighter.registerLanguage("sass", scss);
SyntaxHighlighter.registerLanguage("python", python);
SyntaxHighlighter.registerLanguage("py", python);
SyntaxHighlighter.registerLanguage("bash", bash);
SyntaxHighlighter.registerLanguage("sh", bash);
SyntaxHighlighter.registerLanguage("shell", bash);
SyntaxHighlighter.registerLanguage("sql", sql);
SyntaxHighlighter.registerLanguage("html", markup);
SyntaxHighlighter.registerLanguage("xml", markup);
SyntaxHighlighter.registerLanguage("yaml", yaml);
SyntaxHighlighter.registerLanguage("yml", yaml);
SyntaxHighlighter.registerLanguage("docker", docker);
SyntaxHighlighter.registerLanguage("dockerfile", docker);
SyntaxHighlighter.registerLanguage("markdown", markdown);
SyntaxHighlighter.registerLanguage("md", markdown);
SyntaxHighlighter.registerLanguage("java", java);
SyntaxHighlighter.registerLanguage("csharp", csharp);
SyntaxHighlighter.registerLanguage("cs", csharp);
SyntaxHighlighter.registerLanguage("php", php);
SyntaxHighlighter.registerLanguage("c", c);
SyntaxHighlighter.registerLanguage("cpp", cpp);
SyntaxHighlighter.registerLanguage("rust", rust);
SyntaxHighlighter.registerLanguage("rs", rust);
SyntaxHighlighter.registerLanguage("go", go);
SyntaxHighlighter.registerLanguage("swift", swift);
SyntaxHighlighter.registerLanguage("kotlin", kotlin);
SyntaxHighlighter.registerLanguage("kt", kotlin);
SyntaxHighlighter.registerLanguage("graphql", graphql);
SyntaxHighlighter.registerLanguage("gql", graphql);
SyntaxHighlighter.registerLanguage("powershell", powershell);
SyntaxHighlighter.registerLanguage("ps", powershell);
SyntaxHighlighter.registerLanguage("shell-session", shell);
SyntaxHighlighter.registerLanguage("console", shell);
SyntaxHighlighter.registerLanguage("diff", diff);
SyntaxHighlighter.registerLanguage("nginx", nginx);
SyntaxHighlighter.registerLanguage("conf", nginx);
SyntaxHighlighter.registerLanguage("ini", ini);
SyntaxHighlighter.registerLanguage("toml", toml);
SyntaxHighlighter.registerLanguage("makefile", makefile);
SyntaxHighlighter.registerLanguage("mk", makefile);

import { useLanguage } from "../../../context/language-context";
import PostHeader from "./post-header";
import classes from "./post-content.module.css";

function PostContent({ english, russian, hasRussianVersion }) {
    const { t, locale } = useLanguage();
    const [copied, setCopied] = useState(false);

    const currentLocale = locale;
    const currentPost =
        currentLocale === "ru" && hasRussianVersion && russian
            ? russian
            : english;

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const scrollToBottom = () => {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth",
        });
    };

    const customRenderers = {
        h1: ({ children }) => <h1>{children}</h1>,
        h2: ({ children }) => <h2>{children}</h2>,
        h3: ({ children }) => <h3>{children}</h3>,
        h4: ({ children }) => <h4>{children}</h4>,

        p: ({ node, children }) => {
            if (node.children[0]?.tagName === "img") {
                const image = node.children[0];
                return (
                    <div className={classes.imageContainer}>
                        <Image
                            src={`/images/posts/${currentPost.slug}/${image.properties.src}`}
                            alt={image.properties.alt || currentPost.title}
                            width={800}
                            height={400}
                            style={{ width: "100%", height: "auto" }}
                        />
                    </div>
                );
            }
            return <p>{children}</p>;
        },

        code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            const language = match ? match[1] : "";
            const codeText = String(children).replace(/\n$/, "");

            if (!inline && language) {
                return (
                    <div className={classes.codeBlock}>
                        <div className={classes.codeHeader}>
                            <span className={classes.codeLanguage}>
                                {language}
                            </span>
                            <button
                                className={classes.copyButton}
                                onClick={() => copyToClipboard(codeText)}>
                                {copied ? "✓ Copied!" : "Copy"}
                            </button>
                        </div>
                        <SyntaxHighlighter
                            style={atomDark}
                            language={language}
                            PreTag="div"
                            {...props}>
                            {codeText}
                        </SyntaxHighlighter>
                    </div>
                );
            }

            return (
                <code className={classes.inlineCode} {...props}>
                    {children}
                </code>
            );
        },

        ul: ({ children }) => <ul>{children}</ul>,
        ol: ({ children }) => <ol>{children}</ol>,
        li: ({ children }) => <li>{children}</li>,

        blockquote: ({ children }) => <blockquote>{children}</blockquote>,

        a: ({ href, children }) => (
            <a href={href} target="_blank" rel="noopener noreferrer">
                {children}
            </a>
        ),

        table: ({ children }) => <table>{children}</table>,
        thead: ({ children }) => <thead>{children}</thead>,
        tbody: ({ children }) => <tbody>{children}</tbody>,
        tr: ({ children }) => <tr>{children}</tr>,
        th: ({ children }) => <th>{children}</th>,
        td: ({ children }) => <td>{children}</td>,

        hr: () => <hr />,
    };

    const imagePath = `/images/posts/${currentPost.slug}/${currentPost.image}`;

    if (!hasRussianVersion && currentLocale === "ru") {
        return (
            <div className={classes.container}>
                <div className={classes.content}>
                    <div className={classes.noTranslation}>
                        <div className={classes.noTranslationIcon}>🌐</div>
                        <h2>Перевод на русский пока недоступен</h2>
                        <p className={classes.noTranslationText}>
                            Эта статья доступна только на английском языке.
                        </p>
                        <p className={classes.noTranslationInstruction}>
                            Чтобы прочитать эту статью, переключите язык на
                            английский в меню навигации.
                        </p>
                        <div className={classes.noTranslationSteps}>
                            <div className={classes.step}>
                                <span className={classes.stepNumber}>1</span>
                                <span className={classes.stepText}>
                                    Нажмите на флаг 🇷🇺 в правом верхнем углу
                                </span>
                            </div>
                            <div className={classes.step}>
                                <span className={classes.stepNumber}>2</span>
                                <span className={classes.stepText}>
                                    Выберите английский язык 🇺🇸
                                </span>
                            </div>
                            <div className={classes.step}>
                                <span className={classes.stepNumber}>3</span>
                                <span className={classes.stepText}>
                                    Страница автоматически перезагрузится
                                </span>
                            </div>
                        </div>
                        <div className={classes.noTranslationHelp}>
                            Если у вас возникли проблемы, обновите страницу
                            после смены языка.
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={classes.container}>
            <div className={classes.content}>
                <nav className={classes.breadcrumb}>
                    <div className={classes.breadcrumbItem}>
                        <Link href="/" className={classes.breadcrumbLink}>
                            {t("home")}
                        </Link>
                        <span className={classes.breadcrumbSeparator}>/</span>
                    </div>
                    <div className={classes.breadcrumbItem}>
                        <Link href="/posts" className={classes.breadcrumbLink}>
                            {t("posts")}
                        </Link>
                        <span className={classes.breadcrumbSeparator}>/</span>
                    </div>
                    <div className={classes.breadcrumbItem}>
                        <span className={classes.breadcrumbCurrent}>
                            {currentPost.title}
                        </span>
                        {hasRussianVersion && (
                            <span className={classes.languageIndicator}>
                                {currentLocale === "en" ? "🇺🇸" : "🇷🇺"}
                            </span>
                        )}
                    </div>
                </nav>

                <PostHeader
                    title={currentPost.title}
                    image={imagePath}
                    type={currentPost.type}
                    date={currentPost.date}
                    readingTime={currentPost.readingTime}
                    difficulty={currentPost.difficulty}
                    stats={currentPost.stats}
                    tech={currentPost.tech}
                    excerpt={currentPost.excerpt}
                />

                <div className={classes.articleContent}>
                    <div className={classes.markdownContent}>
                        <ReactMarkdown components={customRenderers}>
                            {currentPost.content}
                        </ReactMarkdown>
                    </div>
                </div>

                <div className={classes.actionsPanel}>
                    <Link href="/posts" className={classes.backButton}>
                        <span>←</span>
                        {t("backToRepositories")}
                    </Link>
                </div>
            </div>

            <div className={classes.floatingActions}>
                <button
                    className={classes.floatingButton}
                    onClick={scrollToTop}
                    aria-label="Scroll to top">
                    ↑
                </button>

                <button
                    className={classes.floatingButton}
                    onClick={scrollToBottom}
                    aria-label="Scroll to bottom">
                    ↓
                </button>
            </div>
        </div>
    );
}

export default PostContent;
