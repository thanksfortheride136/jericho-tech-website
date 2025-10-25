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

  // ---- Edge fade visibility (hide at ends) ----
  const leftFade  = document.querySelector('.left-fade');
  const rightFade = document.querySelector('.right-fade');

  function updateFades() {
    if (!scroller) return;
    const max = scroller.scrollWidth - scroller.clientWidth - 1;
    const x = scroller.scrollLeft;
    // only show when we are away from an edge
    leftFade?.classList.toggle('show', x > 4);
    rightFade?.classList.toggle('show', x < max - 4);
  }

  scroller?.addEventListener('scroll', updateFades);
  window.addEventListener('resize', updateFades);
  // run once after layout paints
  requestAnimationFrame(updateFades);

  // Lightbox
  const lightbox = document.getElementById('lightbox');
  const lbImg    = document.getElementById('lightboxImg');
  const lbCap    = document.getElementById('lightboxCap');
  const lbClose  = document.getElementById('lightboxClose');

  // We'll inject/remove a <video> element when needed
  let lbVid = null;

  function showImageInLightbox(src, altOrCap, capText) {
    // remove any prior video
    if (lbVid) {
      lbVid.pause();
      lbVid.remove();
      lbVid = null;
    }
    lbImg.hidden = false;
    lbImg.src = src;
    lbImg.alt = altOrCap || capText || '';
    lbCap.textContent = capText || altOrCap || '';
    lightbox.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
  }

  function showVideoInLightbox(videoEl, capText) {
    // clean previous media
    lbImg.hidden = true;
    lbImg.src = '';
    if (lbVid) {
      lbVid.pause();
      lbVid.remove();
      lbVid = null;
    }
    // clone video sources into a new element for the lightbox
    lbVid = document.createElement('video');
    lbVid.controls = false;
    lbVid.autoplay = true;
    lbVid.loop = true;
    lbVid.playsInline = true;
    // copy <source> children
    lbVid.innerHTML = videoEl.innerHTML;

    const content = lightbox.querySelector('.lightbox-content');
    content.prepend(lbVid);

    lbCap.textContent = capText || '';
    lightbox.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.setAttribute('hidden', '');
    // cleanup
    if (lbVid) {
      lbVid.pause();
      lbVid.remove();
      lbVid = null;
    }
    lbImg.src = '';
    lbImg.hidden = false; // reset default
    document.body.style.overflow = '';
  }

  // Open on image OR video click
  scroller?.addEventListener('click', (e) => {
    const media = e.target.closest('img, video');
    if (!media) return;

    const fig = media.closest('figure');
    const cap = fig?.querySelector('figcaption')?.textContent?.trim() || '';

    if (media.tagName === 'IMG') {
      showImageInLightbox(media.src, media.alt, cap);
    } else {
      // it's a <video> tile
      showVideoInLightbox(media, cap);
    }
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
