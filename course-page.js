// Course page behaviors: menu toggle, footer year, side arrows, lightbox
document.addEventListener('DOMContentLoaded', () => {
  // Footer year
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // Mobile menu toggle
  const t = document.querySelector('.menu-toggle');
  const l = document.querySelector('.nav-links');
  t?.addEventListener('click', () => {
    const open = l.classList.toggle('open');
    t.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  // Gallery arrows (scroll by one card width + gap)
  const scroller = document.getElementById('scroller');
  const prevBtn  = document.getElementById('prevBtn');
  const nextBtn  = document.getElementById('nextBtn');

  function stepWidth() {
    const first = scroller?.querySelector('figure');
    return first ? first.getBoundingClientRect().width + 12 : 320;
  }
  prevBtn?.addEventListener('click', () =>
    scroller.scrollBy({ left: -stepWidth(), behavior: 'smooth' })
  );
  nextBtn?.addEventListener('click', () =>
    scroller.scrollBy({ left:  stepWidth(), behavior: 'smooth' })
  );

  // Lightbox
  const lightbox = document.getElementById('lightbox');
  const lbImg    = document.getElementById('lightboxImg');
  const lbCap    = document.getElementById('lightboxCap');
  const lbClose  = document.getElementById('lightboxClose');

  function openLightbox(src, cap, alt) {
    lbImg.src = src;
    lbImg.alt = alt || cap || '';
    lbCap.textContent = cap || '';
    lightbox.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox() {
    lightbox.setAttribute('hidden', '');
    lbImg.src = '';
    document.body.style.overflow = '';
  }

  // Open on image click
  scroller?.addEventListener('click', (e) => {
    const img = e.target.closest('img');
    if (!img) return;
    const fig = img.closest('figure');
    const cap = fig?.querySelector('figcaption')?.textContent?.trim() || img.alt || '';
    openLightbox(img.src, cap, img.alt);
  });

  // Close actions
  lbClose?.addEventListener('click', closeLightbox);
  lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox(); // click overlay
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !lightbox.hasAttribute('hidden')) closeLightbox();
    if (e.key === 'ArrowRight') nextBtn?.click();
    if (e.key === 'ArrowLeft')  prevBtn?.click();
  });
});
