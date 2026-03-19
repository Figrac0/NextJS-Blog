import dynamic from "next/dynamic";

const QuantumGame = dynamic(() => import("./quantum-game"), {
    ssr: false,
    loading: () => null,
});

function JavaScriptChallengeSection({ className = "" }) {
    return (
        <div className={className}>
            <QuantumGame />
        </div>
    );
}

export default JavaScriptChallengeSection;
