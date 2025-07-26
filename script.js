const lightbox = document.getElementById('lightbox');
const swiper = new Swiper('.swiper', {
  loop: false,
  navigation: false,
  pagination: false,
  allowTouchMove: true,
});

let scrollY = 0;

function openLightbox() {
  scrollY = window.scrollY;
  lightbox.style.display = 'block';
  document.body.classList.add('lightbox-open');
  document.body.style.position = 'fixed';
  document.body.style.top = `-${scrollY}px`;
  document.body.style.width = '100%';
  
  swiper.slideTo(0); // ✅ 最初のスライドを表示してから
  
     // ✅ スライド切替アニメーションが終わったら中央揃え
  swiper.once('transitionEnd', () => {
    forceSlideCentering();
  });

  requestAnimationFrame(() => {
    lightbox.classList.add('active'); // アニメーション開始
  });
} 

function closeLightbox() {
  lightbox.classList.remove('active'); // ズームイン解除
  lightbox.classList.add('closing');   // ズームアウト開始

    setTimeout(() => {
    lightbox.style.display = 'none';
    lightbox.classList.remove('closing');
    document.body.classList.remove('lightbox-open');
    document.body.style.position = '';
    document.body.style.top = '';
    window.scrollTo(0, scrollY);
  }, 400); // CSSと同じ0.4秒
}

// Lightboxを開く処理（例：.projectクリックなどから呼び出し）
document.querySelectorAll('.project').forEach(project => {
  project.addEventListener('click', (e) => {
    e.preventDefault();
    openLightbox();
    swiper.slideTo(0); // 必要なら最初のスライドへ
  });
});

// Lightboxを閉じる処理（画像をタップしたとき）
lightbox.addEventListener('click', (e) => {
  if (e.target.closest('.swiper-slide')) {
    closeLightbox();
  }
});

// Lightbox表示時の画像が中央に来ない問題の対処
function forceSlideCentering() {
  document.querySelectorAll('.swiper-slide img, .swiper-slide video').forEach(el => {
    const slide = el.closest('.swiper-slide');
    if (slide) {
      slide.style.display = 'none';
      void el.offsetHeight;
      slide.style.display = 'flex';
    }
  });
}

