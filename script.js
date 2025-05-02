// Sample player data with enhanced details
const players = [
    {
        name: "John Doe",
        position: "Forward",
        age: 17,
        height: "5'11\"",
        weight: "165 lbs",
        strengths: ["Speed", "Finishing", "Dribbling"],
        achievements: ["Top Scorer 2024", "Youth League MVP"],
        bio: "A dynamic forward with a knack for scoring crucial goals.",
        photo: "players/john-doe.jpg",
        video: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
        name: "Mike Smith",
        position: "Midfielder",
        age: 20,
        height: "6'0\"",
        weight: "170 lbs",
        strengths: ["Vision", "Passing", "Work Rate"],
        achievements: ["Best Midfielder 2023"],
        bio: "A creative playmaker who controls the game's tempo.",
        photo: "players/mike-smith.jpg",
        video: "https://www.youtube.com/embed/3JZ_D3ELwOQ"
    },
    {
        name: "Alex Brown",
        position: "Defender",
        age: 23,
        height: "6'2\"",
        weight: "185 lbs",
        strengths: ["Tackling", "Aerial Duels", "Leadership"],
        achievements: ["Defensive Player of the Year 2024"],
        bio: "A strong and reliable center-back.",
        photo: "players/alex-brown.jpg",
        video: "https://www.youtube.com/embed/9bZkp7q19f0"
    },
    {
        name: "Sam Wilson",
        position: "Goalkeeper",
        age: 19,
        height: "6'3\"",
        weight: "180 lbs",
        strengths: ["Shot Stopping", "Reflexes", "Distribution"],
        achievements: ["Clean Sheet Record 2023"],
        bio: "A promising goalkeeper with excellent reflexes.",
        photo: "players/sam-wilson.jpg",
        video: "https://www.youtube.com/embed/k-MIAA8K5lY"
    }
];

// Navigation for section links
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        const href = link.getAttribute("href");
        const targetId = href.substring(1);
        console.log(`Section link clicked: ${href}, Target ID: ${targetId}`); // Debug

        // Handle section navigation (home, players, team, contact)
        if (["home", "players", "team", "contact"].includes(targetId)) {
            // Hide all sections
            document.querySelectorAll("section").forEach(section => {
                section.classList.add("hidden");
            });

            // Show target section
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.remove("hidden");
                console.log(`Showing section: ${targetId}`); // Debug
            }

            // Update active link in navigation
            document.querySelectorAll("nav a").forEach(navLink => {
                navLink.classList.remove("active");
                if (navLink.getAttribute("href") === href) {
                    navLink.classList.add("active");
                }
            });

            // Reset player list for Player Profiles
            if (targetId === "players") {
                document.getElementById("playerList").innerHTML = `
                    <p class="placeholder">Search for players using the search bar or filters above.</p>
                `;
                document.getElementById("searchBar").value = "";
                document.getElementById("positionFilter").value = "";
                document.getElementById("ageFilter").value = "";
            }

            // Reset team updates to main view
            if (targetId === "team") {
                const updatesContent = document.querySelector(".updates-content");
                const matchStats = document.querySelectorAll(".match-stats");
                if (updatesContent) {
                    updatesContent.classList.remove("hidden");
                    console.log("Showing updates-content"); // Debug
                }
                matchStats.forEach(stats => {
                    stats.classList.add("hidden");
                    console.log(`Hiding match-stats: ${stats.id}`); // Debug
                });
            }
        }
    });
});

