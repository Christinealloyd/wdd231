export function openModal(craft) {
  const modal = document.querySelector('#modal');
  const body = document.querySelector('#modal-body');
  const closeBtn = document.querySelector('#close-btn');

  body.innerHTML = `
    <h2>${craft.title}</h2>
    <p><strong>Materials:</strong> ${craft.materials}</p>
    <p><strong>Instructions:</strong> ${craft.instructions}</p>
  `;

  modal.classList.remove('hidden');

  closeBtn.onclick = () => modal.classList.add('hidden');
}
