// components/ui/notification.js
import ReactDOM from "react-dom";
import { useLanguage } from "../../context/language-context";
import classes from "./notification.module.css";

function Notification(props) {
    const { t } = useLanguage();
    const { title, message, status } = props;

    let statusClasses = "";
    let icon = "";

    if (status === "success") {
        statusClasses = classes.success;
        icon = "✅";
    } else if (status === "error") {
        statusClasses = classes.error;
        icon = "❌";
    } else if (status === "pending") {
        statusClasses = classes.pending;
        icon = "⏳";
    }

    const cssClasses = `${classes.notification} ${statusClasses}`;

    return ReactDOM.createPortal(
        <div className={cssClasses}>
            <div className={classes.icon}>{icon}</div>
            <div className={classes.content}>
                <h3 className={classes.title}>{title}</h3>
                <p className={classes.message}>{message}</p>
            </div>
            <div className={classes.progressBar}></div>
        </div>,
        document.getElementById("notifications"),
    );
}

export default Notification;
