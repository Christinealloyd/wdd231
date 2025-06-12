import { openModal } from './modal.js';

const list = document.querySelector('#craft-list');

async function loadCrafts() {
  try {
    const response = await fetch('data/crafts.json');
    const crafts = await response.json();

    console.log("Crafts loaded:", crafts);

list.innerHTML = crafts.map(craft => `
  <div class="craft-card">
    <h3>${craft.title}</h3>
    <p>${craft.description}</p>
    <p><strong>Difficulty:</strong> ${craft.difficulty}</p>
    <p><strong>Materials:</strong> ${craft.materials.join(', ')}</p>
    <p><strong>Instructions:</strong></p>
    <ol>
      ${craft.instructions.map(step => `<li>${step}</li>`).join('')}
    </ol>
  </div>
`).join('');


  } catch (error) {
    console.error("Failed to load crafts:", error);
    list.innerHTML = `<p>Error loading crafts. Please try again later.</p>`;
  }
}

loadCrafts();

