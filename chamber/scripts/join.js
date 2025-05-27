
document.getElementById("timestamp").value = new Date().toISOString();

function closeModal(id) {
    document.getElementById(id).style.display = "none";
}

document.querySelectorAll('.card a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const modalId = this.getAttribute('href').substring(1);
        document.getElementById(modalId).style.display = 'block';
    });
});

window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.card').forEach(card => {
        card.style.opacity = 0;
        card.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
        setTimeout(() => {
            card.style.opacity = 1;
            card.style.transform = 'translateY(0)';
        }, 200);
    });
});

if (window.location.pathname.includes("thankyou.html")) {
  const params = new URLSearchParams(window.location.search);

  document.getElementById("firstName").textContent = params.get("fname") || "N/A";
  document.getElementById("lastName").textContent = params.get("lname") || "N/A";
  document.getElementById("email").textContent = params.get("email") || "N/A";
  document.getElementById("phone").textContent = params.get("phone") || "N/A";
  document.getElementById("organization").textContent = params.get("organization") || "N/A";
  document.getElementById("timestamp").textContent = params.get("timestamp") || "N/A";
}

