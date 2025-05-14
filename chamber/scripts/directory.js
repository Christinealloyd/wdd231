const yearSpan = document.getElementById("year");
yearSpan.textContent = new Date().getFullYear();

const lastModifiedSpan = document.getElementById("lastModified");
lastModifiedSpan.textContent = document.lastModified;

const directory = document.querySelector("#directory");
const gridButton = document.querySelector("#grid");
const listButton = document.querySelector("#list");

let membersData = [];

async function fetchMembers() {
  try {
    const response = await fetch("data/members.json");
    membersData = await response.json();
    displayGridView(membersData); 
  } catch (error) {
    console.error("Error loading member data:", error);
  }
}

function displayGridView(members) {
  directory.innerHTML = "";
  directory.classList.add("grid-view");
  directory.classList.remove("list-view");

  members.forEach(member => {
    const card = document.createElement("div");
    card.classList.add("member");

    card.innerHTML = `
      <img src="${member.image}" alt="${member.name} logo" />
      <h3>${member.name}</h3>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <a href="${member.website}" target="_blank">Visit Website</a>
      <p class="membership level${member.membership}">
        Membership Level: ${["", "Member", "Silver", "Gold"][member.membership]}
      </p>
    `;

    directory.appendChild(card);
  });
}

function displayListView(members) {
  directory.innerHTML = "";
  directory.classList.remove("grid-view");
  directory.classList.add("list-view");

  members.forEach(member => {
    const row = document.createElement("div");
    row.classList.add("list-row");

    row.innerHTML = `
      <h3>${member.name}</h3>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <a href="${member.website}" target="_blank">${member.website}</a>
    `;

    directory.appendChild(row);
  });
}

gridButton.addEventListener("click", () => {
  displayGridView(membersData);
});

listButton.addEventListener("click", () => {
  displayListView(membersData);
});

fetchMembers();
