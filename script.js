const startButton = document.getElementById("startButton");
const intro = document.getElementById("intro");
const loading = document.getElementById("loading");
const hero = document.getElementById("hero");
const fill = document.getElementById("loadingFill");
const percent = document.getElementById("loadingPercent");
const label = document.getElementById("loadingText");
const aeyong = document.getElementById("catAeyong");
const aegi = document.getElementById("catAegi");
const aeyongSprite = document.getElementById("aeyongSprite");
const aegiSprite = document.getElementById("aegiSprite");
let started = false;
startButton.addEventListener("click", () => {
  if (started) return;
  started = true;
  intro.classList.remove("is-active");
  loading.classList.add("is-active");
  window.scrollTo(0, 0);
  let progress = 0;
  let frame = 0;
  const timer = setInterval(() => {
    progress = Math.min(progress + 4, 100);
    fill.style.width = progress + "%";
    // Each cat advances along the loading track with a small stagger.
    const runway = document.querySelector(".cat-runway");
    const maxTravel = Math.max(0, runway.clientWidth - 125);
    aeyong.style.left = (maxTravel * Math.min(100, progress + 8) / 100) + "px";
    aegi.style.left = (maxTravel * Math.max(0, progress - 8) / 100) + "px";
    if (progress % 8 === 0) {
      frame = 1 - frame;
      aeyongSprite.src = `assets/aeyong-${frame}.png`;
      aegiSprite.src = `assets/aegi-${frame}.png`;
    }
    percent.textContent = progress + "%";
    label.textContent = progress < 45 ? "INITIALIZING..." : progress < 90 ? "UPDATING LIFE STATUS..." : "UPDATE COMPLETE!";
    if (progress === 100) {
      clearInterval(timer);
      setTimeout(() => {
        loading.classList.remove("is-active");
        hero.classList.add("is-active");
        window.scrollTo(0, 0);
      }, 450);
    }
  }, 180);
});
