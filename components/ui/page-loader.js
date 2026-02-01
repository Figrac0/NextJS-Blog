import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import classes from "./page-loader.module.css";

function PageLoader() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isQuick, setIsQuick] = useState(false);
    const timeoutRef = useRef(null);
    const visibleTimeoutRef = useRef(null);

    useEffect(() => {
        const handleStart = (url) => {
            clearTimeout(timeoutRef.current);
            clearTimeout(visibleTimeoutRef.current);

            const isQuickTransition =
                url === router.asPath ||
                url.includes("#") ||
                url.includes(router.pathname);

            setIsQuick(isQuickTransition);

            timeoutRef.current = setTimeout(() => {
                setLoading(true);

                visibleTimeoutRef.current = setTimeout(() => {
                    setIsVisible(true);
                }, 50);
            }, 100);
        };

        const handleComplete = () => {
            clearTimeout(timeoutRef.current);
            clearTimeout(visibleTimeoutRef.current);

            setIsVisible(false);

            setTimeout(() => {
                setLoading(false);
                setIsQuick(false);
            }, 200);
        };

        router.events.on("routeChangeStart", handleStart);
        router.events.on("routeChangeComplete", handleComplete);
        router.events.on("routeChangeError", handleComplete);

        return () => {
            clearTimeout(timeoutRef.current);
            clearTimeout(visibleTimeoutRef.current);
            router.events.off("routeChangeStart", handleStart);
            router.events.off("routeChangeComplete", handleComplete);
            router.events.off("routeChangeError", handleComplete);
        };
    }, [router]);

    if (!loading) return null;

    return (
        <div
            className={`${classes.loader} ${isVisible ? classes.visible : ""} ${isQuick ? classes.quick : ""}`}
            aria-live="polite"
            aria-label="Loading page">
            <div className={classes.loaderRing}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div className={classes.loaderText}>
                {isQuick ? "Loading..." : "Preparing content..."}
            </div>
        </div>
    );
}

export default PageLoader;
