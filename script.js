const intro = document.getElementById("intro");
const loading = document.getElementById("loading");
const hero = document.getElementById("hero");

const startButton = document.getElementById("startButton");
const progressBar = document.getElementById("progressBar");
const progressValue = document.getElementById("progressValue");

let hasStarted = false;

startButton.addEventListener("click", startExperience);

function startExperience() {
  if (hasStarted) return;
  hasStarted = true;

  intro.classList.remove("is-active");
  loading.classList.add("is-active");

  let progress = 0;

  const timer = window.setInterval(() => {
    const step = Math.floor(Math.random() * 8) + 3;
    progress = Math.min(progress + step, 100);

    progressBar.style.width = `${progress}%`;
    progressValue.textContent = `${progress}%`;

    if (progress === 100) {
      window.clearInterval(timer);

      window.setTimeout(() => {
        loading.classList.add("is-complete");
      }, 250);

      window.setTimeout(() => {
        loading.classList.remove("is-active");
        hero.classList.add("is-visible");
        document.body.style.overflow = "auto";
      }, 1400);
    }
  }, 110);
}
