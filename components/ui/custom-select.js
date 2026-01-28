// components/ui/custom-select.js
import { useState, useRef, useEffect } from "react";
import { useLanguage } from "../../context/language-context";
import classes from "./custom-select.module.css";

function CustomSelect({
    label,
    value,
    onChange,
    options,
    placeholder = "Select an option",
    icon = "↕️",
    className = "",
}) {
    const { t } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedLabel, setSelectedLabel] = useState("");
    const selectRef = useRef(null);
    const dropdownRef = useRef(null);

    // Определяем label выбранной опции
    useEffect(() => {
        if (options && value) {
            const selectedOption = options.find((opt) => opt.value === value);
            if (selectedOption) {
                // Обрабатываем специальный формат с ( )
                let labelValue = selectedOption.label;

                // Если это строка с ( ) - это ключ перевода
                if (
                    typeof labelValue === "string" &&
                    labelValue.includes("(") &&
                    labelValue.includes(")")
                ) {
                    // Извлекаем ключ перевода: "sortOptions.newest( )" -> "sortOptions.newest"
                    const translationKey = labelValue.replace(
                        /\s*\(\s*\)/g,
                        "",
                    );
                    labelValue = t(translationKey);
                }
                // Если это функция - вызываем её
                else if (typeof labelValue === "function") {
                    labelValue = labelValue(t);
                }

                setSelectedLabel(labelValue);
            } else {
                // Для placeholder тоже обрабатываем ( ) если есть
                let processedPlaceholder = placeholder;
                if (
                    typeof processedPlaceholder === "string" &&
                    processedPlaceholder.includes("(") &&
                    processedPlaceholder.includes(")")
                ) {
                    const translationKey = processedPlaceholder.replace(
                        /\s*\(\s*\)/g,
                        "",
                    );
                    processedPlaceholder = t(translationKey);
                }
                setSelectedLabel(processedPlaceholder);
            }
        } else {
            // Для placeholder тоже обрабатываем ( ) если есть
            let processedPlaceholder = placeholder;
            if (
                typeof processedPlaceholder === "string" &&
                processedPlaceholder.includes("(") &&
                processedPlaceholder.includes(")")
            ) {
                const translationKey = processedPlaceholder.replace(
                    /\s*\(\s*\)/g,
                    "",
                );
                processedPlaceholder = t(translationKey);
            }
            setSelectedLabel(processedPlaceholder);
        }
    }, [value, options, placeholder, t]);

    // Закрытие при клике вне компонента
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                selectRef.current &&
                !selectRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Закрытие при нажатии Esc
    useEffect(() => {
        const handleEsc = (event) => {
            if (event.key === "Escape") {
                setIsOpen(false);
            }
        };

        document.addEventListener("keydown", handleEsc);
        return () => document.removeEventListener("keydown", handleEsc);
    }, []);

    // Прокрутка к выбранной опции при открытии
    useEffect(() => {
        if (isOpen && dropdownRef.current) {
            const selectedElement = dropdownRef.current.querySelector(
                `.${classes.optionSelected}`,
            );
            if (selectedElement) {
                selectedElement.scrollIntoView({ block: "nearest" });
            }
        }
    }, [isOpen]);

    const handleSelect = (option) => {
        onChange(option.value);
        setIsOpen(false);
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            toggleDropdown();
        } else if (event.key === "ArrowDown" && isOpen) {
            event.preventDefault();
            navigateOptions(1);
        } else if (event.key === "ArrowUp" && isOpen) {
            event.preventDefault();
            navigateOptions(-1);
        } else if (event.key === "Escape" && isOpen) {
            setIsOpen(false);
        }
    };

    const navigateOptions = (direction) => {
        if (!options || options.length === 0) return;

        const currentIndex = options.findIndex((opt) => opt.value === value);
        let newIndex = currentIndex + direction;

        if (newIndex < 0) newIndex = options.length - 1;
        if (newIndex >= options.length) newIndex = 0;

        onChange(options[newIndex].value);
    };

    // Функция для обработки label с учетом формата ( )
    const processLabel = (label) => {
        if (typeof label === "function") {
            return label(t);
        } else if (
            typeof label === "string" &&
            label.includes("(") &&
            label.includes(")")
        ) {
            // Обрабатываем формат "sortOptions.newest( )"
            const translationKey = label.replace(/\s*\(\s*\)/g, "");
            return t(translationKey);
        }
        return label;
    };

    return (
        <div
            className={`${classes.selectContainer} ${className} ${isOpen ? classes.open : ""}`}
            ref={selectRef}>
            {label && (
                <div className={classes.selectLabel}>
                    <span className={classes.labelIcon}>{icon}</span>
                    <span className={classes.labelText}>{label}</span>
                </div>
            )}

            <div
                className={classes.selectWrapper}
                onClick={toggleDropdown}
                onKeyDown={handleKeyDown}
                tabIndex={0}
                role="combobox"
                aria-expanded={isOpen}
                aria-haspopup="listbox"
                aria-label={label || placeholder}>
                <div className={classes.selectedValue}>
                    <span className={classes.valueText}>{selectedLabel}</span>
                    <span
                        className={`${classes.arrow} ${isOpen ? classes.arrowUp : ""}`}>
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none">
                            <path
                                d="M6 9L12 15L18 9"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </span>
                </div>

                {isOpen && (
                    <div
                        className={classes.dropdown}
                        ref={dropdownRef}
                        role="listbox">
                        <div className={classes.dropdownContent}>
                            {options && options.length > 0 ? (
                                options.map((option, index) => {
                                    const isSelected = value === option.value;
                                    const optionLabel = processLabel(
                                        option.label,
                                    );

                                    return (
                                        <div
                                            key={option.value}
                                            className={`${classes.option} ${isSelected ? classes.optionSelected : ""}`}
                                            onClick={() => handleSelect(option)}
                                            onMouseEnter={(e) =>
                                                e.currentTarget.classList.add(
                                                    classes.optionHover,
                                                )
                                            }
                                            onMouseLeave={(e) =>
                                                e.currentTarget.classList.remove(
                                                    classes.optionHover,
                                                )
                                            }
                                            role="option"
                                            aria-selected={isSelected}
                                            tabIndex={0}
                                            onKeyDown={(e) => {
                                                if (
                                                    e.key === "Enter" ||
                                                    e.key === " "
                                                ) {
                                                    e.preventDefault();
                                                    handleSelect(option);
                                                }
                                            }}>
                                            <span
                                                className={classes.optionCheck}>
                                                {isSelected && (
                                                    <svg
                                                        width="14"
                                                        height="14"
                                                        viewBox="0 0 24 24"
                                                        fill="none">
                                                        <path
                                                            d="M20 6L9 17L4 12"
                                                            stroke="currentColor"
                                                            strokeWidth="3"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    </svg>
                                                )}
                                            </span>
                                            <span
                                                className={classes.optionText}>
                                                {optionLabel}
                                            </span>
                                            {option.icon && (
                                                <span
                                                    className={
                                                        classes.optionIcon
                                                    }>
                                                    {option.icon}
                                                </span>
                                            )}
                                        </div>
                                    );
                                })
                            ) : (
                                <div className={classes.noOptions}>
                                    No options available
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Декоративные элементы */}
            <div className={classes.selectGlow}></div>
            <div className={classes.selectParticles}></div>
        </div>
    );
}

export default CustomSelect;
