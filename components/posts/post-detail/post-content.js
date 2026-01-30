import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "../../../context/language-context";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import PostHeader from "./post-header";
import classes from "./post-content.module.css";
import LanguageSwitcher from "../../ui/language-switcher";

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
                {/* Хлебные крошки */}
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

                {/* Заголовок статьи */}
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

                {/* Основное содержимое */}
                <div className={classes.articleContent}>
                    <div className={classes.markdownContent}>
                        <ReactMarkdown components={customRenderers}>
                            {currentPost.content}
                        </ReactMarkdown>
                    </div>
                </div>

                {/* Панель действий - оставляем только кнопку назад */}
                <div className={classes.actionsPanel}>
                    <Link href="/posts" className={classes.backButton}>
                        <span>←</span>
                        {t("backToRepositories")}
                    </Link>
                </div>
            </div>

            {/* Плавающие кнопки - оставляем только кнопки прокрутки */}
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
