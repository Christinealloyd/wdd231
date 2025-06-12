document.getElementById("menu").addEventListener("click", () => {
  document.getElementById("nav-links").classList.toggle("open");
});

localStorage.setItem('lastVisit', new Date().toISOString());
