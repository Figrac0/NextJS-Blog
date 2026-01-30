// components/home-page/tech-badge.js
import classes from "./tech-badge.module.css";

function TechBadge({ name, isActive, onClick }) {
    return (
        <button
            className={`${classes.badge} ${isActive ? classes.active : ""}`}
            onClick={onClick}
            aria-pressed={isActive}>
            {name}
        </button>
    );
}

export default TechBadge;
