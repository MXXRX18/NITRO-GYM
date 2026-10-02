/* Instalaciones de Nitro Gym: carrusel horizontal ampliable hasta 20 fotos. */
(() => {
  'use strict';
  document.querySelectorAll('[data-ig-carousel]').forEach(carousel => {
    const track = carousel.querySelector('.ig-track');
    const cards = [...track.querySelectorAll('.ig-card')];
    if (!cards.length) return;
    const controls = carousel.querySelector('.ig-controls');
    const dots = carousel.querySelector('.ig-dots');
    const prev = carousel.querySelector('.ig-prev');
    const next = carousel.querySelector('.ig-next');
    const counter = carousel.querySelector('.ig-counter');
    const status = carousel.querySelector('.ig-status');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    let current = 0;
    let pointer = null;
    let gestureConsumed = false;

    function select(index, animate = true) {
      const target = ((index % cards.length) + cards.length) % cards.length;
      const changed = target !== current;
      current = target;
      cards.forEach((card, i) => {
        let distance = (i - current + cards.length) % cards.length;
        if (distance > cards.length / 2) distance -= cards.length;
        card.dataset.position = distance === 0 ? 'active' : distance === 1 ? 'next' : distance === -1 ? 'prev' : distance === 2 ? 'far-next' : distance === -2 ? 'far-prev' : distance > 0 ? 'hidden-next' : 'hidden-prev';
        const hidden = Math.abs(distance) > 2;
        card.setAttribute('aria-hidden', String(hidden));
        card.inert = hidden;
        card.tabIndex = hidden ? -1 : 0;
        card.setAttribute('aria-pressed', String(i === current));
        card.classList.remove('is-entering');
      });
      const active = cards[current];
      if (changed && animate && !reduce.matches) {
        // Restart only the new front photo's blur-to-sharp transition.
        void active.offsetWidth;
        active.classList.add('is-entering');
      }
      if (cards.some(card => card === document.activeElement && card.getAttribute('aria-hidden') === 'true')) active.focus({ preventScroll: true });
      counter.textContent = `${String(current + 1).padStart(2, '0')} / ${String(cards.length).padStart(2, '0')}`;
      dots.querySelectorAll('button').forEach((dot, i) => dot.setAttribute('aria-pressed', String(i === current)));
      status.textContent = `Foto ${current + 1} de ${cards.length}: ${active.querySelector('img').alt}`;
    }

    cards.forEach((card, i) => {
      card.setAttribute('aria-label', `Ver foto ${i + 1} de ${cards.length}: ${card.querySelector('img').alt}`);
      card.addEventListener('click', event => {
        if (gestureConsumed && event.detail !== 0) { gestureConsumed = false; return; }
        select(i);
      });
      card.addEventListener('animationend', () => card.classList.remove('is-entering'));
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'ig-dot';
      dot.setAttribute('aria-label', `Ver foto ${i + 1}`);
      dot.setAttribute('aria-controls', track.id);
      dot.addEventListener('click', () => select(i));
      dots.append(dot);
    });
    prev.addEventListener('click', () => select(current - 1));
    next.addEventListener('click', () => select(current + 1));
    track.addEventListener('keydown', event => {
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        event.preventDefault();
        select(current + (event.key === 'ArrowRight' ? 1 : -1));
      } else if (event.key === 'Home' || event.key === 'End') {
        event.preventDefault();
        select(event.key === 'Home' ? 0 : cards.length - 1);
      }
    });
    track.addEventListener('pointerdown', event => {
      if (event.isPrimary === false || event.button !== 0) return;
      pointer = { id: event.pointerId, x: event.clientX, y: event.clientY };
      gestureConsumed = false;
    });
    window.addEventListener('pointerup', event => {
      if (!pointer || event.pointerId !== pointer.id) return;
      const dx = event.clientX - pointer.x;
      const dy = event.clientY - pointer.y;
      pointer = null;
      if (Math.abs(dx) < 40 || Math.abs(dx) <= Math.abs(dy) * 1.25) return;
      gestureConsumed = true;
      select(current + (dx < 0 ? 1 : -1));
    });
    window.addEventListener('pointercancel', () => { pointer = null; });
    const updateMotion = () => {
      if (reduce.matches) cards.forEach(card => card.classList.remove('is-entering'));
    };
    if (reduce.addEventListener) reduce.addEventListener('change', updateMotion);
    else if (reduce.addListener) reduce.addListener(updateMotion);
    controls.hidden = cards.length < 2;
    prev.disabled = next.disabled = cards.length < 2;
    select(0, false);
    carousel.classList.add('ig-enhanced');
  });
})();
