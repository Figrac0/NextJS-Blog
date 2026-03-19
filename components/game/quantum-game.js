import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../../context/language-context";
import { getChallenges } from "../../lib/challenges";
import classes from "./quantum-game.module.css";

const GAME_UI = {
    en: {
        title: "JS Challenge",
        subtitle:
            "A quick JavaScript mini-game: drag the correct elements into the code.",
        successMessage: "🎉 Correct! +10 sec",
        errorMessage: "❌ Incorrect, try again!",
        rulesTitle: "📘 Game rules",
        rules: [
            {
                icon: "🎯",
                title: "Goal:",
                text: "Fill in the missing parts of the JavaScript code correctly.",
            },
            {
                icon: "⏱️",
                title: "Time:",
                text: "You have 60 seconds to complete all levels, and every correct answer adds 10 more seconds.",
            },
            {
                icon: "❤️",
                title: "Lives:",
                text: "You start with 3 lives. Every mistake costs 1 life.",
            },
            {
                icon: "💰",
                title: "Score:",
                text: "Each correct answer gives you 100 × current level points.",
            },
            {
                icon: "🔄",
                title: "How it works:",
                text: "Drag the options on the right into the empty places in the code.",
            },
            {
                icon: "💡",
                title: "Hints:",
                text: "Use the hint button if you get stuck on a challenge.",
            },
            {
                icon: "🎮",
                title: "Controls:",
                text: "Use Check to verify the answer, New game to restart, and Finish to return to the main screen.",
            },
        ],
        tipTitle: "Tip:",
        tipText: "Read the task title and the code comments carefully before checking the answer.",
        resultsTitle: "🎮 Game results",
        resultLabels: {
            correctAnswers: "Correct answers",
            wrongAnswers: "Wrong answers",
            accuracy: "Accuracy",
            totalTime: "Total time",
            finalScore: "Final score",
            completedLevels: "Completed levels",
        },
        buttons: {
            start: "🚀 Start game",
            rules: "📘 Game rules",
            playAgain: "🔄 Play again",
            close: "✕ Close",
            hint: "💡 Hint",
            check: "✓ Check",
            reset: "↻ New game",
            finish: "⏹ Finish",
        },
        stats: {
            score: "Score",
            lives: "Lives",
            time: "Time",
            level: "Level",
        },
        elementsTitle: "Answer options",
        hintTitle: "💡 Hint",
    },
    ru: {
        title: "JS Challenge",
        subtitle:
            "Небольшая JavaScript-игра: перетащи правильные элементы прямо в код.",
        successMessage: "🎉 Верно! +10 сек",
        errorMessage: "❌ Неправильно, попробуйте еще!",
        rulesTitle: "📘 Правила игры",
        rules: [
            {
                icon: "🎯",
                title: "Цель:",
                text: "Правильно заполнить пропуски в JavaScript-коде.",
            },
            {
                icon: "⏱️",
                title: "Время:",
                text: "У вас есть 60 секунд, чтобы пройти все уровни, и каждый правильный ответ добавляет еще 10 секунд.",
            },
            {
                icon: "❤️",
                title: "Жизни:",
                text: "Вы начинаете с 3 жизнями. За каждую ошибку теряете 1 жизнь.",
            },
            {
                icon: "💰",
                title: "Очки:",
                text: "За каждый правильный ответ вы получаете 100 × текущий уровень очков.",
            },
            {
                icon: "🔄",
                title: "Как играть:",
                text: "Перетаскивайте варианты справа в пустые места в коде.",
            },
            {
                icon: "💡",
                title: "Подсказки:",
                text: "Используйте кнопку подсказки, если застряли на задании.",
            },
            {
                icon: "🎮",
                title: "Управление:",
                text: "Кнопка «Проверить» проверяет ответ, «Новая игра» перезапускает игру, а «Закончить» возвращает на главный экран.",
            },
        ],
        tipTitle: "Совет:",
        tipText: "Перед проверкой внимательно читайте заголовок задания и комментарии в коде.",
        resultsTitle: "🎮 Результаты игры",
        resultLabels: {
            correctAnswers: "Правильных ответов",
            wrongAnswers: "Неправильных ответов",
            accuracy: "Точность",
            totalTime: "Общее время",
            finalScore: "Финальный счет",
            completedLevels: "Пройдено уровней",
        },
        buttons: {
            start: "🚀 Начать игру",
            rules: "📘 Правила игры",
            playAgain: "🔄 Играть снова",
            close: "✕ Закрыть",
            hint: "💡 Подсказка",
            check: "✓ Проверить",
            reset: "↻ Новая игра",
            finish: "⏹ Закончить",
        },
        stats: {
            score: "Счет",
            lives: "Жизни",
            time: "Время",
            level: "Уровень",
        },
        elementsTitle: "Варианты ответов",
        hintTitle: "💡 Подсказка",
    },
};

