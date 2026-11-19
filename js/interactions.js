document.addEventListener('DOMContentLoaded', () => {
  const pick = a => a[Math.floor(Math.random() * a.length)], N = birthdayConfig.friendName;
  $('#scan').onclick = async function () { this.disabled = true;
    const m = ['Scanning personality…', 'Detecting unnecessary drama…', 'Calculating headache probability…', 'Investigation results: Too dangerous to disclose.'];
    for (let i = 0; i < m.length; i++) { $('#scanmsg').textContent = m[i]; $('#scanbar').style.width = (i + 1) * 25 + '%'; await sleep(1200); } this.disabled = false; };

  const Q = [['Who is more dramatic?', ['Me', N]], ['Who takes longer to reply?', ['Me', N]], ['Who laughs at the worst possible time?', ['Me', N]], ['Who is more likely to get lost?', ['Me', N]], ['Who would survive a zombie apocalypse?', ['Me', N]], ['Who is the bigger headache?', ['Me', N, 'Both. Obviously.']]];
  const R = ['Interesting choice.', 'The committee is shocked.', 'Noted. And judged.', 'Bold. Wrong, but bold.', 'Suspiciously honest.', 'Your answer has been leaked.'];
  let qi = 0; const quiz = $('#quiz');
  function ask() { if (qi >= Q.length) { quiz.innerHTML = '<h3 class="pop">COMPATIBILITY: 100%</h3><p>CERTIFIED PARTNERS IN NONSENSE.</p><button class="btn sm" id="qr">REPLAY</button>'; $('#qr').onclick = () => { qi = 0; ask(); }; return; }
    quiz.innerHTML = `<small>${qi + 1}/${Q.length}</small><p>${Q[qi][0]}</p>` + Q[qi][1].map(o => `<button class="btn sm">${o}</button>`).join('') + '<p class="note"></p>';
    $$('button', quiz).forEach(b => b.onclick = async () => { $$('button', quiz).forEach(x => x.disabled = true); $('.note', quiz).textContent = R[qi]; await sleep(900); qi++; ask(); }); }
  ask();

  const D = ['Why did you click it?', 'I specifically told you not to.', 'Your curiosity is becoming a serious concern.', 'Okay, clearly you don\'t follow instructions.', 'Congratulations. You have officially wasted your time.', 'Stop. Seriously.', 'Fine. One more and I give up.'];
  let dc = 0; const dn = $('#dnc');
  function confetti() { for (let i = 0; i < 40; i++) { const e = document.createElement('span'); e.textContent = pick(['🎉', '✨', '🎀', '💜', '🎈']); e.style.cssText = `position:fixed;left:${Math.random() * 100}vw;top:-30px;font-size:24px;z-index:60;transition:transform 3s,opacity 3s`; document.body.append(e); requestAnimationFrame(() => requestAnimationFrame(() => { e.style.transform = `translateY(110vh) rotate(${Math.random() * 720}deg)`; e.style.opacity = 0; })); setTimeout(() => e.remove(), 3200); } }
  dn.onclick = () => { if (dc < D.length) { $('#dncmsg').textContent = D[dc]; dn.style.transform = `rotate(${(Math.random() - .5) * 20}deg) scale(${1 + dc * .05})`; dn.style.background = `hsl(${dc * 50},80%,70%)`; dc++; }
    else { dn.hidden = true; $('#dncmsg').innerHTML = `<span class="big pop">🎉 You win, ${N}! The only prize: you are officially stubborn. 🎉</span>`; confetti(); } };

  $$('#court [data-d]').forEach(b => b.onclick = async () => { $$('#court .btn').forEach(x => x.disabled = true); $('#dres').textContent = b.dataset.d; await sleep(2200);
    $('#court').innerHTML = `<h3 class="pop">GUILTY.</h3><p>Sentence: One more year of being absolutely Crazy😎.</p>`; confetti(); });

  $('#shk').onclick = () => $('#shkmsg').textContent = `Hark, fair ${N}! Another year hath dawned upon thee, and still thy drama doth outshine the stars. Thou art a headache most beloved. Happy Birthday, thou magnificent menace!`;

  const C = ['You\'re genuinely one of the nicest people to have around.', 'You make ordinary days more entertaining.', 'Your presence makes a difference.', 'Never underestimate how much people appreciate you.', 'Okay, enough compliments. Don\'t become overconfident.'];
  $('#comp').onclick = async function () { this.disabled = true; const m = $('#compmsg'); for (const c of C) { m.className = 'big pop'; m.textContent = c; await sleep(2600); m.className = 'big'; } this.disabled = false; this.textContent = 'AGAIN? FINE.'; };

  const S = [['pop', '🎂 Funny wish', `Happy Birthday ${N}! May your Wi-Fi be strong and your drama be stronger.`], ['slide', '💜 Compliment', 'You are a genuinely good friend. Annoyingly so.'], , ['pop', '🏆 Award', 'Award: Most Likely To Make A Normal Plan Complicated.'], ['slide', '📸 Memory', 'Hidden memory unlocked: scroll up to the Archives. Yes, again.'], ['pop', '⚠ Warning', 'Warning: excessive happiness approaching. Brace yourself.']];
  let bag = []; $('#gen').onclick = () => { if (!bag.length) bag = [...S].sort(() => Math.random() - .5); const [a, t, m] = bag.pop(); const s = $('#sur'); s.className = 'card'; void s.offsetWidth; s.className = 'card ' + a; s.innerHTML = `<b>${t}</b><p>${m}</p>`; };
});
