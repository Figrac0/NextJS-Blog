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
            // Очищаем все таймауты
            clearTimeout(timeoutRef.current);
            clearTimeout(visibleTimeoutRef.current);

            // Проверяем, быстрый ли это переход (внутренние ссылки с prefetch)
            const isQuickTransition =
                url === router.asPath ||
                url.includes("#") ||
                url.includes(router.pathname);

            setIsQuick(isQuickTransition);

            // Ждем 100мс перед показом - если загрузка быстрая, лоадер не покажется
            timeoutRef.current = setTimeout(() => {
                setLoading(true);

                // Еще небольшая задержка для плавного появления
                visibleTimeoutRef.current = setTimeout(() => {
                    setIsVisible(true);
                }, 50);
            }, 100);
        };

        const handleComplete = () => {
            // Очищаем таймауты
            clearTimeout(timeoutRef.current);
            clearTimeout(visibleTimeoutRef.current);

            // Быстро скрываем лоадер
            setIsVisible(false);

            // Ждем окончания анимации и сбрасываем состояние
            setTimeout(() => {
                setLoading(false);
                setIsQuick(false);
            }, 200);
        };

        // События маршрутизации
        router.events.on("routeChangeStart", handleStart);
        router.events.on("routeChangeComplete", handleComplete);
        router.events.on("routeChangeError", handleComplete);

        // Очистка при размонтировании
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
