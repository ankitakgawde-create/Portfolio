const menu = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#nav-links');
function closeMenu() {
  menu.setAttribute('aria-expanded', 'false');
  navigation.classList.remove('is-open');
}
menu.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  navigation.classList.toggle('is-open', open);
});
navigation.addEventListener('click', event => {
  if (event.target.closest('a')) closeMenu();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menu.focus();
  }
});
const gallery = document.querySelector('.gallery');
const galleryTrack = document.querySelector('.gallery-track');
const duplicate = document.querySelector('.gallery-set').cloneNode(true);
duplicate.setAttribute('aria-hidden', 'true');
duplicate.querySelectorAll('img').forEach(image => { image.alt = ''; });
galleryTrack.append(duplicate);
const pause = document.querySelector('.gallery-toggle');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
function applyMotionPreference() {
  gallery.classList.toggle('is-paused', reducedMotion.matches);
  pause.hidden = reducedMotion.matches;
  pause.setAttribute('aria-pressed', String(reducedMotion.matches));
  pause.textContent = reducedMotion.matches ? 'Play photos' : 'Pause photos';
}
applyMotionPreference();
reducedMotion.addEventListener('change', applyMotionPreference);
pause.addEventListener('click', () => {
  const paused = gallery.classList.toggle('is-paused');
  pause.setAttribute('aria-pressed', String(paused));
  pause.textContent = paused ? 'Play photos' : 'Pause photos';
});
