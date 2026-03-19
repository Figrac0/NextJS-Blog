export function parseReadingTimeToMinutes(readingTime) {
    if (!readingTime) {
        return 0;
    }

    const value = String(readingTime).trim().toLowerCase();
    let totalMinutes = 0;

    const hourMatches = value.matchAll(
        /(\d+)\s*(h|hr|hrs|hour|hours|ч|час|часа|часов)/g,
    );
    for (const match of hourMatches) {
        totalMinutes += Number(match[1]) * 60;
    }

    const minuteMatches = value.matchAll(
        /(\d+)\s*(m|min|mins|minute|minutes|мин|минута|минуты|минут)/g,
    );
    for (const match of minuteMatches) {
        totalMinutes += Number(match[1]);
    }

    if (totalMinutes === 0) {
        const fallbackNumber = value.match(/\d+/);
        if (fallbackNumber) {
            totalMinutes = Number(fallbackNumber[0]);
        }
    }

    return totalMinutes;
}

export function formatTotalReadingTime(totalMinutes, locale = "en") {
    if (!totalMinutes) {
        return locale === "ru" ? "0 мин" : "0 min";
    }

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    if (hours === 0) {
        return locale === "ru" ? `${minutes} мин` : `${minutes} min`;
    }

    if (minutes === 0) {
        return locale === "ru" ? `${hours} ч` : `${hours}h`;
    }

    return locale === "ru"
        ? `${hours} ч ${minutes} мин`
        : `${hours}h ${minutes}m`;
}
