const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const revealEls = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && !reducedMotion) {
  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) { entry.target.classList.add("visible"); observer.unobserve(entry.target); }
  }), { threshold: 0.12 });
  revealEls.forEach((el) => observer.observe(el));
} else revealEls.forEach((el) => el.classList.add("visible"));

const surpriseButton = document.getElementById("surpriseButton");
if (surpriseButton) surpriseButton.addEventListener("click", function () {
  const message = document.getElementById("surpriseMessage");
  const isHidden = message.hidden; message.hidden = !isHidden;
  this.innerHTML = isHidden ? 'Keep this close <span>♡</span>' : 'One last thing <span>↗</span>';
  const birthdayMessage = document.getElementById("birthdayMessage");
  if (birthdayMessage) birthdayMessage.hidden = !isHidden;
  if (isHidden) message.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "nearest" });
});

document.querySelectorAll(".timeline-item").forEach((item) => {
  const toggle = () => { const detail = item.querySelector(".timeline-extra"); if (!detail) return; detail.hidden = !detail.hidden; item.setAttribute("aria-expanded", String(!detail.hidden)); };
  item.addEventListener("click", toggle); item.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(); } });
});
document.querySelectorAll(".envelope-card").forEach((button) => button.addEventListener("click", () => {
  document.querySelectorAll(".note-reveal").forEach((note) => note.hidden = true);
  document.querySelectorAll(".envelope-card").forEach((b) => b.setAttribute("aria-expanded", "false"));
  const note = document.getElementById("note-" + button.dataset.note); if (note) { note.hidden = false; button.setAttribute("aria-expanded", "true"); note.scrollIntoView({behavior: reducedMotion ? "auto" : "smooth", block:"nearest"}); }
}));
document.querySelectorAll(".destination").forEach((button) => button.addEventListener("click", () => {
  document.querySelectorAll(".destination-detail").forEach((detail) => detail.hidden = true);
  const detail = document.getElementById("destination-" + button.dataset.destination); if (detail) { detail.hidden = false; detail.scrollIntoView({behavior: reducedMotion ? "auto" : "smooth", block:"nearest"}); }
}));
const secretForm = document.getElementById("secretForm");
if (secretForm) secretForm.addEventListener("submit", (event) => { event.preventDefault(); const word = document.getElementById("secretWord").value.trim().toLowerCase(); const result = document.getElementById("secretResult"); if (["aunt", "auntie", "your aunt", "i am your aunt now", "i'm your aunt now"].includes(word)) { result.hidden = false; } else { result.hidden = true; document.getElementById("secretWord").setCustomValidity("Think of our age-gap joke, my love."); document.getElementById("secretWord").reportValidity(); } });
const secretInput = document.getElementById("secretWord"); if (secretInput) secretInput.addEventListener("input", () => secretInput.setCustomValidity(""));
