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
   document.body.classList.add('lightbox-open'); // ✅ スクロール防止
}

// スワイプ以外のクリックで閉じる
lightbox.addEventListener('click', (e) => {
  if (e.target.closest('.swiper-slide')) {
    lightbox.style.display = 'none';
        document.body.classList.remove('lightbox-open'); // ✅ スクロール解除
  }
});
