import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const QuantumGame = dynamic(() => import("./quantum-game"), {
    ssr: false,
    loading: () => null,
});

function JavaScriptChallengeSection({ className = "" }) {
    const containerRef = useRef(null);
    const [shouldRender, setShouldRender] = useState(false);

    useEffect(() => {
        if (shouldRender) {
            return undefined;
        }

        if (
            typeof window === "undefined" ||
            typeof IntersectionObserver === "undefined"
        ) {
            setShouldRender(true);
            return undefined;
        }

        const node = containerRef.current;
        if (!node) {
            return undefined;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (entry?.isIntersecting) {
                    setShouldRender(true);
                    observer.disconnect();
                }
            },
            { rootMargin: "300px 0px" },
        );

        observer.observe(node);

        return () => observer.disconnect();
    }, [shouldRender]);

    return (
        <div className={className} ref={containerRef}>
            {shouldRender ? <QuantumGame /> : null}
        </div>
    );
}

export default JavaScriptChallengeSection;
