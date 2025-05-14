document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const nav = document.getElementById("navMenu");

  hamburger.addEventListener("click", () => {
    nav.classList.toggle("open");
  });
});
