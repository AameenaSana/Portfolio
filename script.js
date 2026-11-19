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
