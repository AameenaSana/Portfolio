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

async function fetchGitHubRepos() {
    const username = "AameenaSana";  // Replace with your GitHub username
    const repoUrl = `https://api.github.com/users/${AameenaSana}/repos?sort=updated&per_page=6`;

    try {
        const response = await fetch(repoUrl);
        const repos = await response.json();

        let repoHTML = "";
        repos.forEach(repo => {
            repoHTML += `
                <div class="repo-item">
                    <h3>${repo.name}</h3>
                    <p>${repo.description ? repo.description : "No description available."}</p>
                    <a href="${repo.html_url}" target="_blank">View on GitHub</a>
                </div>
            `;
        });

        document.querySelector(".repos-list").innerHTML = repoHTML;

    } catch (error) {
        console.error("Error fetching repositories:", error);
        document.querySelector(".repos-list").innerHTML = "<p>Failed to load repositories.</p>";
    }
}

// Call the function on page load
fetchGitHubRepos();
