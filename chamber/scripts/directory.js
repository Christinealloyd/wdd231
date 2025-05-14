const yearSpan = document.getElementById("year");
yearSpan.textContent = new Date().getFullYear();

const lastModifiedSpan = document.getElementById("lastModified");
lastModifiedSpan.textContent = document.lastModified;

const directory = document.querySelector("#directory");
const gridButton = document.querySelector("#grid");
const listButton = document.querySelector("#list");

async function fetchMembers() {
  try {
    const response = await fetch("data/members.json");
    const members = await response.json();
    displayMembers(members);
  } catch (error) {
    console.error("Error loading member data:", error);
  }
}

function displayMembers(members) {
  directory.innerHTML = "";
  members.forEach(member => {
    const card = document.createElement("div");
    card.classList.add("member");

    card.innerHTML = `
      <img src="${member.image}" alt="${member.name} logo" />
      <h3>${member.name}</h3>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <a href="${member.website}" target="_blank">Visit Website</a>
      <p class="membership level${member.membership}">Membership Level: ${["", "Member", "Silver", "Gold"][member.membership]}</p>
    `;
    directory.appendChild(card);
  });
}

gridButton.addEventListener("click", () => {
  directory.classList.add("grid-view");
  directory.classList.remove("list-view");
});

listButton.addEventListener("click", () => {
  directory.classList.add("list-view");
  directory.classList.remove("grid-view");
});

fetchMembers();
