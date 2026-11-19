const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    }
  }, { threshold: 0.08, rootMargin: '0px 0px 40px 0px' });
  reveals.forEach(element => observer.observe(element));
} else {
  reveals.forEach(element => element.classList.add('visible'));
}

const lightbox = document.querySelector('.lightbox');
const lightboxImage = lightbox.querySelector('img');
const lightboxCaption = lightbox.querySelector('p');
const closeButton = lightbox.querySelector('.lightbox-close');
let previousFocus;

document.querySelectorAll('[data-full]').forEach(button => {
  button.addEventListener('click', () => {
    previousFocus = document.activeElement;
    lightboxImage.src = button.dataset.full;
    lightboxImage.alt = button.dataset.alt;
    lightboxCaption.textContent = button.dataset.alt;
    lightbox.showModal();
    closeButton.focus();
  });
});

function closeLightbox() {
  lightbox.close();
  lightboxImage.removeAttribute('src');
  previousFocus?.focus();
}
closeButton.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', event => {
  if (event.target === lightbox) closeLightbox();
});
lightbox.addEventListener('close', () => {
  lightboxImage.removeAttribute('src');
  previousFocus?.focus();
});
