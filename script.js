/* =====================================================
   ROMANTIC LETTER — SCRIPT.JS
   ===================================================== */

const TOTAL_PAGES = 17;
let currentPage  = 0; // 0 = not started yet
let isAnimating  = false;
let musicPlaying = false;

// ─── LOCAL MOCHI GIF ASSETS (100% Cute White Peach Mochi Cats) ─────────
const localMochis = [
  'assets/mochi/mochi-wave.gif',
  'assets/mochi/mochi-cutie.gif',
  'assets/mochi/mochi-sweet.gif',
  'assets/mochi/mochi-kawaii.gif',
  'assets/mochi/mochi-adorable.gif',
  'assets/mochi/mochi-dance.gif',
  'assets/mochi/mochi-peach-cuddle.gif',
  'assets/mochi/mochi-phone.gif',
  'assets/mochi/mochi-pleading.gif',
  'assets/mochi/peach-dance.gif',
  'assets/mochi/peach-skip.gif',
  'assets/mochi/peach-cuddle.gif',
  'assets/mochi/peach-excited.gif',
  'assets/mochi/peach-celebrate.gif',
  'assets/mochi/peach-cries.gif'
];

// ─── ELEMENTS ──────────────────────────────────────
const splash       = document.getElementById('page-splash');
const pagesWrapper = document.getElementById('pages-wrapper');
const finalPage    = document.getElementById('page-final');
const beginBtn     = document.getElementById('begin-btn');
const counter      = document.getElementById('page-counter');
const bgMusic      = document.getElementById('bg-music');
const musicBtn     = document.getElementById('music-btn');
const hContainer   = document.getElementById('hearts-container');

// ─── MUSIC TOGGLE ───────────────────────────────────
musicBtn.addEventListener('click', () => {
  if (!musicPlaying) {
    bgMusic.play().then(() => {
      musicPlaying = true;
      musicBtn.classList.add('playing');
      musicBtn.querySelector('#music-icon').textContent = '■';
    }).catch(() => {
      // Audio autoplay policy fallback
    });
  } else {
    bgMusic.pause();
    musicPlaying = false;
    musicBtn.classList.remove('playing');
    musicBtn.querySelector('#music-icon').textContent = '♪';
  }
});

// ─── FLOATING HEARTS (ambient background) ───────────
function spawnHeart(container) {
  if (!container) return;
  const emojis = ['❤️', '💕', '🌸', '✨', '💗', '💝', '🌹', '💖'];
  const h = document.createElement('span');
  h.className = 'fheart';
  h.textContent = emojis[Math.floor(Math.random() * emojis.length)];
  h.style.left = (5 + Math.random() * 90) + '%';
  h.style.fontSize = (0.75 + Math.random() * 0.8) + 'rem';
  h.style.animationDuration = (5 + Math.random() * 5) + 's';
  h.style.animationDelay    = (Math.random() * 1) + 's';
  container.appendChild(h);
  setTimeout(() => h.remove(), 12000);
}

setInterval(() => spawnHeart(hContainer), 3500);

function spawnBurst(count) {
  for (let i = 0; i < count; i++) {
    setTimeout(() => spawnHeart(hContainer), i * 110);
  }
}

// ─── SPLASH SCREEN → BEGIN ─────────────────────────
beginBtn.addEventListener('click', () => {
  splash.classList.remove('active');
  setTimeout(() => {
    splash.style.display = 'none';
    pagesWrapper.classList.remove('hidden');
    showPage(1, 'next');
  }, 600);
  spawnBurst(6);
});

// ─── PAGE NAVIGATION ───────────────────────────────
function showPage(n, direction) {
  if (isAnimating) return;
  direction = direction || 'next';
  isAnimating = true;

  const prev = currentPage;
  currentPage = n;

  // Update page counter
  if (counter) {
    counter.textContent = n + ' / ' + TOTAL_PAGES;
  }

  const prevEl = prev > 0 ? document.getElementById('sp-' + prev) : null;
  const nextEl = document.getElementById('sp-' + n);

  // Transition out previous page
  if (prevEl) {
    prevEl.classList.remove('active');
    prevEl.classList.add(direction === 'next' ? 'out-left' : 'out-right');
    setTimeout(() => {
      prevEl.classList.remove('out-left', 'out-right');
    }, 500);
  }

  // Transition in next page
  if (nextEl) {
    // Reset scroll to top
    nextEl.scrollTop = 0;
    nextEl.removeAttribute('style');
    setTimeout(() => {
      nextEl.classList.add('active');
    }, 20);
  }

  setTimeout(() => {
    isAnimating = false;
  }, 550);

  spawnBurst(2);
}

