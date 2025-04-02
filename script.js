document.addEventListener("DOMContentLoaded", () => {
    const toggleButton = document.getElementById("dark-mode-toggle");
    const body = document.body;
    const icon = toggleButton.querySelector("i");

    // Check for saved theme in localStorage
    if (localStorage.getItem("theme") === "dark") {
        enableDarkMode();
    }

    toggleButton.addEventListener("click", () => {
        if (body.classList.contains("dark-mode")) {
            disableDarkMode();
        } else {
            enableDarkMode();
        }
    });

    function enableDarkMode() {
        body.classList.add("dark-mode");
        localStorage.setItem("theme", "dark");
        icon.classList.replace("fa-moon", "fa-sun"); // Switch to sun icon
    }

    function disableDarkMode() {
        body.classList.remove("dark-mode");
        localStorage.setItem("theme", "light");
        icon.classList.replace("fa-sun", "fa-moon"); // Switch back to moon icon
    }
});


//LATEST REPOS

const imgElement = document.querySelector(".github-activity"); // Use class instead of id
const toggleButton = document.querySelector("#theme-toggle");

toggleButton.addEventListener("click", () => {
    if (document.body.classList.toggle("dark-mode")) {
        imgElement.src = "https://github-contributions-api.deno.dev/AameenaSana.svg?theme=dark";
    } else {
        imgElement.src = "https://github-contributions-api.deno.dev/AameenaSana.svg?theme=light";
    }
});
