/* ══════════════════════════════════════════════
   Frieren Portfolio — script.js
   John Cedrick · Beyond Journey's End Theme
   ══════════════════════════════════════════════ */

// ── Starfield ──
const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');
let stars = [];

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', () => {
  resize();
  initStars();
});

function initStars() {
  stars = [];
  for (let i = 0; i < 280; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.2 + 0.2,
      alpha: Math.random() * 0.6 + 0.1,
      speed: Math.random() * 0.015 + 0.005,
      phase: Math.random() * Math.PI * 2
    });
  }
}
initStars();

let frame = 0;
function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  frame += 0.01;
  stars.forEach(s => {
    const alpha = s.alpha * (0.7 + 0.3 * Math.sin(frame * s.speed * 40 + s.phase));
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${s.r > 1 ? '200,200,230' : '160,165,210'},${alpha})`;
    ctx.fill();
  });
  requestAnimationFrame(drawStars);
}
drawStars();

// ── Mana Particles ──
function spawnParticle() {
  const p = document.createElement('div');
  p.className = 'mana-particle';
  p.style.left = Math.random() * 100 + 'vw';
  const dur = (Math.random() * 8 + 6) + 's';
  p.style.animationDuration = dur;
  p.style.animationDelay = (Math.random() * 4) + 's';
  const hue = Math.random() > 0.5 ? '220,200,255' : '140,200,180';
  p.style.background = `rgb(${hue})`;
  const size = (Math.random() * 2 + 1) + 'px';
  p.style.width = size;
  p.style.height = size;
  document.body.appendChild(p);
  setTimeout(() => p.remove(), parseFloat(dur) * 1000 + 4000);
}
setInterval(spawnParticle, 900);

// ── Scroll Reveal ──
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
    }
  });
}, { threshold: 0.12 });
reveals.forEach(el => observer.observe(el));

// ── Active Nav Highlight ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav ul a');

const navObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.style.color = 'var(--gold)';
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(sec => navObserver.observe(sec));

// ── Cursor Rune Trail ──
const runeChars = ['ᚠ', 'ᚢ', 'ᚦ', 'ᚨ', 'ᚱ', 'ᚲ', 'ᚷ', 'ᚹ', 'ᚺ', 'ᚾ', 'ᛁ', 'ᛃ', 'ᛇ', 'ᛈ', 'ᛉ', 'ᛊ'];
let lastTrail = 0;

document.addEventListener('mousemove', e => {
  const now = Date.now();
  if (now - lastTrail < 120) return;
  lastTrail = now;

  const rune = document.createElement('span');
  rune.textContent = runeChars[Math.floor(Math.random() * runeChars.length)];
  rune.style.cssText = `
    position: fixed;
    left: ${e.clientX + 8}px;
    top: ${e.clientY - 8}px;
    font-family: 'IM Fell English', serif;
    font-size: ${Math.random() * 8 + 10}px;
    color: var(--rune);
    opacity: 0.7;
    pointer-events: none;
    z-index: 9999;
    transition: opacity 0.8s ease, transform 0.8s ease;
    transform: translateY(0);
  `;
  document.body.appendChild(rune);

  requestAnimationFrame(() => {
    rune.style.opacity = '0';
    rune.style.transform = `translateY(-${Math.random() * 20 + 10}px)`;
  });

  setTimeout(() => rune.remove(), 900);
});

// ── Smooth section entrance on page load ──
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.6s ease';
  requestAnimationFrame(() => {
    document.body.style.opacity = '1';
  });
});