// Global button handler for all Next and Back buttons in each page
document.addEventListener('click', (e) => {
  // NEXT button clicked
  const next = e.target.closest('.next-btn');
  if (next) {
    if (isAnimating) return;
    if (currentPage >= TOTAL_PAGES) {
      goToFinal();
    } else {
      showPage(currentPage + 1, 'next');
    }
    return;
  }

  // BACK button clicked
  const back = e.target.closest('.back-btn');
  if (back) {
    if (isAnimating || currentPage <= 1) return;
    showPage(currentPage - 1, 'back');
    return;
  }

  // MOCHI GIF clicked: switch to another adorable expression & burst hearts!
  const mochi = e.target.closest('.sp-mochi, .splash-mochi, .final-mochi-img, .final-mochi-sm');
  if (mochi) {
    const curSrc = mochi.getAttribute('src');
    const idx = localMochis.findIndex(m => m === curSrc);
    const nextIdx = (idx + 1) % localMochis.length;
    mochi.src = localMochis[nextIdx];
    // Gentle bounce
    mochi.style.transform = 'scale(1.2) rotate(-6deg)';
    setTimeout(() => { mochi.style.transform = ''; }, 350);
    spawnBurst(4);
  }
});

// ─── KEYBOARD NAVIGATION ───────────────────────────
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight' || e.key === ' ') {
    if (currentPage > 0 && currentPage < TOTAL_PAGES && !finalPage.classList.contains('active')) {
      showPage(currentPage + 1, 'next');
    } else if (currentPage === TOTAL_PAGES && !finalPage.classList.contains('active')) {
      goToFinal();
    }
  }
  if (e.key === 'ArrowLeft' && currentPage > 1 && !finalPage.classList.contains('active')) {
    showPage(currentPage - 1, 'back');
  }
});

// ─── TOUCH SWIPE NAVIGATION ────────────────────────
let touchStartX = 0;
let touchEndX   = 0;

document.addEventListener('touchstart', e => {
  touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

document.addEventListener('touchend', e => {
  touchEndX = e.changedTouches[0].screenX;
  const diff = touchStartX - touchEndX;
  if (Math.abs(diff) < 55) return;
  if (diff > 0) {
    // Swipe left = Next
    if (currentPage > 0 && currentPage < TOTAL_PAGES) {
      showPage(currentPage + 1, 'next');
    } else if (currentPage === TOTAL_PAGES) {
      goToFinal();
    }
  } else {
    // Swipe right = Back
    if (currentPage > 1) {
      showPage(currentPage - 1, 'back');
    }
  }
}, { passive: true });

// ─── FINAL PAGE ────────────────────────────────────
function goToFinal() {
  isAnimating = true;
  pagesWrapper.classList.add('hidden');

  finalPage.classList.remove('hidden');
  finalPage.classList.add('active');

  // Animate lines in emotional sequence
  const lines = document.querySelectorAll('.fl');
  lines.forEach((line, i) => {
    setTimeout(() => {
      line.classList.add('visible');
    }, 400 + i * 480);
  });

  // Floating hearts shower on final page
  const fHearts = document.getElementById('final-hearts');
  for (let i = 0; i < 28; i++) {
    setTimeout(() => spawnHeart(fHearts), i * 180);
  }

  setInterval(() => spawnHeart(fHearts), 1400);

  setTimeout(() => { isAnimating = false; }, 800);
}

// ─── RESTART BUTTON ────────────────────────────────
document.getElementById('restart-btn').addEventListener('click', () => {
  finalPage.classList.remove('active');
  finalPage.classList.add('hidden');
  document.querySelectorAll('.fl').forEach(l => l.classList.remove('visible'));

  // Reset pages
  document.querySelectorAll('.spage').forEach((p, idx) => {
    p.classList.remove('active', 'out-left', 'out-right');
    p.removeAttribute('style');
    if (idx === 0) p.classList.add('active');
  });

  // Reset splash
  currentPage = 0;
  splash.style.display = '';
  setTimeout(() => {
    splash.classList.add('active');
  }, 30);
  pagesWrapper.classList.add('hidden');
});

// ─── INIT ──────────────────────────────────────────
splash.classList.add('active');
