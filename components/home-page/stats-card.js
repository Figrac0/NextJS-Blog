// components/home-page/stats-card.js
import classes from './stats-card.module.css';

function StatsCard({ label, value, icon }) {
  return (
    <div className={classes.card}>
      <div className={classes.icon}>{icon}</div>
      <div className={classes.content}>
        <div className={classes.value}>{value}</div>
        <div className={classes.label}>{label}</div>
      </div>
    </div>
  );
}

export default StatsCard;