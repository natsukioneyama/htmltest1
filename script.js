function setVhUnit() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}
setVhUnit();
window.addEventListener('resize', setVhUnit);

// Swiper 初期化
const swiper = new Swiper(".swiper", {
  loop: false,
  keyboard: {
    enabled: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

// ギャラリー画像
const galleries = [
  {
    images: [
      { src: "img/Untitled_/01/04.jpg", caption: "Vogue Mexico<br>Photography: Tess Petronio<br>Styling: Name" },
      { src: "img/Untitled_/01/04.jpg", caption: "" }
    ],
  },
  {
    images: [
      { src: "img/Untitled_/01/04.jpg", caption: "" }
    ],
  },
  {
    images: [
      { src: "img/Untitled_/01/04.jpg", caption: "" }
    ],
  },
  {
    images: [
      { src: "img/Untitled_/01/04.jpg", caption: "" }
    ],
  }
];

// DOM取得
const lightbox = document.getElementById("lightbox");
const swiperWrapper = document.getElementById("swiper-wrapper");
const toggleButton = document.getElementById("toggleOverview");
const projects = document.getElementById("projects");
const overviewGallery = document.getElementById("overviewGallery");

let scrollPosition = 0;
let isOverviewMode = false;

// スライド読み込み
function loadSlides(index) {
  const gallery = galleries[index];
  swiperWrapper.innerHTML = "";

  gallery.images.forEach(image => {
    const slide = document.createElement("div");
    slide.className = "swiper-slide";
    slide.innerHTML = `
      <div class="slide-content">
        <img src="${image.src}" alt="Slide" />
        ${image.caption ? `<div class="caption">${image.caption}</div>` : ""}
      </div>
    `;
    swiperWrapper.appendChild(slide);
  });

  swiper.update();
}

// Lightboxを開く
function openLightbox(index, slideIndex = 0) {
  scrollPosition = window.scrollY;

  document.body.style.position = 'fixed';
  document.body.style.top = `-${scrollPosition}px`;
  document.body.style.width = '100%';
  document.body.style.overflow = 'hidden';
  document.body.style.height = '100vh';

  document.body.classList.add("lightbox-open");
  lightbox.style.display = "flex";

  loadSlides(index);
  swiper.slideTo(slideIndex);
}

// Lightboxを閉じる
function closeLightbox() {
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.width = '';
  document.body.style.overflow = '';
  document.body.style.height = '';
  window.scrollTo(0, scrollPosition);

  document.body.classList.remove('lightbox-open');
  lightbox.style.display = 'none';
}

// ギャラリークリックでlightbox開く（overview中は無効）
document.querySelectorAll(".project").forEach((project, index) => {
  project.dataset.index = index;
  project.addEventListener("click", () => {
    if (isOverviewMode) return;
    openLightbox(index, 0);
  });
});

// lightbox内クリックで閉じる（※指定通りこのロジックは変更しません）
lightbox.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("swiper-slide") ||
    e.target.closest(".swiper-slide")
  ) {
    closeLightbox();
  }
});

// overview用のサムネイル作成
function populateOverview() {
  overviewGallery.innerHTML = "";

  galleries.forEach((gallery, projectIndex) => {
    gallery.images.forEach((image, imageIndex) => {
      const thumb = document.createElement("img");
      thumb.src = image.src;
      thumb.alt = "Overview thumbnail";

      thumb.addEventListener("click", () => {
        openLightbox(projectIndex, imageIndex);
      });

      overviewGallery.appendChild(thumb);
    });
  });
}

// overviewトグルボタンの動作
const header = document.querySelector("header"); // ← あなたのヘッダー要素に合わせて
const introText = document.querySelector(".intro-text"); // ← 例えば"Represented by..."など
const latestWorksTitle = document.querySelector("h2"); // ← LATEST WORKS の見出しなど
const mainContent = document.querySelector(".main-content");



toggleButton.addEventListener("click", () => {
  const isVisible = overviewGallery.style.display === "grid";
  isOverviewMode = !isVisible;

  if (isVisible) {
    overviewGallery.style.display = "none";

    if (mainContent) mainContent.style.display = "";
    if (header) header.style.display = "";
    if (introText) introText.style.display = "";
    if (latestWorksTitle) latestWorksTitle.style.display = "";

    toggleButton.textContent = "⣿";
  } else {
    populateOverview();
    overviewGallery.style.display = "grid";

    if (mainContent) mainContent.style.display = "none";
    if (header) header.style.display = "none";
    if (introText) introText.style.display = "none";
    if (latestWorksTitle) latestWorksTitle.style.display = "none";

    toggleButton.textContent = "=";
  }
});