// Handle match links and back links
document.querySelectorAll(".match-link, .back-link").forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        const matchId = link.getAttribute("data-match");
        const isBackLink = link.getAttribute("data-back");

        console.log(`Link clicked: ${matchId || isBackLink}`); // Debug

        const updatesContent = document.querySelector(".updates-content");
        const matchStats = document.querySelectorAll(".match-stats");

        if (matchId) {
            // Show specific match stats
            if (updatesContent) {
                updatesContent.classList.add("hidden");
                console.log("Hiding updates-content"); // Debug
            }
            matchStats.forEach(stats => {
                stats.classList.add("hidden");
                console.log(`Hiding match-stats: ${stats.id}`); // Debug
            });
            const targetStats = document.getElementById(matchId);
            if (targetStats) {
                targetStats.classList.remove("hidden");
                console.log(`Showing match-stats: ${matchId}`); // Debug
            }
        } else if (isBackLink) {
            // Show main updates content
            if (updatesContent) {
                updatesContent.classList.remove("hidden");
                console.log("Showing updates-content"); // Debug
            }
            matchStats.forEach(stats => {
                stats.classList.add("hidden");
                console.log(`Hiding match-stats: ${stats.id}`); // Debug
            });
        }
    });
});

// Player Profiles: Display Players
function displayPlayers(playerList) {
    const playerListDiv = document.getElementById("playerList");
    playerListDiv.innerHTML = "";

    if (playerList.length === 0) {
        playerListDiv.innerHTML = `
            <p class="placeholder">No players found. Try adjusting your search or filters.</p>
        `;
        return;
    }

    playerList.forEach(player => {
        const playerCard = document.createElement("div");
        playerCard.classList.add("player-card");
        playerCard.innerHTML = `
            <img src="${player.photo}" alt="${player.name} Photo">
            <h3>${player.name}</h3>
            <p><strong>Position:</strong> ${player.position}</p>
            <p><strong>Age:</strong> ${player.age}</p>
            <p><strong>Height:</strong> ${player.height}</p>
            <p><strong>Weight:</strong> ${player.weight}</p>
            <p><strong>Bio:</strong> ${player.bio}</p>
            <p><strong>Strengths:</strong></p>
            <ul>
                ${player.strengths.map(strength => `<li>${strength}</li>`).join('')}
            </ul>
            <p><strong>Achievements:</strong> ${player.achievements.join(', ')}</p>
            <div class="video-container">
                <iframe src="${player.video}" title="${player.name} Highlights" allowfullscreen></iframe>
            </div>
        `;
        playerListDiv.appendChild(playerCard);
    });
}

// Player Profiles: Search and Filter
function filterPlayers() {
    const searchTerm = document.getElementById("searchBar").value.toLowerCase();
    const positionFilter = document.getElementById("positionFilter").value;
    const ageFilter = document.getElementById("ageFilter").value;

    let filteredPlayers = players;

    // Filter by search term (name, strengths, achievements, bio)
    if (searchTerm) {
        filteredPlayers = filteredPlayers.filter(player =>
            player.name.toLowerCase().includes(searchTerm) ||
            player.strengths.some(strength => strength.toLowerCase().includes(searchTerm)) ||
            player.achievements.some(achievement => achievement.toLowerCase().includes(searchTerm)) ||
            player.bio.toLowerCase().includes(searchTerm)
        );
    }

    // Filter by position
    if (positionFilter) {
        filteredPlayers = filteredPlayers.filter(player =>
            player.position === positionFilter
        );
    }

    // Filter by age
    if (ageFilter) {
        filteredPlayers = filteredPlayers.filter(player => {
            if (ageFilter === "16-18") return player.age >= 16 && player.age <= 18;
            if (ageFilter === "19-21") return player.age >= 19 && player.age <= 21;
            if (ageFilter === "22+") return player.age >= 22;
        });
    }

    // Only display players if a search term or filter is applied
    if (searchTerm || positionFilter || ageFilter) {
        displayPlayers(filteredPlayers);
    } else {
        document.getElementById("playerList").innerHTML = `
            <p class="placeholder">Search for players using the search bar or filters above.</p>
        `;
    }
}

// Event Listeners for Search and Filters
document.getElementById("searchBar").addEventListener("input", filterPlayers);
document.getElementById("positionFilter").addEventListener("change", filterPlayers);
document.getElementById("ageFilter").addEventListener("change", filterPlayers);

// Contact Form Submission
document.getElementById("contactForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    // For now, just log the form data (you can integrate with a backend later)
    console.log("Contact Form Submitted:", { name, email, message });
    alert("Thank you for your submission! We'll get back to you soon.");

    // Reset form
    e.target.reset();
});