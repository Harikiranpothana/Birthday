/* Central audio manager: one bg track + the final video's own audio. They never overlap. */
function fadeVolume(m, to, ms = 2000) {
  clearInterval(m._f);
  return new Promise(res => { const from = m.volume, t0 = performance.now();
    m._f = setInterval(() => { const k = Math.min(1, (performance.now() - t0) / ms); m.volume = Math.max(0, Math.min(1, from + (to - from) * k)); if (k >= 1) { clearInterval(m._f); res(); } }, 40); });
}
const AudioMgr = {
  bg: null, vol: .25, muted: sessionStorage.getItem('muted') === '1', started: false,
  init() { this.bg = new Audio(birthdayConfig.backgroundMusic); this.bg.loop = true; this.bg.volume = 0; this.bg.preload = 'auto'; },
  async startBg() { if (this.started) return; this.started = true; if (this.muted) return; try { await this.bg.play(); fadeVolume(this.bg, this.vol, 2000); } catch (e) { console.warn('Background music not available', e); } },
  async resumeBg(ms = 2000) { if (this.muted || !this.started) return; try { await this.bg.play(); fadeVolume(this.bg, this.vol, ms); } catch (e) {} },
  async stopBg(ms = 2500) { await fadeVolume(this.bg, 0, ms); this.bg.pause(); },
  toggle() { this.muted = !this.muted; sessionStorage.setItem('muted', this.muted ? '1' : '0'); $('#mute').textContent = this.muted ? '🔇' : '🔊'; this.muted ? this.stopBg(600) : (this.started ? this.resumeBg(800) : 0); }
};
document.addEventListener('DOMContentLoaded', () => {
  AudioMgr.init(); const v = $('#vid'), fin = $('#fin'); let busy = false;
  $('#mute').textContent = AudioMgr.muted ? '🔇' : '🔊'; $('#mute').onclick = () => AudioMgr.toggle();

  async function playVideo() { v.muted = false; v.volume = 1; $('#end').hidden = true; try { await v.play(); $('#play').hidden = true; } catch (e) { $('#play').hidden = false; } }
  async function line(t, ms) { const p = $('#finTxt p'); p.style.opacity = 0; await sleep(700); p.textContent = t; p.style.opacity = 1; await sleep(ms); }

  $('#goFinale').onclick = async () => {
    if (busy) return; busy = true; fin.hidden = false; await sleep(30); fin.classList.add('on');
    const fade = AudioMgr.stopBg(2500);
    await line('Okay, enough nonsense…', 1500); await line('I actually made something for you.', 1500); await line('Some moments deserve to be replayed.', 1200);
    await fade; $('#finTxt').hidden = true; $('#stage').hidden = false;
    if (!v.getAttribute('src')) { v.onerror = () => { $('#play').hidden = true; $('#end').hidden = false; $('#end').innerHTML = '<p>Video not found — add assets/video/birthday-final.mp4</p>'; }; v.src = birthdayConfig.finalVideo; v.load(); }
    playVideo(); busy = false;
  };
  $('#play').onclick = playVideo;
  v.onended = async () => { await fadeVolume(v, 0, 1200); $('#end').hidden = false; setTimeout(() => AudioMgr.resumeBg(3000), 2000); };
  $('#replay').onclick = () => { AudioMgr.stopBg(500); v.pause(); v.currentTime = 0; playVideo(); };
  $('#back').onclick = () => { v.pause(); fin.classList.remove('on'); setTimeout(() => { fin.hidden = true; $('#stage').hidden = true; $('#finTxt').hidden = false; }, 1500); AudioMgr.resumeBg(2000); };
});
