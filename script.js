// script.js

const lightbox = document.getElementById('lightbox');
const swiper = new Swiper('.swiper', {
  loop: false,
  navigation: false,
  pagination: false,
  allowTouchMove: true,
});

function openLightbox() {
  lightbox.style.display = 'block';
}

// スワイプ以外のクリックで閉じる
lightbox.addEventListener('click', (e) => {
  if (e.target.closest('.swiper-slide')) {
    lightbox.style.display = 'none';
  }
});
