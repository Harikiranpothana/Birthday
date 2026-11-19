/* ===== EDIT HERE: everything personal lives in this object ===== */
const birthdayConfig = {
  friendName: "Tejuu",
  // Put your photos in assets/images/ with these names (or change the paths). Missing photos are hidden automatically.
  childhoodPhotos: [
    { src: "assets/images/childhood-1.jpeg", caption: "Stage 1: Innocent little human." },
    { src: "assets/images/childhood-2.jpeg", caption: "Stage 2: Something clearly went wrong." },
    { src: "assets/images/childhood-3.jpg", caption: "Stage 3: Current situation under investigation." }
  ],
  memoryPhotos: [
    { src: "assets/images/memory-1.jpeg", caption: "Evidence that we occasionally behave normally." },
    { src: "assets/images/memory-2.jpeg", caption: "Another memory added to the collection." },
    { src: "assets/images/memory-3.jpeg", caption: "Two people. One brain cell." },
    { src: "assets/images/memory-4.jpeg", caption: "Some moments deserve to be remembered." },
    { src: "assets/images/memory-5.jpeg", caption: "Proof that life is less boring with the right people." },
    { src: "assets/images/memory-6.jpg", caption: "Another unforgettable memory." }
  ],
  backgroundMusic: "assets/audio/website-background.mp3",
  finalVideo: "assets/video/birthday-final.mp4",
  // Your personal message (each array item = one paragraph/line):
  heartMessage: [
    "Happy Birthday Tejuuu! ❤️🎀",
    "You are not just my best friend You are my Kuturu😁, you're one of the most special people in my life. 🫶",
    "No matter how much we fight each other, you'll always have a special place in my heart. Thank you for being with me.",
    "May all your dreams come true, and may your smile never fade. ✨",
    "Never change yourself for anyone!",
    "Once again, Happiest Birthday, Tejuuu! ❤️🧿 Love you 🫂💗"
  ],
  finalMessage: "Happy Birthday! Love you, always. ❤️"
};

const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduce = matchMedia('(prefers-reduced-motion:reduce)').matches;
const sleep = ms => new Promise(r => setTimeout(r, ms));

function openLB(p) { const lb = $('#lb'); $('img', lb).src = p.src; $('figcaption', lb).textContent = p.caption; lb.hidden = false; }
function photos(list, box) {
  list.forEach((p, i) => {
    const f = document.createElement('figure'); f.className = 'pol';
    f.style.setProperty('--r', (i % 2 ? 1 : -1) * (2 + (i % 3) * 1.5) + 'deg'); f.style.animationDelay = i * .4 + 's';
    const im = new Image(); im.loading = 'lazy'; im.alt = p.caption;
    im.onerror = () => { f.remove(); if (!box.children.length) box.innerHTML = '<p class="note">Add photos to assets/images/</p>'; };
    im.src = p.src;
    const c = document.createElement('figcaption'); c.textContent = p.caption;
    f.append(im, c); f.onclick = () => openLB(p); box.append(f);
  });
}

function stars() { // ocean bubbles: rise, parallax on scroll, dodge the cursor / finger
  const c = $('#stars'), x = c.getContext('2d'); let W, H, B = [], mx = -999, my = -999, ls = scrollY;
  const mk = () => { const r = Math.random() * 22 + 5; return { x: Math.random() * W, y: Math.random() * H, r, v: .15 + Math.random() * .5, ph: Math.random() * 7, d: r / 27 }; };
  const rs = () => { W = c.width = innerWidth; H = c.height = innerHeight; B = Array.from({ length: Math.min(55, W / 22) }, mk); };
  rs(); addEventListener('resize', rs);
  addEventListener('pointermove', e => { mx = e.clientX; my = e.clientY; }, { passive: true });
  addEventListener('pointerleave', () => mx = my = -999);
  addEventListener('scroll', () => { const dy = scrollY - ls; ls = scrollY; B.forEach(b => b.y -= dy * (.25 + b.d * .6)); }, { passive: true });
  (function d() {
    x.clearRect(0, 0, W, H);
    B.forEach(b => {
      if (!reduce) { b.y -= b.v; b.ph += .02; b.x += Math.sin(b.ph) * .3;
        const dx = b.x - mx, dy = b.y - my, q = Math.hypot(dx, dy), R = 110 + b.r; if (q < R) { const f = (R - q) / R * 3; b.x += dx / q * f; b.y += dy / q * f; } }
      if (b.y < -40) { b.y = H + 40; b.x = Math.random() * W; } if (b.y > H + 80) b.y = -30;
      const g = x.createRadialGradient(b.x - b.r * .3, b.y - b.r * .3, b.r * .1, b.x, b.y, b.r);
      g.addColorStop(0, 'rgba(255,255,255,.55)'); g.addColorStop(1, 'rgba(255,255,255,.12)');
      x.fillStyle = g; x.strokeStyle = 'rgba(255,255,255,.55)'; x.lineWidth = 1.2; x.beginPath(); x.arc(b.x, b.y, b.r, 0, 7); x.fill(); x.stroke();
    });
    if (!reduce) requestAnimationFrame(d);
  })();
}

async function typeWriter(el, txt) { for (const ch of txt) { el.textContent += ch; if (!reduce) await sleep(28); } }
function counter(b) { const n = +b.dataset.n; let v = 0; const t = setInterval(() => { v += Math.ceil(n / 40); if (v >= n) { v = n; clearInterval(t); } b.textContent = v; }, 40); }

document.addEventListener('DOMContentLoaded', () => {
  $$('.nm').forEach(e => e.textContent = birthdayConfig.friendName.toUpperCase());
  $('#heart').innerHTML = birthdayConfig.heartMessage.map(l => `<p>${l}</p>`).join('');
  $('#finMsg').textContent = birthdayConfig.finalMessage;
  photos(birthdayConfig.childhoodPhotos, $('#kid')); photos(birthdayConfig.memoryPhotos, $('#mem'));
  $('#lb').onclick = () => $('#lb').hidden = true;
  addEventListener('keydown', e => { if (e.key === 'Escape') $('#lb').hidden = true; });
  stars();
  $('#tw').style.whiteSpace = 'pre-line';
  typeWriter($('#tw'), `An extremely important investigation has been initiated.\nSubject: ${birthdayConfig.friendName.toUpperCase()}\nMission: Celebrate another year of surviving this world.`);

  const secs = $$('main section'), dots = $('#dots');
  secs.forEach(s => { const b = document.createElement('button'); b.title = s.dataset.t; b.setAttribute('aria-label', s.dataset.t); b.onclick = () => s.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' }); dots.append(b); });
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return; e.target.classList.add('in');
    $$('[data-n]', e.target).forEach(b => { if (!b.done) { b.done = 1; counter(b); } });
    $$('button', dots).forEach((d, i) => d.classList.toggle('on', secs[i] === e.target));
  }), { threshold: .3 });
  secs.forEach(s => io.observe(s));
  addEventListener('scroll', () => $('#bar').style.width = scrollY / Math.max(1, document.body.scrollHeight - innerHeight) * 100 + '%', { passive: true });

  $('#enter').onclick = async () => {
    AudioMgr.startBg(); $('#enter').hidden = true; $('#load').hidden = false; $('#load i').style.cssText = 'width:100%;transition:width 1.6s';
    await sleep(1800); $('#intro').style.display = 'none'; $('#app').hidden = false; $('#mute').hidden = false; $('#dots').hidden = false; scrollTo(0, 0);
  };
});
