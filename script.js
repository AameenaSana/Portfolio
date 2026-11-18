const toggleButton = document.getElementById("dark-mode-toggle");

function applyTheme(isDark) {
    document.body.classList.toggle("dark-mode", isDark);
    toggleButton.setAttribute("aria-pressed", String(isDark));
}

try {
    applyTheme(localStorage.getItem("theme") === "dark");
} catch {
    applyTheme(false);
}

toggleButton.hidden = false;
toggleButton.addEventListener("click", () => {
    const isDark = !document.body.classList.contains("dark-mode");
    applyTheme(isDark);
    try {
        localStorage.setItem("theme", isDark ? "dark" : "light");
    } catch {
        // The theme remains active for this page when storage is unavailable.
    }
});

const calendar = document.getElementById("github-calendar");
const contributionSummary = document.getElementById("contribution-summary");
const contributionGrid = calendar.querySelector(".contribution-grid");
const dateFormat = new Intl.DateTimeFormat("en", { dateStyle: "long", timeZone: "UTC" });
const monthFormat = new Intl.DateTimeFormat("en", { month: "short", timeZone: "UTC" });

async function loadContributions(url) {
    const response = await fetch(url, { signal: AbortSignal.timeout(6000) });
    if (!response.ok) throw new Error("Contribution data is unavailable");
    const { contributions } = await response.json();
    if (!contributions?.length) throw new Error("Contribution data is empty");
    return contributions;
}

function renderContributions(days) {
    const fragment = document.createDocumentFragment();
    const firstDay = new Date(days[0].date + "T00:00:00Z");
    const lastDay = new Date(days.at(-1).date + "T00:00:00Z");
    let labelledMonth;
    let total = 0;

    for (const { date, count, level } of days) {
        const day = new Date(date + "T00:00:00Z");
        const offset = (day - firstDay) / 86400000 + firstDay.getUTCDay();
        const column = Math.floor(offset / 7) + 1;
        const month = monthFormat.format(day);

        if (day.getUTCDay() === 0 && month !== labelledMonth) {
            const label = document.createElement("span");
            label.className = "contribution-month";
            label.style.gridColumn = column;
            label.textContent = month;
            fragment.append(label);
            labelledMonth = month;
        }

        const square = document.createElement("span");
        square.className = "contribution-day level-" + level;
        square.style.gridColumn = column;
        square.style.gridRow = day.getUTCDay() + 2;
        square.title = `${count} contribution${count === 1 ? "" : "s"} on ${dateFormat.format(day)}`;
        fragment.append(square);
        total += count;
    }

    contributionGrid.replaceChildren(fragment);
    contributionSummary.textContent = `${total.toLocaleString()} contributions from ${dateFormat.format(firstDay)} to ${dateFormat.format(lastDay)}`;
    calendar.hidden = false;
}

loadContributions("images/github-contributions.json").then(renderContributions).catch(() => {})
    .then(() => loadContributions("https://github-contributions-api.jogruber.de/v4/AameenaSana?y=last"))
    .then(renderContributions)
    .catch(() => {
        // Keep the saved calendar visible if it loaded.
    });
