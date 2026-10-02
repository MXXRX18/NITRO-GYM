/* Nitro Gym — responsive navigation and unobtrusive scroll transitions. */
(() => {
  'use strict';
  const nav = document.getElementById('navbar');
  const menu = document.getElementById('mobileMenu');
  const toggle = document.getElementById('hamburger');
  const close = menu.querySelector('.mobile-close');
  const wideLayout = window.matchMedia('(min-width: 981px)');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let previousOverflow = '';
  let fallbackOpen = false;

  document.documentElement.classList.replace('no-js', 'js');

  function menuIsOpen() { return menu.open || fallbackOpen; }
  function synchronizeMenu() {
    const open = menuIsOpen();
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    toggle.classList.toggle('active', open);
    if (!open) {
      document.body.style.overflow = previousOverflow;
      fallbackOpen = false;
    }
  }
  function closeMenu(restoreFocus = true) {
    if (!menuIsOpen()) return;
    if (typeof menu.close === 'function') menu.close();
    else {
      menu.removeAttribute('open');
      fallbackOpen = false;
    }
    synchronizeMenu();
    if (restoreFocus && !wideLayout.matches) toggle.focus({ preventScroll: true });
  }
  function openMenu() {
    if (menuIsOpen()) return;
    previousOverflow = document.body.style.overflow;
    if (typeof menu.showModal === 'function') menu.showModal();
    else {
      menu.setAttribute('open', '');
      fallbackOpen = true;
      close.focus();
    }
    document.body.style.overflow = 'hidden';
    synchronizeMenu();
  }
  function toggleMenu() { menuIsOpen() ? closeMenu() : openMenu(); }
  // Keep compatibility with the original toggleMenu entry point.
  window.toggleMenu = toggleMenu;
  toggle.addEventListener('click', toggleMenu);
  close.addEventListener('click', () => closeMenu());
  menu.addEventListener('close', synchronizeMenu);
  menu.addEventListener('cancel', event => { event.preventDefault(); closeMenu(); });
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      closeMenu(false);
      if (link.hash && link.origin === location.origin) {
        const section = document.getElementById(link.hash.slice(1));
        if (section) {
          section.setAttribute('tabindex', '-1');
          section.focus({ preventScroll: true });
        }
      }
    });
  });
  menu.addEventListener('click', event => {
    if (event.target !== menu) return;
    const rect = menu.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) closeMenu();
  });
  document.addEventListener('keydown', event => {
    if (!fallbackOpen) return;
    if (event.key === 'Escape') { event.preventDefault(); closeMenu(); }
    if (event.key === 'Tab') {
      const focusable = [...menu.querySelectorAll('a,button')];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  });
  const resetOnDesktop = () => { if (wideLayout.matches) closeMenu(false); };
  if (wideLayout.addEventListener) wideLayout.addEventListener('change', resetOnDesktop);
  else wideLayout.addListener(resetOnDesktop);

  let scrolling = false;
  const updateNavbar = () => {
    nav.classList.toggle('scrolled', window.scrollY > 36);
    scrolling = false;
  };
  window.addEventListener('scroll', () => {
    if (!scrolling) { scrolling = true; window.requestAnimationFrame(updateNavbar); }
  }, { passive: true });
  updateNavbar();

  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reducedMotion.matches) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.remove('pending');
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' });
    reveals.forEach(element => {
      if (element.getBoundingClientRect().top > window.innerHeight - 20) {
        element.classList.add('pending');
        observer.observe(element);
      } else element.classList.add('visible');
    });
    const revealWithoutMotion = () => {
      if (!reducedMotion.matches) return;
      observer.disconnect();
      reveals.forEach(element => { element.classList.remove('pending'); element.classList.add('visible'); });
    };
    if (reducedMotion.addEventListener) reducedMotion.addEventListener('change', revealWithoutMotion);
  } else reveals.forEach(element => element.classList.add('visible'));

  const links = [...document.querySelectorAll('.nav-links a')];
  if ('IntersectionObserver' in window) {
    const activeSection = new IntersectionObserver(entries => {
      const visible = entries.find(entry => entry.isIntersecting);
      if (!visible) return;
      links.forEach(link => {
        const active = link.hash === '#' + visible.target.id;
        link.classList.toggle('active', active);
        if (active) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }, { rootMargin: '-20% 0px -65% 0px', threshold: 0 });
    links.forEach(link => {
      const target = document.getElementById(link.hash.slice(1));
      if (target) activeSection.observe(target);
    });
  }
})();
