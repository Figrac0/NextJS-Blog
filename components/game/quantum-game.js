import { useEffect, useRef, useState } from "react";
import classes from "./quantum-game.module.css";
import { challenges } from "../../lib/challenges";

const QuantumGame = () => {
    const [gameState, setGameState] = useState({
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
    });

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
        if (showRules || showResult) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }

        return () => {
            document.body.style.overflow = "unset";
        };
    }, [showRules, showResult]);

    useEffect(() => {
        if (gameState.isPlaying && !gameState.gameFinished) {
            console.log("Таймер запущен, текущее время:", gameState.time);
            loadChallenge(gameState.level);

            if (!gameState.startTime) {
                setGameState((prev) => ({
                    ...prev,
                    startTime: Date.now(),
                }));
            }

            gameTimeRef.current = setInterval(() => {
                setGameState((prev) => {
                    console.log("Таймер тик, новое время:", prev.time - 1);
                    if (prev.time <= 0) {
                        finishGame();
                        return prev;
                    }
                    return { ...prev, time: prev.time - 1 };
                });
            }, 1000);
        }

        return () => {
            console.log("Таймер очищен");
            clearInterval(gameTimeRef.current);
        };
    }, [gameState.isPlaying, gameState.gameFinished]);

    useEffect(() => {
        if (gameState.isPlaying && !gameState.gameFinished) {
            loadChallenge(gameState.level);
        }
    }, [gameState.level, gameState.isPlaying, gameState.gameFinished]);

    const loadChallenge = (level) => {
        const challenge = challenges[level - 1];
        if (challenge) {
            setCurrentChallenge(challenge);
            setDroppedElements({});
            setMessage("");
            setShowHint(false);
        }
    };

    const startGame = () => {
        setIsTransitioning(true);
        setTimeout(() => {
            setGameState({
                level: 1,
                score: 0,
                lives: 3,
                time: 60,
                completed: 0,
                isPlaying: true,
                gameFinished: false,
                correctAnswers: 0,
                wrongAnswers: 0,
                startTime: Date.now(),
                endTime: null,
            });
            setIsTransitioning(false);
        }, 500);
    };

    const finishGame = () => {
        clearInterval(gameTimeRef.current);
        setGameState((prev) => ({
            ...prev,
            gameFinished: true,
            endTime: Date.now(),
        }));
        setShowResult(true);
    };

    const restartGame = () => {
        setShowResult(false);
        startGame();
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
        } else if (
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
        } else {
            return "#f472b6";
        }
    };

    const handleDragStart = (e, element) => {
        e.dataTransfer.setData("text/plain", element.id);
        setDraggingElement(element);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e, slotId) => {
        e.preventDefault();
        const elementId = e.dataTransfer.getData("text/plain");
        const element = currentChallenge.elements.find(
            (el) => el.id === elementId,
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
        if (!currentChallenge) return;

        let correct = 0;
        currentChallenge.slots.forEach((slot) => {
            if (droppedElements[slot.id] === slot.correct) {
                correct++;
            }
        });

        if (correct === currentChallenge.slots.length) {
            setMessage("🎉 Верно!");
            setGameState((prev) => ({
                ...prev,
                score: prev.score + 100 * prev.level,
                completed: prev.completed + 1,
                correctAnswers: prev.correctAnswers + 1,
            }));

            setTimeout(() => {
                setGameState((prev) => {
                    if (prev.level < challenges.length) {
                        return {
                            ...prev,
                            level: prev.level + 1,
                        };
                    } else {
                        clearInterval(gameTimeRef.current);
                        return {
                            ...prev,
                            gameFinished: true,
                            endTime: Date.now(),
                        };
                    }
                });
                setMessage("");
            }, 1500);
        } else {
            setMessage("❌ Неправильно, попробуйте еще!");
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
        }
    };

    const resetGame = () => {
        clearInterval(gameTimeRef.current);
        setGameState({
            level: 1,
            score: 0,
            lives: 3,
            time: 60,
            completed: 0,
            isPlaying: true,
            gameFinished: false,
            correctAnswers: 0,
            wrongAnswers: 0,
            startTime: Date.now(),
            endTime: null,
        });
        setMessage("");
        setShowHint(false);
        setDroppedElements({});
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    const formatTotalTime = (startTime, endTime) => {
        if (!startTime || !endTime) return "0:00";
        const totalSeconds = Math.floor((endTime - startTime) / 1000);
        return formatTime(totalSeconds);
    };

    const calculateAccuracy = () => {
        const total = gameState.correctAnswers + gameState.wrongAnswers;
        if (total === 0) return 100;
        return Math.round((gameState.correctAnswers / total) * 100);
    };

    const renderCodeWithSlots = () => {
        if (!currentChallenge) return null;

        const lines = currentChallenge.code.split("\n");
        let slotIndex = 0;

        return lines.map((line, lineIndex) => {
            if (line.includes("___")) {
                const slotCount = (line.match(/___/g) || []).length;
                let processedLine = line;
                const lineElements = [];

                for (let i = 0; i < slotCount; i++) {
                    const slotId = currentChallenge.slots[slotIndex]?.id;
                    const parts = processedLine.split("___");

                    lineElements.push(
                        <span key={`text-${i}`}>{parts[0]}</span>,
                    );

                    lineElements.push(
                        <span
                            key={`slot-${i}`}
                            className={classes.codeSlot}
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDrop(e, slotId)}
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
                    slotIndex++;
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

    if (showResult) {
        return (
            <>
                <div
                    className={classes.resultsOverlay}
                    onClick={() => setShowResult(false)}
                />
                <div className={classes.resultsModal}>
                    <div className={classes.resultsContent}>
                        <h2 className={classes.resultsTitle}>
                            🎮 Результаты игры
                        </h2>

                        <div className={classes.resultsStats}>
                            <div className={classes.resultStat}>
                                <div className={classes.resultStatIcon}>✅</div>
                                <div className={classes.resultStatInfo}>
                                    <div className={classes.resultStatValue}>
                                        {gameState.correctAnswers}
                                    </div>
                                    <div className={classes.resultStatLabel}>
                                        Правильных ответов
                                    </div>
                                </div>
                            </div>

                            <div className={classes.resultStat}>
                                <div className={classes.resultStatIcon}>❌</div>
                                <div className={classes.resultStatInfo}>
                                    <div className={classes.resultStatValue}>
                                        {gameState.wrongAnswers}
                                    </div>
                                    <div className={classes.resultStatLabel}>
                                        Неправильных ответов
                                    </div>
                                </div>
                            </div>

                            <div className={classes.resultStat}>
                                <div className={classes.resultStatIcon}>🎯</div>
                                <div className={classes.resultStatInfo}>
                                    <div className={classes.resultStatValue}>
                                        {calculateAccuracy()}%
                                    </div>
                                    <div className={classes.resultStatLabel}>
                                        Точность
                                    </div>
                                </div>
                            </div>

                            <div className={classes.resultStat}>
                                <div className={classes.resultStatIcon}>⏱️</div>
                                <div className={classes.resultStatInfo}>
                                    <div className={classes.resultStatValue}>
                                        {formatTotalTime(
                                            gameState.startTime,
                                            gameState.endTime,
                                        )}
                                    </div>
                                    <div className={classes.resultStatLabel}>
                                        Общее время
                                    </div>
                                </div>
                            </div>

                            <div className={classes.resultStat}>
                                <div className={classes.resultStatIcon}>💰</div>
                                <div className={classes.resultStatInfo}>
                                    <div className={classes.resultStatValue}>
                                        {gameState.score}
                                    </div>
                                    <div className={classes.resultStatLabel}>
                                        Финальный счет
                                    </div>
                                </div>
                            </div>

                            <div className={classes.resultStat}>
                                <div className={classes.resultStatIcon}>🏆</div>
                                <div className={classes.resultStatInfo}>
                                    <div className={classes.resultStatValue}>
                                        {gameState.completed}/
                                        {challenges.length}
                                    </div>
                                    <div className={classes.resultStatLabel}>
                                        Пройдено уровней
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={classes.resultsActions}>
                            <button
                                className={`${classes.controlButton} ${classes.playAgainButton}`}
                                onClick={restartGame}>
                                🔄 Играть снова
                            </button>
                            <button
                                className={`${classes.controlButton} ${classes.closeResultsButton}`}
                                onClick={() => setShowResult(false)}>
                                ✕ Закрыть
                            </button>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    if (!gameState.isPlaying || isTransitioning) {
        return (
            <>
                {showRules && (
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
                                <h2 className={classes.modalTitle}>
                                    📖 Правила игры
                                </h2>
                                <div className={classes.modalBody}>
                                    <ul className={classes.rulesList}>
                                        <li>
                                            <span className={classes.ruleIcon}>
                                                🎯
                                            </span>
                                            <div>
                                                <strong>Цель:</strong> Правильно
                                                заполнить пробелы в коде
                                                JavaScript
                                            </div>
                                        </li>
                                        <li>
                                            <span className={classes.ruleIcon}>
                                                ⏱️
                                            </span>
                                            <div>
                                                <strong>Время:</strong> У вас
                                                есть 60 секунд на прохождение
                                                всех уровней
                                            </div>
                                        </li>
                                        <li>
                                            <span className={classes.ruleIcon}>
                                                ❤️
                                            </span>
                                            <div>
                                                <strong>Жизни:</strong>{" "}
                                                Начинаете с 3 жизнями. За ошибку
                                                теряете 1 жизнь
                                            </div>
                                        </li>
                                        <li>
                                            <span className={classes.ruleIcon}>
                                                💰
                                            </span>
                                            <div>
                                                <strong>Очки:</strong> За
                                                правильный ответ получаете 100 ×
                                                уровень очков
                                            </div>
                                        </li>
                                        <li>
                                            <span className={classes.ruleIcon}>
                                                🔄
                                            </span>
                                            <div>
                                                <strong>
                                                    Игровой процесс:
                                                </strong>{" "}
                                                Перетаскивайте элементы справа в
                                                пробелы в коде
                                            </div>
                                        </li>
                                        <li>
                                            <span className={classes.ruleIcon}>
                                                💡
                                            </span>
                                            <div>
                                                <strong>Подсказки:</strong>{" "}
                                                Используйте кнопку "Подсказка"
                                                если застряли
                                            </div>
                                        </li>
                                        <li>
                                            <span className={classes.ruleIcon}>
                                                🎮
                                            </span>
                                            <div>
                                                <strong>Управление:</strong>{" "}
                                                Проверяйте ответ кнопкой
                                                "Проверить"
                                            </div>
                                        </li>
                                    </ul>
                                    <div className={classes.rulesTip}>
                                        <span className={classes.tipIcon}>
                                            💡
                                        </span>
                                        <strong>Совет:</strong> Внимательно
                                        читайте комментарии в коде и заголовок
                                        задания!
                                    </div>
                                </div>
                                <div className={classes.modalFooter}></div>
                            </div>
                        </div>
                    </>
                )}

                <div
                    className={`${classes.startScreen} ${isTransitioning ? classes.fadeOut : ""}`}>
                    <div className={classes.startContent}>
                        <h1 className={classes.gameTitle}>JS Challenge</h1>
                        <p className={classes.gameSubtitle}>
                            Игра на знание JavaScript. Перетащите правильные
                            элементы в код!
                        </p>

                        <div className={classes.startButtons}>
                            <button
                                className={`${classes.controlButton} ${classes.startButton}`}
                                onClick={startGame}>
                                🚀 Начать игру
                            </button>

                            <button
                                className={`${classes.controlButton} ${classes.rulesButton}`}
                                onClick={() => setShowRules(true)}>
                                📖 Правила игры
                            </button>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    if (!currentChallenge) return null;

    return (
        <>
            {showHint && (
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
                            <h2 className={classes.modalTitle}>💡 Подсказка</h2>
                            <div className={classes.modalBody}>
                                <p>{currentChallenge.hint}</p>
                            </div>
                        </div>
                    </div>
                </>
            )}

            <div className={classes.gameContainer}>
                <div className={classes.gameHeader}>
                    <h1 className={classes.gameTitle}>JS Challenge</h1>
                    <div className={classes.gameStats}>
                        <div className={classes.statItem}>
                            <span className={classes.statValue}>
                                {gameState.score}
                            </span>
                            <span className={classes.statLabel}>Счет</span>
                        </div>
                        <div className={classes.statItem}>
                            <span className={classes.statValue}>
                                {gameState.lives}
                            </span>
                            <span className={classes.statLabel}>Жизни</span>
                        </div>
                        <div className={classes.statItem}>
                            <span className={classes.statValue}>
                                {formatTime(gameState.time)}
                            </span>
                            <span className={classes.statLabel}>Время</span>
                        </div>
                        <div className={classes.statItem}>
                            <span className={classes.statValue}>
                                {gameState.level}/{challenges.length}
                            </span>
                            <span className={classes.statLabel}>Уровень</span>
                        </div>
                    </div>
                </div>

                {message && (
                    <div
                        className={`${classes.message} ${message.includes("🎉") ? classes.successMessage : classes.errorMessage}`}>
                        {message}
                    </div>
                )}

                <div className={classes.gameMain}>
                    <div className={classes.codeArea}>
                        <h3 className={classes.codeTitle}>
                            {currentChallenge.title}
                        </h3>
                        <div className={classes.codeBlock}>
                            {renderCodeWithSlots()}
                        </div>
                    </div>

                    <div className={classes.elementsArea}>
                        <h3 className={classes.elementsTitle}>
                            Варианты ответов
                        </h3>
                        <div className={classes.elementsContainer}>
                            {currentChallenge.elements.map((element) => (
                                <div
                                    key={element.id}
                                    className={`${classes.floatingElement} ${
                                        draggingElement?.id === element.id
                                            ? classes.dragging
                                            : ""
                                    }`}
                                    style={{
                                        background: `linear-gradient(135deg, ${getElementColor(element.value)}30 0%, ${getElementColor(element.value)}60 100%)`,
                                        border: `1px solid ${getElementColor(element.value)}`,
                                        color: getElementColor(element.value),
                                    }}
                                    draggable
                                    onDragStart={(e) =>
                                        handleDragStart(e, element)
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
                        💡 Подсказка
                    </button>

                    <button
                        className={`${classes.controlButton} ${classes.checkButton}`}
                        onClick={checkSolution}>
                        ✓ Проверить
                    </button>

                    <button
                        className={`${classes.controlButton} ${classes.resetButton}`}
                        onClick={resetGame}>
                        ↻ Новая игра
                    </button>
                </div>
            </div>
        </>
    );
};

export default QuantumGame;
