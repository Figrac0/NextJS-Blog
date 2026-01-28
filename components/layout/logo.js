// components/layout/logo.js
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import classes from "./logo.module.css";

function Logo() {
    const [letters, setLetters] = useState([]);
    const [isHovered, setIsHovered] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isPlayingAnimation, setIsPlayingAnimation] = useState(false);
    const [showPulsar, setShowPulsar] = useState(false);
    const autoAnimationRef = useRef(null);
    const animationRef = useRef(null);
    const pauseTimerRef = useRef(null);
    const hoverTimeoutRef = useRef(null);
    const router = useRouter();
    const logoText = "My Next Blog";

    // Современные градиенты для каждой буквы
    const gradients = [
        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
        "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
        "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
        "linear-gradient(135deg, #fa709a 0%, #fee140 100%)", // x - особый градиент
        "linear-gradient(135deg, #30cfd0 0%, #330867 100%)",
        "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
        "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)",
        "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)",
        "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
        "linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)",
        "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)",
    ];

    // Современные типы анимаций с улучшенными параметрами
    const animationTypes = [
        { name: "neonPulse", duration: 5, intensity: 1.3 }, // M
        { name: "liquidFlow", duration: 5, intensity: 1.4 }, // y
        { name: "quantumFloat", duration: 5, intensity: 1.2 }, // N
        { name: "hologram", duration: 5, intensity: 1.3 }, // e
        { name: "pulsarStar", duration: 5, intensity: 1.8 }, // x - пульсар!
        { name: "cyberGlitch", duration: 5, intensity: 1.4 }, // t
        { name: "particleDrift", duration: 5, intensity: 1.2 }, // B
        { name: "synthWave", duration: 5, intensity: 1.3 }, // l
        { name: "quantumSpin", duration: 5, intensity: 1.6 }, // o
        { name: "neonVibe", duration: 5, intensity: 1.4 }, // g
        { name: "cyberPulse", duration: 5, intensity: 1.3 }, // [space]
    ];

    // Инициализация букв с уникальными анимациями
    useEffect(() => {
        const letterArray = logoText.split("").map((char, index) => ({
            id: index,
            char,
            gradient: gradients[index % gradients.length],
            animationType: animationTypes[index % animationTypes.length],
            baseX: 0,
            baseY: 0,
            x: 0,
            y: 0,
            rotation: 0,
            scale: 1,
            opacity: 1,
            blur: 0,
            isSpaced: char === " ",
            isAnimating: false,
            animationProgress: 0,
            // Смещения для эффекта взрывной волны (относительно буквы x)
            waveOffset: (index - 4) * 2.5, // x - это 4-я буква (индекс 4)
        }));
        setLetters(letterArray);

        // Запуск авто-анимации с паузами
        startAutoAnimationCycle();

        return () => {
            cleanupTimers();
        };
    }, []);

    // Очистка всех таймеров
    const cleanupTimers = () => {
        if (autoAnimationRef.current) {
            cancelAnimationFrame(autoAnimationRef.current);
        }
        if (animationRef.current) {
            clearTimeout(animationRef.current);
        }
        if (pauseTimerRef.current) {
            clearTimeout(pauseTimerRef.current);
        }
        if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current);
        }
    };

    // Цикл анимации с паузами
    const startAutoAnimationCycle = () => {
        const playAnimation = () => {
            setIsPlayingAnimation(true);

            const startTime = Date.now();
            const duration = 5000; // 5 секунд анимации

            const animate = () => {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);

                setLetters((prevLetters) =>
                    prevLetters.map((letter) => {
                        if (letter.isSpaced) return letter;

                        const t = progress * Math.PI * 2;

                        switch (letter.animationType.name) {
                            case "neonPulse": // M
                                return {
                                    ...letter,
                                    scale: 1 + Math.sin(t * 2) * 0.2,
                                    y: Math.sin(t * 3) * 5,
                                    opacity: 0.9 + Math.sin(t * 4) * 0.1,
                                    blur: Math.sin(t * 5) * 2,
                                };
                            case "liquidFlow": // y
                                return {
                                    ...letter,
                                    y: Math.sin(t * 2.5) * 8,
                                    rotation: Math.sin(t * 1.5) * 10,
                                    scale: 1 + Math.sin(t * 3) * 0.15,
                                    opacity: 0.9 + Math.sin(t * 3.5) * 0.1,
                                };
                            case "quantumFloat": // N
                                return {
                                    ...letter,
                                    x: Math.cos(t * 2) * 6,
                                    y: Math.sin(t * 1.8) * 4,
                                    rotation: Math.sin(t * 1.2) * 8,
                                    scale: 1 + Math.sin(t * 2.2) * 0.1,
                                };
                            case "hologram": // e
                                return {
                                    ...letter,
                                    opacity: 0.7 + Math.sin(t * 4) * 0.3,
                                    blur: Math.sin(t * 3) * 3,
                                    y: Math.sin(t * 2.3) * 5,
                                };
                            case "pulsarStar": // x - пульсар в авто-анимации
                                return {
                                    ...letter,
                                    scale: 1 + Math.sin(t * 4) * 0.2,
                                    rotation: t * 120,
                                    opacity: 0.8 + Math.sin(t * 5) * 0.2,
                                    blur: 1 + Math.sin(t * 4) * 2,
                                };
                            case "cyberGlitch": // t
                                return {
                                    ...letter,
                                    x: Math.random() * 3 - 1.5,
                                    y: Math.random() * 3 - 1.5,
                                    opacity: 0.8 + Math.random() * 0.2,
                                    scale: 1 + Math.random() * 0.1,
                                };
                            case "particleDrift": // B
                                return {
                                    ...letter,
                                    x: Math.cos(t * 1.4) * 5,
                                    y: Math.sin(t * 1.6) * 4,
                                    rotation: Math.sin(t) * 5,
                                };
                            case "synthWave": // l
                                return {
                                    ...letter,
                                    y: Math.sin(t * 3.2) * 6,
                                    scale: 1 + Math.sin(t * 2.5) * 0.12,
                                    opacity: 0.85 + Math.sin(t * 3.8) * 0.15,
                                };
                            case "quantumSpin": // o
                                return {
                                    ...letter,
                                    rotation: t * 180,
                                    scale: 1 + Math.sin(t * 2) * 0.15,
                                    y: Math.sin(t * 2.2) * 4,
                                };
                            case "neonVibe": // g
                                return {
                                    ...letter,
                                    y: Math.sin(t * 2.7) * 8,
                                    rotation: Math.sin(t * 1.8) * 15,
                                    scale: 1 + Math.sin(t * 3.1) * 0.2,
                                };
                            default:
                                return letter;
                        }
                    }),
                );

                if (progress < 1) {
                    autoAnimationRef.current = requestAnimationFrame(animate);
                } else {
                    // Завершаем анимацию
                    resetLetters();
                    setIsPlayingAnimation(false);

                    // Пауза 20 секунд перед следующей анимацией
                    pauseTimerRef.current = setTimeout(() => {
                        playAnimation();
                    }, 20000);
                }
            };

            autoAnimationRef.current = requestAnimationFrame(animate);
        };

        // Начало первого цикла
        pauseTimerRef.current = setTimeout(() => {
            playAnimation();
        }, 1000); // Начальная задержка 1 секунда
    };

    // Сброс букв в исходное состояние
    const resetLetters = () => {
        setLetters((prevLetters) =>
            prevLetters.map((letter) => ({
                ...letter,
                x: 0,
                y: 0,
                rotation: 0,
                scale: 1,
                opacity: 1,
                blur: 0,
            })),
        );
    };

    // Эффект взрывной волны при наведении
    const handleHoverStart = () => {
        if (isAnimating || isPlayingAnimation) return;

        setIsHovered(true);
        setShowPulsar(true);

        // Останавливаем авто-анимацию
        if (autoAnimationRef.current) {
            cancelAnimationFrame(autoAnimationRef.current);
        }
        if (pauseTimerRef.current) {
            clearTimeout(pauseTimerRef.current);
        }

        // Эффект взрывной волны: буквы отодвигаются от x
        const hoveredLetters = letters.map((letter) => {
            if (letter.isSpaced || letter.id === 4) return letter; // Пропускаем пробелы и саму букву x

            // Буква x (индекс 4) становится пульсаром - увеличивается и светится
            if (letter.id === 4) {
                return {
                    ...letter,
                    scale: 1.8,
                    opacity: 1,
                    blur: 3,
                    rotation: 0,
                };
            }

            // Остальные буквы отодвигаются на 5-10px в зависимости от расстояния до x
            const offset = letter.waveOffset;
            return {
                ...letter,
                x: offset,
                scale: 1.05,
                opacity: 0.9,
                transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
            };
        });

        // Особый случай для буквы x - она становится пульсаром
        const xLetter = letters[4];
        if (xLetter) {
            hoveredLetters[4] = {
                ...xLetter,
                scale: 1.8,
                opacity: 1,
                blur: 4,
                rotation: 0,
                transition: "all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
            };
        }

        setLetters(hoveredLetters);
    };

    // Возврат при уходе мыши
    const handleHoverEnd = () => {
        if (isAnimating) return;

        setIsHovered(false);
        setShowPulsar(false);

        // Плавный возврат к исходному состоянию
        const returnedLetters = letters.map((letter) => ({
            ...letter,
            x: 0,
            y: 0,
            rotation: 0,
            scale: 1,
            opacity: 1,
            blur: 0,
            transition: "all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        }));

        setLetters(returnedLetters);

        // Возобновляем авто-анимацию через 0.6 секунды
        hoverTimeoutRef.current = setTimeout(() => {
            startAutoAnimationCycle();
        }, 600);
    };

    // Обработка клика по логотипу
    const handleClick = (e) => {
        e.preventDefault();
        e.stopPropagation();

        // Навигация без перезагрузки страницы
        router.push("/", undefined, { shallow: true });

        // Добавляем небольшой эффект при клике
        setIsHovered(true);
        setShowPulsar(true);

        // Кратковременный эффект пульсара
        setTimeout(() => {
            setIsHovered(false);
            setShowPulsar(false);
            resetLetters();
        }, 300);
    };

    // Очистка таймеров при размонтировании
    useEffect(() => {
        return cleanupTimers;
    }, []);

    return (
        <Link
            href="/"
            className={classes.logoLink}
            onClick={handleClick}
            aria-label="Go to home page">
            <div
                className={classes.logoContainer}
                onMouseEnter={handleHoverStart}
                onMouseLeave={handleHoverEnd}>
                {/* Световые эффекты */}
                <div className={classes.lightEffects}>
                    <div className={classes.lightBeam} />
                    <div
                        className={classes.lightBeam}
                        style={{ animationDelay: "0.8s" }}
                    />
                    <div
                        className={classes.lightBeam}
                        style={{ animationDelay: "1.6s" }}
                    />
                </div>

                {/* Контейнер букв */}
                <div className={classes.lettersContainer}>
                    {letters.map((letter) => (
                        <div
                            key={letter.id}
                            className={`${classes.letterWrapper} ${letter.isSpaced ? classes.spaceWrapper : ""}`}>
                            <span
                                className={`${classes.letter} ${letter.isSpaced ? classes.space : ""} ${classes[letter.animationType.name]}`}
                                style={{
                                    background: letter.gradient,
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    transform: `translate(${letter.x}px, ${letter.y}px) rotate(${letter.rotation}deg) scale(${letter.scale})`,
                                    filter: `drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1)) blur(${letter.blur}px)`,
                                    opacity: letter.opacity,
                                    transition:
                                        letter.transition ||
                                        (isPlayingAnimation
                                            ? "transform 0.4s ease, opacity 0.3s ease, filter 0.3s ease"
                                            : "transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.4s ease, filter 0.4s ease"),
                                    animationPlayState: isPlayingAnimation
                                        ? "running"
                                        : "paused",
                                }}>
                                {letter.char}

                                {/* Эффект свечения буквы */}
                                {letter.id === 4 && isHovered && (
                                    <span
                                        className={classes.pulsarGlow}
                                        style={{ background: letter.gradient }}
                                    />
                                )}

                                {/* Стандартное свечение для других букв */}
                                {letter.id !== 4 && (
                                    <span
                                        className={classes.letterGlow}
                                        style={{ background: letter.gradient }}
                                    />
                                )}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Эффекты частиц при наведении */}
                {isHovered && (
                    <div className={classes.hoverParticles}>
                        {[...Array(8)].map((_, i) => (
                            <div
                                key={`particle-${i}`}
                                className={classes.hoverParticle}
                                style={{
                                    background: gradients[i % gradients.length],
                                    left: `${50 + Math.cos((i * 45 * Math.PI) / 180) * 30}%`,
                                    top: `${50 + Math.sin((i * 45 * Math.PI) / 180) * 30}%`,
                                    animationDelay: `${i * 0.1}s`,
                                    opacity: 0.7,
                                }}
                            />
                        ))}
                    </div>
                )}

                {/* Эффект пульсара для буквы x */}
                {showPulsar && (
                    <div className={classes.pulsarEffect}>
                        <div className={classes.pulsarRing} />
                        <div
                            className={classes.pulsarRing}
                            style={{ animationDelay: "0.2s" }}
                        />
                        <div
                            className={classes.pulsarRing}
                            style={{ animationDelay: "0.4s" }}
                        />
                        <div className={classes.pulsarRay} />
                        <div
                            className={classes.pulsarRay}
                            style={{ transform: "rotate(45deg)" }}
                        />
                        <div
                            className={classes.pulsarRay}
                            style={{ transform: "rotate(90deg)" }}
                        />
                        <div
                            className={classes.pulsarRay}
                            style={{ transform: "rotate(135deg)" }}
                        />
                    </div>
                )}

                {/* Энергетическое поле */}
                <div
                    className={`${classes.energyField} ${isHovered ? classes.active : ""}`}>
                    <div className={classes.fieldRing} />
                    <div
                        className={classes.fieldRing}
                        style={{ animationDelay: "0.15s" }}
                    />
                    <div
                        className={classes.fieldRing}
                        style={{ animationDelay: "0.3s" }}
                    />
                </div>
            </div>
        </Link>
    );
}

export default Logo;
