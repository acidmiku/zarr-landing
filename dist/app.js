const $ = (selector) => document.querySelector(selector);
const shots = {
  collection: { src:'assets/collection.jpg', name:'Collection', description:'One view. Your whole collection.', alt:'Real Zarr Collection with Serial Experiments Lain, Blade Runner 2049, and Dune: Part Two' },
  discover: { src:'assets/discover.jpg', name:'Discover', description:'The next obsession is out there.', alt:'Real Zarr movie discovery screen with live metadata and artwork' },
  anime: { src:'assets/anime.jpg', name:'Anime', description:'Films and series. Distinct by design.', alt:'Real Zarr search results for Ghost in the Shell' },
  assistant: { src:'assets/assistant.jpg', name:'Assistant', description:'Recommendations from a real Zarr assistant conversation.', alt:'A real conversation with the Zarr AI assistant' }
};
let activeShot = 'collection';
const tabs = [...document.querySelectorAll('[data-shot]')];
function selectShot(key, focus = false) {
  activeShot = key;
  const shot = shots[key];
  tabs.forEach(tab => { const active = tab.dataset.shot === key; tab.setAttribute('aria-selected', String(active)); tab.tabIndex = active ? 0 : -1; if (active && focus) tab.focus(); });
  $('#product-screen').src = shot.src;
  $('#product-screen').alt = shot.alt;
  $('#screen-route').textContent = `Zarr / ${shot.name}`;
  $('.screen-image-button').setAttribute('aria-label', `View full ${shot.name} screenshot`);
  $('#shot-description').textContent = shot.description;
  $('#shot-description').setAttribute('aria-labelledby', `tab-${key}`);
}
tabs.forEach((tab,i) => {
  tab.addEventListener('click', () => selectShot(tab.dataset.shot));
  tab.addEventListener('keydown', event => { let next; if (event.key === 'ArrowRight') next = (i+1)%tabs.length; if (event.key === 'ArrowLeft') next = (i+tabs.length-1)%tabs.length; if (event.key === 'Home') next = 0; if (event.key === 'End') next = tabs.length-1; if (next !== undefined) { event.preventDefault(); selectShot(tabs[next].dataset.shot,true); } });
});
const dialog = $('#shot-dialog');
function openShot(key) {
  const shot = shots[key];
  $('#dialog-title').textContent = `Zarr / ${shot.name}`;
  $('#dialog-image').src = shot.src;
  $('#dialog-image').alt = shot.alt;
  $('#dialog-caption').textContent = 'Captured from the running Zarr service. Real UI, real metadata.';
  dialog.showModal();
  document.body.style.overflow = 'hidden';
}
$('.screen-image-button').addEventListener('click', () => openShot(activeShot));
$('.expand-screen').addEventListener('click', () => openShot(activeShot));
document.querySelectorAll('[data-open-shot]').forEach(button => button.addEventListener('click', () => openShot(button.dataset.openShot)));
$('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('close', () => { document.body.style.overflow = ''; });
dialog.addEventListener('click', event => { const rect = dialog.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close(); });
let toastTimer;
function toast(message) { $('.toast').textContent = message; $('.toast').classList.add('visible'); clearTimeout(toastTimer); toastTimer = setTimeout(() => $('.toast').classList.remove('visible'), 2600); }
const installCommands = 'git clone https://github.com/acidmiku/zarr.git\ncd zarr\ndocker compose up -d --build';
$('#copy-install').addEventListener('click', async () => { try { await navigator.clipboard.writeText(installCommands); $('#copy-install span').textContent='Copied'; toast('Installation commands copied.'); setTimeout(() => $('#copy-install span').textContent='Copy',2200); } catch { toast('Select the commands above and copy them manually.'); } });
let motionPaused = false;
function updateMotion() {
  document.body.classList.toggle('motion-paused',motionPaused);
  const button = $('.motion-toggle');
  button.setAttribute('aria-pressed',String(motionPaused));
  button.setAttribute('aria-label',motionPaused ? 'Resume animations' : 'Pause animations');
  button.title = motionPaused ? 'Resume animations' : 'Pause animations';
  button.innerHTML = motionPaused ? '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m8 5 11 7-11 7z"/></svg>' : '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14M16 5v14"/></svg>';
  const video = $('.hero-motion');
  if (motionPaused || document.hidden) video.pause(); else if(video.getAttribute('src')) video.play().catch(()=>{});
}
$('.motion-toggle').addEventListener('click', () => { motionPaused = !motionPaused; updateMotion(); });
document.addEventListener('visibilitychange', updateMotion);
updateMotion();
document.documentElement.classList.add('js');
const observer = new IntersectionObserver(entries => { entries.forEach(entry => { if(entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } }); }, {threshold:0.08});
document.querySelectorAll('.reveal').forEach(element=>observer.observe(element));
const shell = $('[data-tilt]');
const stage = $('.stage');
stage.addEventListener('pointermove', event => { if(motionPaused || event.pointerType === 'touch' || innerWidth < 760) return; const rect = shell.getBoundingClientRect(); const x = Math.max(-1,Math.min(1,(event.clientX - rect.left)/rect.width*2-1)); const y = Math.max(-1,Math.min(1,(event.clientY - rect.top)/rect.height*2-1)); shell.style.transform=`rotateX(${3-y*2}deg) rotateY(${x*2.5}deg)`; });
stage.addEventListener('pointerleave', () => { shell.style.transform=''; });
