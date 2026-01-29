import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import classes from "./logo.module.css";

function Logo() {
    const [letters, setLetters] = useState([]);
    const [isHovered, setIsHovered] = useState(false);
    const [showPulsar, setShowPulsar] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const autoAnimationRef = useRef(null);
    const hoverTimeoutRef = useRef(null);
    const returnTimeoutRef = useRef(null);
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

    // Инициализация букв
    useEffect(() => {
        const letterArray = logoText.split("").map((char, index) => ({
            id: index,
            char,
            gradient: gradients[index % gradients.length],
            baseX: 0,
            baseY: 0,
            x: 0,
            y: 0,
            rotation: 0,
            scale: 1,
            opacity: 1,
            blur: 0,
            isSpaced: char === " ",
            animationProgress: 0,
            waveOffset: (index - 4) * 2.5,
        }));
        setLetters(letterArray);

        // Запуск авто-анимации через 1 секунду после загрузки
        setTimeout(() => {
            startAutoAnimationCycle();
        }, 1000);

        return () => {
            cleanupTimers();
        };
    }, []);

    // Очистка всех таймеров
    const cleanupTimers = () => {
        if (autoAnimationRef.current) {
            clearTimeout(autoAnimationRef.current);
        }
        if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current);
        }
        if (returnTimeoutRef.current) {
            clearTimeout(returnTimeoutRef.current);
        }
    };

    // Анимация отдельной буквы
    const animateLetter = (letter, progress) => {
        const t = progress * Math.PI * 2;
        const letterIndex = letter.id;

        switch (letterIndex) {
            case 0: // M - neonPulse
                return {
                    ...letter,
                    scale: 1 + Math.sin(t * 2) * 0.2,
                    y: Math.sin(t * 3) * 5,
                    opacity: 0.9 + Math.sin(t * 4) * 0.1,
                    blur: Math.sin(t * 5) * 2,
                };
            case 1: // y - liquidFlow
                return {
                    ...letter,
                    y: Math.sin(t * 2.5) * 8,
                    rotation: Math.sin(t * 1.5) * 10,
                    scale: 1 + Math.sin(t * 3) * 0.15,
                    opacity: 0.9 + Math.sin(t * 3.5) * 0.1,
                };
            case 2: // N - quantumFloat
                return {
                    ...letter,
                    x: Math.cos(t * 2) * 6,
                    y: Math.sin(t * 1.8) * 4,
                    rotation: Math.sin(t * 1.2) * 8,
                    scale: 1 + Math.sin(t * 2.2) * 0.1,
                };
            case 3: // e - hologram
                return {
                    ...letter,
                    opacity: 0.7 + Math.sin(t * 4) * 0.3,
                    blur: Math.sin(t * 3) * 3,
                    y: Math.sin(t * 2.3) * 5,
                };
            case 4: // x - pulsarStar
                return {
                    ...letter,
                    scale: 1 + Math.sin(t * 4) * 0.2,
                    rotation: t * 120,
                    opacity: 0.8 + Math.sin(t * 5) * 0.2,
                    blur: 1 + Math.sin(t * 4) * 2,
                };
            case 5: // t - cyberGlitch
                return {
                    ...letter,
                    x: Math.sin(t * 3) * 3,
                    y: Math.cos(t * 2.5) * 2,
                    opacity: 0.8 + Math.sin(t * 5) * 0.2,
                    scale: 1 + Math.sin(t * 3) * 0.1,
                };
            case 6: // B - particleDrift
                return {
                    ...letter,
                    x: Math.cos(t * 1.4) * 5,
                    y: Math.sin(t * 1.6) * 4,
                    rotation: Math.sin(t) * 5,
                };
            case 7: // l - synthWave
                return {
                    ...letter,
                    y: Math.sin(t * 3.2) * 6,
                    scale: 1 + Math.sin(t * 2.5) * 0.12,
                    opacity: 0.85 + Math.sin(t * 3.8) * 0.15,
                };
            case 8: // o - quantumSpin
                return {
                    ...letter,
                    rotation: t * 180,
                    scale: 1 + Math.sin(t * 2) * 0.15,
                    y: Math.sin(t * 2.2) * 4,
                };
            case 9: // g - neonVibe
                return {
                    ...letter,
                    y: Math.sin(t * 2.7) * 8,
                    rotation: Math.sin(t * 1.8) * 15,
                    scale: 1 + Math.sin(t * 3.1) * 0.2,
                };
            default:
                return letter;
        }
    };

    // Цикл авто-анимации
    const startAutoAnimationCycle = () => {
        if (isHovered || isAnimating) return;

        setIsAnimating(true);
        const startTime = Date.now();
        const duration = 5000; // 5 секунд анимации

        const animateFrame = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);

            setLetters((prevLetters) =>
                prevLetters.map((letter) => {
                    if (letter.isSpaced) return letter;
                    return animateLetter(letter, progress);
                }),
            );

            if (progress < 1) {
                requestAnimationFrame(animateFrame);
            } else {
                // Анимация завершена
                finishAutoAnimation();
            }
        };

        requestAnimationFrame(animateFrame);
    };

    // Завершение авто-анимации
    const finishAutoAnimation = () => {
        // Плавно возвращаем буквы в исходное положение
        setLetters((prevLetters) =>
            prevLetters.map((letter) => ({
                ...letter,
                x: 0,
                y: 0,
                rotation: 0,
                scale: 1,
                opacity: 1,
                blur: 0,
                transition: "all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
            })),
        );

        setIsAnimating(false);

        // Ждем 10 секунд и запускаем снова
        autoAnimationRef.current = setTimeout(() => {
            startAutoAnimationCycle();
        }, 10000);
    };

    // Эффект взрывной волны при наведении
    const handleHoverStart = () => {
        // Останавливаем авто-анимацию
        cleanupTimers();
        setIsAnimating(false);

        setIsHovered(true);
        setShowPulsar(true);

        // Применяем эффект взрывной волны
        setLetters((prevLetters) =>
            prevLetters.map((letter) => {
                if (letter.isSpaced) return letter;

                // Буква x становится пульсаром
                if (letter.id === 4) {
                    return {
                        ...letter,
                        scale: 1.8,
                        opacity: 1,
                        blur: 3,
                        rotation: 0,
                        transition:
                            "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
                    };
                }

                // Остальные буквы отодвигаются
                const offset = letter.waveOffset;
                return {
                    ...letter,
                    x: offset,
                    scale: 1.05,
                    opacity: 0.9,
                    transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
                };
            }),
        );
    };

    // Возврат при уходе мыши
    const handleHoverEnd = () => {
        setIsHovered(false);
        setShowPulsar(false);

        // Плавный возврат
        setLetters((prevLetters) =>
            prevLetters.map((letter) => ({
                ...letter,
                x: 0,
                y: 0,
                rotation: 0,
                scale: 1,
                opacity: 1,
                blur: 0,
                transition: "all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
            })),
        );

        // Через 1 секунду возобновляем авто-анимацию
        hoverTimeoutRef.current = setTimeout(() => {
            startAutoAnimationCycle();
        }, 1000);
    };

    // Обработка клика
    const handleClick = (e) => {
        e.preventDefault();
        e.stopPropagation();

        // Навигация
        router.push("/", undefined, { shallow: true });

        // Быстрый эффект пульсара
        setIsHovered(true);
        setShowPulsar(true);

        // Кратковременный эффект
        setTimeout(() => {
            setIsHovered(false);
            setShowPulsar(false);
            // Возврат в исходное состояние
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
        }, 300);
    };

    // Очистка при размонтировании
    useEffect(() => {
        return () => {
            cleanupTimers();
        };
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
                                className={`${classes.letter} ${letter.isSpaced ? classes.space : ""}`}
                                style={{
                                    background: letter.gradient,
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    transform: `translate(${letter.x}px, ${letter.y}px) rotate(${letter.rotation}deg) scale(${letter.scale})`,
                                    filter: `drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1)) blur(${letter.blur}px)`,
                                    opacity: letter.opacity,
                                    transition:
                                        letter.transition || "all 0.3s ease",
                                }}>
                                {letter.char}

                                {/* Эффект свечения */}
                                {letter.id === 4 && isHovered ? (
                                    <span
                                        className={classes.pulsarGlow}
                                        style={{ background: letter.gradient }}
                                    />
                                ) : (
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

                {/* Эффект пульсара */}
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
