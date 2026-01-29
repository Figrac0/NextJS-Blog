import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import classes from "./notification.module.css";

function Notification({ title, message, status, onClose }) {
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsExiting(true);
            setTimeout(() => {
                if (onClose) onClose();
            }, 300);
        }, 3000);

        return () => clearTimeout(timer);
    }, [onClose]);

    // Определяем иконку для каждого статуса
    const getIcon = () => {
        switch (status) {
            case "success":
                return (
                    <svg viewBox="0 0 24 24" fill="none">
                        <path
                            d="M20 6L9 17L4 12"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                );
            case "error":
                return (
                    <svg viewBox="0 0 24 24" fill="none">
                        <path
                            d="M18 6L6 18M6 6L18 18"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                );
            case "pending":
                return (
                    <svg viewBox="0 0 24 24" fill="none">
                        <circle
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                        />
                        <path
                            d="M12 6V12L16 14"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                );
            default:
                return null;
        }
    };

    const getProgressClass = () => {
        switch (status) {
            case "success":
                return classes.progressSuccess;
            case "error":
                return classes.progressError;
            case "pending":
                return classes.progressPending;
            default:
                return "";
        }
    };

    const getIconClass = () => {
        switch (status) {
            case "success":
                return classes.iconSuccess;
            case "error":
                return classes.iconError;
            case "pending":
                return classes.iconPending;
            default:
                return "";
        }
    };

    return ReactDOM.createPortal(
        <div
            className={`${classes.notification} ${isExiting ? classes.exiting : ""}`}>
            <div className={classes.glowEffect}></div>
            <div className={`${classes.icon} ${getIconClass()}`}>
                {getIcon()}
            </div>
            <div className={classes.content}>
                <h3 className={classes.title}>{title}</h3>
                <p className={classes.message}>{message}</p>
            </div>
            <div className={classes.progressContainer}>
                <div
                    className={`${classes.progressBar} ${getProgressClass()}`}></div>
            </div>
        </div>,
        document.getElementById("notifications"),
    );
}

export default Notification;
