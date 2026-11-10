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
const bbugi = document.getElementById("turtleBbugi");
const bbugiSprite = document.getElementById("bbugiSprite");
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
    bbugi.style.left = (maxTravel * progress / 100 * 0.2) + "px";
    if (progress % 8 === 0) {
      frame = 1 - frame;
      aeyongSprite.src = `assets/aeyong-${frame}.png`;
      aegiSprite.src = `assets/aegi-${frame}.png`;
      bbugiSprite.src = `assets/bbugi-${frame}.png`;
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
// MEMORY ARCHIVE ADD-ON — paste at the END of script.js
(() => {
  const total = 8;
  // To add photos later, put photo-01.jpg ... photo-08.jpg inside assets,
  // then change the corresponding null to "assets/photo-01.jpg" etc.
  const photos = [null, null, null, null, null, null, null, null];
  const viewer = document.getElementById('memoryViewer');
  const photo = document.getElementById('memoryPhoto');
  const count = document.getElementById('memoryCount');
  const dots = document.getElementById('memoryDots');
  let index = 0;
  const pad = n => String(n).padStart(2, '0');
  function render() {
    photo.replaceChildren();
    if (photos[index]) {
      const img = document.createElement('img');
      img.src = photos[index];
      img.alt = `우리의 사진 ${index + 1}`;
      img.onerror = () => { photos[index] = null; render(); };
      photo.append(img);
    } else {
      const p = document.createElement('div');
      p.className = 'memory-placeholder';
      const icon = document.createElement('span'); icon.textContent = '✳';
      const title = document.createElement('strong'); title.textContent = `PHOTO ${pad(index + 1)}`;
      const sub = document.createElement('small'); sub.textContent = '사진을 넣을 예정이에요';
      p.append(icon, title, sub);
      photo.append(p);
    }
    count.textContent = `${pad(index + 1)} / ${pad(total)}`;
    [...dots.children].forEach((d, i) => {
      d.classList.toggle('is-current', i === index);
      d.setAttribute('aria-current', i === index ? 'true' : 'false');
    });
  }
  for (let i = 0; i < total; i++) {
    const d = document.createElement('button');
    d.className = 'memory-dot';
    d.setAttribute('aria-label', `${i + 1}번째 사진`);
    d.addEventListener('click', () => { index = i; render(); });
    dots.append(d);
  }
  function move(step) { index = (index + step + total) % total; render(); }
  document.getElementById('memoryPrev').addEventListener('click', () => move(-1));
  document.getElementById('memoryNext').addEventListener('click', () => move(1));
  let startX = null;
  viewer.addEventListener('touchstart', e => { startX = e.changedTouches[0].screenX; }, {passive:true});
  viewer.addEventListener('touchend', e => {
    if (startX === null) return;
    const diff = e.changedTouches[0].screenX - startX;
    if (Math.abs(diff) > 40) move(diff < 0 ? 1 : -1);
    startX = null;
  }, {passive:true});
  render();
})();

/* CHAPTER NAVIGATION */
(() => {
  const chapters = ["hero", "decision", "memory", "release", "complete"];

  function showChapter(id) {
    if (!chapters.includes(id)) return;

    document.body.classList.add("chapter-mode");
    document.body.dataset.chapter = id;

    window.scrollTo({ top: 0, behavior: "instant" });
  }

  document.addEventListener("click", (event) => {
    const link = event.target.closest('a[href^="#"]');
    if (!link) return;

    const target = link.getAttribute("href").slice(1);
    if (!chapters.includes(target)) return;

    event.preventDefault();
    showChapter(target);
  });

  // 기존 챕터에 NEXT / PREVIOUS 버튼 추가
  const navigation = [
    ["decision", "hero", "memory"],
    ["memory", "decision", "release"],
    ["release", "memory", "complete"]
  ];

  navigation.forEach(([id, previous, next]) => {
    const section = document.getElementById(id);
    if (!section) return;

    const nav = document.createElement("div");
    nav.className = "chapter-navigation";

    if (previous) {
      const back = document.createElement("a");
      back.href = "#" + previous;
      back.textContent = "◀ PREVIOUS";
      nav.append(back);
    }

    if (next) {
      const forward = document.createElement("a");
      forward.href = "#" + next;
      forward.textContent = "NEXT CHAPTER ▶";
      nav.append(forward);
    }

    const body = section.querySelector(
      ".status-window-body, .memory-body, .release-body"
    );

    if (body) body.append(nav);
  });
})();


/* CHAPTER 01 — reliable frame-by-frame proposal animation */
(() => {
  const image = document.getElementById('proposalFrame');
  const caption = document.getElementById('proposalCaption');
  if (!image) return;
  const scenes = [
    ['assets/proposal-clean-1.png', '01 / IDLE'],
    ['assets/proposal-clean-2.png', '02 / PROPOSAL'],
    ['assets/proposal-clean-3.png', '03 / REACTION'],
    ['assets/proposal-clean-4.png', '04 / HAPPY END ♥']
  ];
  scenes.forEach(([src]) => { const img = new Image(); img.src = src; });
  let current = 0;
  let timer = null;
  const visible = () => document.body.classList.contains('chapter-mode') && document.body.dataset.chapter === 'decision';
  function render() {
    image.src = scenes[current][0];
    if (caption) caption.textContent = scenes[current][1];
  }
  function sync() {
    if (!visible()) {
      if (timer !== null) clearInterval(timer);
      timer = null;
      return;
    }
    if (timer !== null) return;
    current = 0;
    render();
    timer = window.setInterval(() => {
      if (!visible()) { sync(); return; }
      current = (current + 1) % scenes.length;
      render();
    }, 1700);
  }
  new MutationObserver(sync).observe(document.body, { attributes: true, attributeFilter: ['class', 'data-chapter'] });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && timer !== null) { clearInterval(timer); timer = null; }
    else sync();
  });
  sync();
})();
