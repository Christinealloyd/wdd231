document.addEventListener("DOMContentLoaded", () => {
  const gallery = document.querySelector(".gallery");
  const visitDisplay = document.getElementById("visitor-message");

  if (visitDisplay) {
    const lastVisit = localStorage.getItem("lastVisit");
    const now = Date.now();
    const MILLISECONDS_IN_A_DAY = 1000 * 60 * 60 * 24;

    if (!lastVisit) {
      visitDisplay.textContent = "Welcome! Let us know if you have any questions.";
    } else {
      const daysSince = Math.floor((now - parseInt(lastVisit)) / MILLISECONDS_IN_A_DAY);
      
      if (daysSince < 1) {
        visitDisplay.textContent = "Back so soon! Awesome!";
      } else if (daysSince === 1) {
        visitDisplay.textContent = "You last visited 1 day ago.";
      } else {
        visitDisplay.textContent = `You last visited ${daysSince} days ago.`;
      }
    }

    localStorage.setItem("lastVisit", now.toString());
  }

  if (gallery) {
    fetch("data/attractions.json")
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to load attractions data.");
        }
        return response.json();
      })
      .then(attractions => {
        attractions.forEach(attraction => {
          const card = document.createElement("section");
          card.classList.add("attraction-card");

          card.innerHTML = `
            <h3>${attraction.name}</h3>
            <img src="${attraction.image}" alt="${attraction.name}" loading="lazy">
            <p><strong>Address:</strong> ${attraction.address}</p>
            <p>${attraction.description}</p>
            <a href="${attraction.link}" target="_blank">Learn more</a>
          `;

          gallery.appendChild(card);
        });
      })
      .catch(error => {
        console.error("Error loading attractions:", error);
        gallery.innerHTML = "<p>Could not load attractions.</p>";
      });
  }
});
