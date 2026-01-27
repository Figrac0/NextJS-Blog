// components/contact/contact-form.js
import { useState, useEffect } from "react";
import Image from "next/image";
import { useLanguage } from "../../context/language-context";
import Notification from "../ui/notification";
import classes from "./contact-form.module.css";

async function sendContactData(contactDetails) {
    const response = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(contactDetails),
        headers: {
            "Content-Type": "application/json",
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Something went wrong!");
    }
}

function ContactForm() {
    const { t } = useLanguage();
    const [enteredEmail, setEnteredEmail] = useState("");
    const [enteredName, setEnteredName] = useState("");
    const [enteredMessage, setEnteredMessage] = useState("");
    const [requestStatus, setRequestStatus] = useState(); // 'pending', 'success', 'error'
    const [requestError, setRequestError] = useState();
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (requestStatus === "success" || requestStatus === "error") {
            const timer = setTimeout(() => {
                setRequestStatus(null);
                setRequestError(null);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [requestStatus]);

    async function sendMessageHandler(event) {
        event.preventDefault();
        setIsSubmitting(true);
        setRequestStatus("pending");

        try {
            await sendContactData({
                email: enteredEmail,
                name: enteredName,
                message: enteredMessage,
            });
            setRequestStatus("success");
            setEnteredMessage("");
            setEnteredEmail("");
            setEnteredName("");
        } catch (error) {
            setRequestError(error.message);
            setRequestStatus("error");
        } finally {
            setIsSubmitting(false);
        }
    }

    let notification;

    if (requestStatus === "pending") {
        notification = {
            status: "pending",
            title: t("sendingMessage"),
            message: t("messageOnWay"),
        };
    }

    if (requestStatus === "success") {
        notification = {
            status: "success",
            title: t("success"),
            message: t("messageSent"),
        };
    }

    if (requestStatus === "error") {
        notification = {
            status: "error",
            title: t("error"),
            message: requestError,
        };
    }

    const handleEmailClick = () => {
        window.open(
            "https://mail.google.com/mail/?view=cm&fs=1&to=serjjiniuss@gmail.com",
            "_blank",
        );
    };

    const handleTelegramClick = () => {
        window.open("https://t.me/fajllovt42", "_blank");
    };

    const handlePortfolioClick = () => {
        window.open("https://figrac0.github.io", "_blank");
    };

    return (
        <section className={classes.contactSection}>
            <div className={classes.container}>
                <div className={classes.header}>
                    <div className={classes.titleWrapper}>
                        <h1 className={classes.title}>{t("contactTitle")}</h1>
                        <div className={classes.underline}></div>
                    </div>
                    <p className={classes.subtitle}>{t("projectInMind")}</p>
                </div>

                <div className={classes.formWrapper}>
                    <form
                        className={classes.form}
                        onSubmit={sendMessageHandler}>
                        <div className={classes.formGrid}>
                            <div className={classes.inputGroup}>
                                <label
                                    htmlFor="email"
                                    className={classes.label}>
                                    {t("yourEmail")}
                                    <span className={classes.required}>*</span>
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    className={classes.input}
                                    placeholder={t("emailPlaceholder")}
                                    required
                                    value={enteredEmail}
                                    onChange={(event) =>
                                        setEnteredEmail(event.target.value)
                                    }
                                    disabled={isSubmitting}
                                />
                                <div className={classes.inputUnderline}></div>
                            </div>

                            <div className={classes.inputGroup}>
                                <label htmlFor="name" className={classes.label}>
                                    {t("yourName")}
                                    <span className={classes.required}>*</span>
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    className={classes.input}
                                    placeholder={t("namePlaceholder")}
                                    required
                                    value={enteredName}
                                    onChange={(event) =>
                                        setEnteredName(event.target.value)
                                    }
                                    disabled={isSubmitting}
                                />
                                <div className={classes.inputUnderline}></div>
                            </div>
                        </div>

                        <div className={classes.inputGroup}>
                            <label htmlFor="message" className={classes.label}>
                                {t("yourMessage")}
                                <span className={classes.required}>*</span>
                            </label>
                            <textarea
                                id="message"
                                className={classes.textarea}
                                rows="6"
                                placeholder={t("messagePlaceholder")}
                                required
                                value={enteredMessage}
                                onChange={(event) =>
                                    setEnteredMessage(event.target.value)
                                }
                                disabled={isSubmitting}></textarea>
                            <div className={classes.inputUnderline}></div>
                        </div>

                        <div className={classes.actions}>
                            <button
                                type="submit"
                                className={classes.submitButton}
                                disabled={isSubmitting}>
                                {isSubmitting ? (
                                    <>
                                        <span
                                            className={classes.spinner}></span>
                                        {t("sendingMessage")}
                                    </>
                                ) : (
                                    <>
                                        <span className={classes.sendIcon}>
                                            ✉️
                                        </span>
                                        {t("sendMessage")}
                                    </>
                                )}
                            </button>
                        </div>
                    </form>

                    <div className={classes.contactInfo}>
                        <h3 className={classes.infoTitle}>{t("otherWays")}</h3>
                        <div className={classes.infoItems}>
                            <div
                                className={classes.infoItem}
                                onClick={handleEmailClick}>
                                <div className={classes.gifContainer}>
                                    <Image
                                        src="/gif/gmail.gif"
                                        alt="Gmail"
                                        width={40}
                                        height={40}
                                        className={classes.gif}
                                    />
                                </div>
                                <div>
                                    <h4>{t("emailTitle")}</h4>
                                    <p>serjjiniuss@gmail.com</p>
                                </div>
                            </div>
                            <div
                                className={classes.infoItem}
                                onClick={handleTelegramClick}>
                                <div className={classes.gifContainer}>
                                    <Image
                                        src="/gif/telegram.gif"
                                        alt="Telegram"
                                        width={40}
                                        height={40}
                                        className={classes.gif}
                                    />
                                </div>
                                <div>
                                    <h4>{t("telegramTitle")}</h4>
                                    <p>{t("telegramUsername")}</p>
                                </div>
                            </div>
                            <div
                                className={classes.infoItem}
                                onClick={handlePortfolioClick}>
                                <div className={classes.gifContainer}>
                                    <Image
                                        src="/gif/git.gif"
                                        alt="Portfolio"
                                        width={40}
                                        height={40}
                                        className={classes.gif}
                                    />
                                </div>
                                <div>
                                    <h4>{t("portfolioTitle")}</h4>
                                    <p>{t("portfolioUrl")}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {notification && (
                <Notification
                    status={notification.status}
                    title={notification.title}
                    message={notification.message}
                />
            )}
        </section>
    );
}

export default ContactForm;