function createIdleGameState() {
    return {
        level: 1,
        score: 0,
        lives: 3,
        time: 60,
        completed: 0,
        isPlaying: false,
        gameFinished: false,
        correctAnswers: 0,
        wrongAnswers: 0,
        startTime: null,
        endTime: null,
    };
}

function createPlayingGameState() {
    return {
        ...createIdleGameState(),
        isPlaying: true,
        startTime: Date.now(),
    };
}

function QuantumGame() {
    const { locale } = useLanguage();
    const ui = locale === "ru" ? GAME_UI.ru : GAME_UI.en;
    const challenges = getChallenges(locale);

    const [gameState, setGameState] = useState(createIdleGameState());
    const [currentChallenge, setCurrentChallenge] = useState(null);
    const [draggingElement, setDraggingElement] = useState(null);
    const [droppedElements, setDroppedElements] = useState({});
    const [showHint, setShowHint] = useState(false);
    const [showRules, setShowRules] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const [message, setMessage] = useState("");
    const [isTransitioning, setIsTransitioning] = useState(false);
    const gameTimeRef = useRef(null);

    useEffect(() => {
        if (showRules || showHint) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }

        return () => {
            document.body.style.overflow = "unset";
        };
    }, [showRules, showHint]);

    const loadChallenge = (level) => {
        const challenge = challenges[level - 1];
        if (challenge) {
            setCurrentChallenge(challenge);
            setDroppedElements({});
            setMessage("");
            setShowHint(false);
        }
    };

    const returnToStartScreen = () => {
        clearInterval(gameTimeRef.current);
        setShowResult(false);
        setShowHint(false);
        setShowRules(false);
        setMessage("");
        setDraggingElement(null);
        setDroppedElements({});
        setCurrentChallenge(null);
        setIsTransitioning(false);
        setGameState(createIdleGameState());
    };

    const finishGame = ({ timeOverride } = {}) => {
        clearInterval(gameTimeRef.current);
        setShowHint(false);
        setMessage("");
        setDraggingElement(null);
        setGameState((prev) => ({
            ...prev,
            isPlaying: false,
            gameFinished: true,
            time:
                typeof timeOverride === "number"
                    ? timeOverride
                    : prev.time,
            endTime: Date.now(),
        }));
        setShowResult(true);
    };

    useEffect(() => {
        if (!gameState.isPlaying || gameState.gameFinished) {
            return undefined;
        }

        gameTimeRef.current = setInterval(() => {
            setGameState((prev) => {
                if (prev.time <= 1) {
                    clearInterval(gameTimeRef.current);
                    return {
                        ...prev,
                        time: 0,
                        isPlaying: false,
                        gameFinished: true,
                        endTime: Date.now(),
                    };
                }

                return {
                    ...prev,
                    time: prev.time - 1,
                };
            });
        }, 1000);

        return () => {
            clearInterval(gameTimeRef.current);
        };
    }, [gameState.isPlaying, gameState.gameFinished]);

    useEffect(() => {
        if (gameState.gameFinished && gameState.endTime && !showResult) {
            setShowHint(false);
            setMessage("");
            setShowResult(true);
        }
    }, [gameState.gameFinished, gameState.endTime, showResult]);

    useEffect(() => {
        if (gameState.isPlaying && !gameState.gameFinished) {
            loadChallenge(gameState.level);
        }
    }, [gameState.level, gameState.isPlaying, gameState.gameFinished]);

    useEffect(() => {
        if (gameState.isPlaying && !gameState.gameFinished) {
            const localizedChallenge = challenges[gameState.level - 1];
            if (localizedChallenge) {
                setCurrentChallenge(localizedChallenge);
            }
        }
    }, [locale, gameState.level, gameState.isPlaying, gameState.gameFinished]);

    const startGame = () => {
        setIsTransitioning(true);
        setTimeout(() => {
            setShowResult(false);
            setGameState(createPlayingGameState());
            setIsTransitioning(false);
        }, 500);
    };

    const restartGame = () => {
        setShowResult(false);
        startGame();
    };

    const exitGame = () => {
        returnToStartScreen();
    };

    const getElementColor = (value) => {
        if (
            [
                "+",
                "-",
                "*",
                "/",
                "===",
                "!==",
                ">",
                "<",
                "<=",
                ">=",
                "==",
                "!=",
                "?",
                ":",
                "&&",
                "||",
            ].includes(value)
        ) {
            return "#c084fc";
        }

        if (
            [
                "map",
                "filter",
                "reduce",
                "forEach",
                "push",
                "pop",
                "shift",
                "unshift",
            ].includes(value)
        ) {
            return "#60a5fa";
        }

        return "#f472b6";
    };

    const handleDragStart = (event, element) => {
        event.dataTransfer.setData("text/plain", element.id);
        setDraggingElement(element);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDrop = (event, slotId) => {
        event.preventDefault();
        const elementId = event.dataTransfer.getData("text/plain");
        const element = currentChallenge.elements.find(
            (item) => item.id === elementId,
        );

        if (element && slotId) {
            setDroppedElements((prev) => ({
                ...prev,
                [slotId]: element.value,
            }));
        }

        setDraggingElement(null);
    };

    const checkSolution = () => {
        if (!currentChallenge) {
            return;
        }

        let correct = 0;
        currentChallenge.slots.forEach((slot) => {
            if (droppedElements[slot.id] === slot.correct) {
                correct += 1;
            }
        });

        if (correct === currentChallenge.slots.length) {
            setMessage(ui.successMessage);
            setGameState((prev) => ({
                ...prev,
                score: prev.score + 100 * prev.level,
                completed: prev.completed + 1,
                correctAnswers: prev.correctAnswers + 1,
                time: prev.time + 10,
            }));

            setTimeout(() => {
                if (gameState.level < challenges.length) {
                    setGameState((prev) => ({
                        ...prev,
                        level: prev.level + 1,
                    }));
                } else {
                    finishGame();
                }

                setMessage("");
            }, 1500);

            return;
        }

        setMessage(ui.errorMessage);
        setGameState((prev) => ({
            ...prev,
            lives: prev.lives - 1,
            score: Math.max(0, prev.score - 50),
            wrongAnswers: prev.wrongAnswers + 1,
        }));

        if (gameState.lives <= 1) {
            finishGame();
        } else {
            setTimeout(() => {
                setMessage("");
            }, 1500);
        }
    };

    const resetGame = () => {
        clearInterval(gameTimeRef.current);
        setShowResult(false);
        setMessage("");
        setShowHint(false);
        setDroppedElements({});
        setDraggingElement(null);
        setGameState(createPlayingGameState());
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    const formatTotalTime = (startTime, endTime) => {
        if (!startTime || !endTime) {
            return "0:00";
        }

        const totalSeconds = Math.floor((endTime - startTime) / 1000);
        return formatTime(totalSeconds);
    };

    const calculateAccuracy = () => {
        const totalAnswers = gameState.correctAnswers + gameState.wrongAnswers;
        if (totalAnswers === 0) {
            return 100;
        }

        return Math.round((gameState.correctAnswers / totalAnswers) * 100);
    };

    const renderCodeWithSlots = () => {
        if (!currentChallenge) {
            return null;
        }

        const lines = currentChallenge.code.split("\n");
        let slotIndex = 0;

        return lines.map((line, lineIndex) => {
            if (line.includes("___")) {
                const slotCount = (line.match(/___/g) || []).length;
                let processedLine = line;
                const lineElements = [];

                for (let index = 0; index < slotCount; index += 1) {
                    const slotId = currentChallenge.slots[slotIndex]?.id;
                    const parts = processedLine.split("___");

                    lineElements.push(
                        <span key={`text-${index}`}>{parts[0]}</span>,
                    );
                    lineElements.push(
                        <span
                            key={`slot-${index}`}
                            className={classes.codeSlot}
                            onDragOver={handleDragOver}
                            onDrop={(event) => handleDrop(event, slotId)}
                            style={{
                                display: "inline-block",
                                minWidth: "60px",
                                margin: "0 4px",
                                verticalAlign: "middle",
                            }}>
                            {droppedElements[slotId] || "___"}
                        </span>,
                    );

                    processedLine = parts.slice(1).join("___");
                    slotIndex += 1;
                }

                lineElements.push(<span key="remaining">{processedLine}</span>);

                return (
                    <div
                        key={lineIndex}
                        className={`${classes.codeLine} ${classes.highlighted}`}>
                        {lineElements}
                    </div>
                );
            }

            let highlightedLine = line;
            highlightedLine = highlightedLine.replace(
                /function|return|let|const|var|if|else|for|while/g,
                (match) =>
                    `<span class="${classes.codeKeyword}">${match}</span>`,
            );
            highlightedLine = highlightedLine.replace(
                /(\d+)/g,
                (match) =>
                    `<span class="${classes.codeNumber}">${match}</span>`,
            );
            highlightedLine = highlightedLine.replace(
                /('.*?'|".*?")/g,
                (match) =>
                    `<span class="${classes.codeString}">${match}</span>`,
            );
            highlightedLine = highlightedLine.replace(
                /(=>)|(%|&|\||\^|~)/g,
                (match) =>
                    `<span class="${classes.codeOperator}">${match}</span>`,
            );

            return (
                <div key={lineIndex} className={classes.codeLine}>
                    <span
                        className={classes.codeLineText}
                        dangerouslySetInnerHTML={{ __html: highlightedLine }}
                    />
                </div>
            );
        });
    };

    const resultStats = [
        {
            icon: "✅",
            value: gameState.correctAnswers,
            label: ui.resultLabels.correctAnswers,
        },
        {
            icon: "❌",
            value: gameState.wrongAnswers,
            label: ui.resultLabels.wrongAnswers,
        },
        {
            icon: "🎯",
            value: `${calculateAccuracy()}%`,
            label: ui.resultLabels.accuracy,
        },
        {
            icon: "⏱️",
            value: formatTotalTime(gameState.startTime, gameState.endTime),
            label: ui.resultLabels.totalTime,
        },
        {
            icon: "💰",
            value: gameState.score,
            label: ui.resultLabels.finalScore,
        },
        {
            icon: "🏆",
            value: `${gameState.completed}/${challenges.length}`,
            label: ui.resultLabels.completedLevels,
        },
    ];

    if (showResult) {
        return (
            <div className={classes.resultsScreen}>
                <div className={classes.resultsContent}>
                    <h2 className={classes.resultsTitle}>{ui.resultsTitle}</h2>

                    <div className={classes.resultsStats}>
                        {resultStats.map((stat) => (
                            <div key={stat.label} className={classes.resultStat}>
                                <div className={classes.resultStatIcon}>{stat.icon}</div>
                                <div className={classes.resultStatInfo}>
                                    <div className={classes.resultStatValue}>{stat.value}</div>
                                    <div className={classes.resultStatLabel}>{stat.label}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className={classes.resultsActions}>
                        <button
                            className={`${classes.controlButton} ${classes.playAgainButton}`}
                            onClick={restartGame}>
                            {ui.buttons.playAgain}
                        </button>
                        <button
                            className={`${classes.controlButton} ${classes.closeResultsButton}`}
                            onClick={returnToStartScreen}>
                            {ui.buttons.close}
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (!gameState.isPlaying || isTransitioning) {
        return (
            <>
                {showRules ? (
                    <>
                        <div
                            className={classes.modalOverlay}
                            onClick={() => setShowRules(false)}
                        />
                        <div className={classes.rulesModal}>
                            <div className={classes.modalContent}>
                                <button
                                    className={classes.closeModal}
                                    onClick={() => setShowRules(false)}>
                                    ×
                                </button>
                                <h2 className={classes.modalTitle}>{ui.rulesTitle}</h2>
                                <div className={classes.modalBody}>
                                    <ul className={classes.rulesList}>
                                        {ui.rules.map((rule) => (
                                            <li key={rule.title}>
                                                <span className={classes.ruleIcon}>
                                                    {rule.icon}
                                                </span>
                                                <div>
                                                    <strong>{rule.title}</strong> {rule.text}
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className={classes.rulesTip}>
                                        <span className={classes.tipIcon}>💡</span>
                                        <div>
                                            <strong>{ui.tipTitle}</strong> {ui.tipText}
                                        </div>
                                    </div>
                                </div>
                                <div className={classes.modalFooter}></div>
                            </div>
                        </div>
                    </>
                ) : null}

                <div
                    className={`${classes.startScreen} ${isTransitioning ? classes.fadeOut : ""}`}>
                    <div className={classes.startContent}>
                        <h1 className={classes.gameTitle}>{ui.title}</h1>
                        <p className={classes.gameSubtitle}>{ui.subtitle}</p>

                        <div className={classes.startButtons}>
                            <button
                                className={`${classes.controlButton} ${classes.startButton}`}
                                onClick={startGame}>
                                {ui.buttons.start}
                            </button>

                            <button
                                className={`${classes.controlButton} ${classes.rulesButton}`}
                                onClick={() => setShowRules(true)}>
                                {ui.buttons.rules}
                            </button>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    if (!currentChallenge) {
        return null;
    }

    return (
        <>
            {showHint ? (
                <>
                    <div
                        className={classes.modalOverlay}
                        onClick={() => setShowHint(false)}
                    />
                    <div className={classes.hintModal}>
                        <div className={classes.modalContent}>
                            <button
                                className={classes.closeModal}
                                onClick={() => setShowHint(false)}>
                                ×
                            </button>
                            <h2 className={classes.modalTitle}>{ui.hintTitle}</h2>
                            <div className={classes.modalBody}>
                                <p>{currentChallenge.hint}</p>
                            </div>
                        </div>
                    </div>
                </>
            ) : null}

            <div className={classes.gameContainer}>
                <div className={classes.gameHeader}>
                    <h1 className={classes.gameTitle}>{ui.title}</h1>
                    <div className={classes.gameStats}>
                        <div className={classes.statItem}>
                            <span className={classes.statValue}>{gameState.score}</span>
                            <span className={classes.statLabel}>{ui.stats.score}</span>
                        </div>
                        <div className={classes.statItem}>
                            <span className={classes.statValue}>{gameState.lives}</span>
                            <span className={classes.statLabel}>{ui.stats.lives}</span>
                        </div>
                        <div className={classes.statItem}>
                            <span className={classes.statValue}>{formatTime(gameState.time)}</span>
                            <span className={classes.statLabel}>{ui.stats.time}</span>
                        </div>
                        <div className={classes.statItem}>
                            <span className={classes.statValue}>
                                {gameState.level}/{challenges.length}
                            </span>
                            <span className={classes.statLabel}>{ui.stats.level}</span>
                        </div>
                    </div>
                </div>

                {message ? (
                    <div
                        className={`${classes.message} ${message.startsWith("🎉") ? classes.successMessage : classes.errorMessage}`}>
                        {message}
                    </div>
                ) : null}

                <div className={classes.gameMain}>
                    <div className={classes.codeArea}>
                        <h3 className={classes.codeTitle}>{currentChallenge.title}</h3>
                        <div className={classes.codeBlock}>{renderCodeWithSlots()}</div>
                    </div>

                    <div className={classes.elementsArea}>
                        <h3 className={classes.elementsTitle}>{ui.elementsTitle}</h3>
                        <div className={classes.elementsContainer}>
                            {currentChallenge.elements.map((element) => (
                                <div
                                    key={element.id}
                                    className={`${classes.floatingElement} ${draggingElement?.id === element.id ? classes.dragging : ""}`}
                                    style={{
                                        background: `linear-gradient(135deg, ${getElementColor(element.value)}30 0%, ${getElementColor(element.value)}60 100%)`,
                                        border: `1px solid ${getElementColor(element.value)}`,
                                        color: getElementColor(element.value),
                                    }}
                                    draggable
                                    onDragStart={(event) =>
                                        handleDragStart(event, element)
                                    }>
                                    {element.value}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className={classes.controlsPanel}>
                    <button
                        className={`${classes.controlButton} ${classes.hintButton}`}
                        onClick={() => setShowHint(true)}>
                        {ui.buttons.hint}
                    </button>

                    <button
                        className={`${classes.controlButton} ${classes.checkButton}`}
                        onClick={checkSolution}>
                        {ui.buttons.check}
                    </button>

                    <button
                        className={`${classes.controlButton} ${classes.resetButton}`}
                        onClick={resetGame}>
                        {ui.buttons.reset}
                    </button>

                    <button
                        className={`${classes.controlButton} ${classes.finishButton}`}
                        onClick={exitGame}>
                        {ui.buttons.finish}
                    </button>
                </div>
            </div>
        </>
    );
}

export default QuantumGame;
