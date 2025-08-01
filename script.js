console.log("justifiedLayout loaded?", typeof justifiedLayout);


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

let overviewSlides = [];

// ギャラリー画像
const galleries = [
  {
    images: [
      { src: "img/Untitled_/01/08.jpg", caption: "Untitled<br>Photography: Lucie Rox" },
      { src: "img/Untitled_/01/12.jpg", caption: "" },
      { src: "img/Untitled_/01/07.jpg", caption: "" },
      { src: "img/Untitled_/01/14.jpg", caption: "" },
      { src: "img/Untitled_/01/04.jpg", caption: "" },
      { src: "img/Untitled_/01/15.jpg", caption: "" },
      { src: "img/Untitled_/01/03.jpg", caption: "" }
    ],
  },
  {
    images: [
      { src: "img/sanstitle/001/06.jpg", caption: "Photography: Tess Petronio <br>Styling: Susanne Koller" },
      { src: "img/sanstitle/001/13.jpg", caption: "" },
      { src: "img/sanstitle/001/15.jpg", caption: "" },
      { src: "img/sanstitle/001/09.jpg", caption: "" },
      { src: "img/sanstitle/001/01.jpg", caption: "" }
    ],
  },
  {
    images: [
      { src: "img/beautypapers/03.jpg", caption: "Photography: Jeremie Monnier" },
      { src: "img/beautypapers/13.jpg", caption: "" },
      { src: "img/beautypapers/09.jpg", caption: "" },
      { src: "img/beautypapers/14.jpg", caption: "" },
      { src: "img/beautypapers/07.jpg", caption: "" },
      { src: "img/beautypapers/15.jpg", caption: "" },
      { src: "img/beautypapers/16.jpg", caption: "" }
    ],
  },
  {
    images: [
      { src: "img/Replica man/ss24/17.jpg", caption: "Photography: Pavel Golik <br>Styling: Andrej Skok" },
      { src: "img/Replica man/ss24/16.jpg", caption: "" },
      { src: "img/Replica man/ss24/13.jpg", caption: "" },
      { src: "img/Replica man/ss24/11.jpg", caption: "" },
      { src: "img/Replica man/ss24/03.jpg", caption: "" },
      { src: "img/Replica man/ss24/08.jpg", caption: "" }
    ],
  }
];

const lightbox = document.getElementById("lightbox");
const swiperWrapper = document.getElementById("swiper-wrapper");
const toggleButton = document.getElementById("toggleOverview");
const projects = document.getElementById("projects");
const overviewGallery = document.getElementById("overviewGallery");

let scrollPosition = 0;
let isOverviewMode = false;

// スライド読み込み（通常モード用）
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

// Lightboxを開く（通常モード）
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
  overviewGallery.style.visibility = "hidden";
  overviewSlides = [];

  const imageElements = [];
  const promises = [];

  galleries.forEach((gallery) => {
    gallery.images.forEach((image) => {
      const img = new Image();
      img.src = image.src;

      const promise = new Promise((resolve) => {
        img.onload = () => {
          imageElements.push({
            width: img.naturalWidth,
            height: img.naturalHeight,
            src: img.src,
            caption: image.caption
          });
          resolve();
        };
        img.onerror = resolve;
      });

      promises.push(promise);
    });
  });

  Promise.all(promises).then(() => {
    const containerWidth = overviewGallery.clientWidth || window.innerWidth;

    const layout = justifiedLayout(
      imageElements.map(el => ({ width: el.width, height: el.height })),
      {
        containerWidth: containerWidth,
        targetRowHeight: 200,
        boxSpacing: 10
      }
    );

    overviewGallery.style.height = layout.containerHeight + 'px';

    const fragment = document.createDocumentFragment(); // 一時的にDOMを作る

    layout.boxes.forEach((box, i) => {
      const image = imageElements[i];
      const img = document.createElement("img");
      img.src = image.src;
      img.alt = "Overview thumbnail";
      img.style.top = `${box.top}px`;
      img.style.left = `${box.left}px`;
      img.style.width = `${box.width}px`;
      img.style.height = `${box.height}px`;
      img.style.position = "absolute";

      const globalIndex = overviewSlides.length;
      img.addEventListener("click", () => {
        openOverviewLightbox(globalIndex);
      });

      fragment.appendChild(img);
      overviewSlides.push({
        src: image.src,
        caption: image.caption
      });
    });

    overviewGallery.replaceChildren(fragment); // ← 一気に置き換え！（ちらつき防止）
    overviewGallery.style.visibility = "visible";
  });
}










// overview表示モードで全スライド表示
function openOverviewLightbox(startIndex = 0) {
  scrollPosition = window.scrollY;

  document.body.style.position = 'fixed';
  document.body.style.top = `-${scrollPosition}px`;
  document.body.style.width = '100%';
  document.body.style.overflow = 'hidden';
  document.body.style.height = '100vh';

  document.body.classList.add("lightbox-open");
  lightbox.style.display = "flex";

  swiperWrapper.innerHTML = "";
  overviewSlides.forEach(image => {
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
  swiper.slideTo(startIndex);
}

// overviewトグルボタンの動作
const header = document.querySelector("header");
const introText = document.querySelector(".intro-text");
const latestWorksTitle = document.querySelector("h2");
const mainContent = document.querySelector(".main-content");


toggleButton.addEventListener("click", () => {
  const isVisible = overviewGallery.style.display !== "none";
  isOverviewMode = !isVisible;

  const footer = document.querySelector("footer");
  const copyright = document.querySelector(".footer-copyright");

  if (isVisible) {
    overviewGallery.style.display = "none";

    if (mainContent) mainContent.style.display = "";
    if (header) header.style.display = "";
    if (introText) introText.style.display = "";
    if (latestWorksTitle) latestWorksTitle.style.display = "";
    if (footer) footer.style.display = "";
    if (copyright) copyright.style.display = "";

    toggleButton.textContent = "⣿";
  } else {
    
    overviewGallery.style.display = "block"; 
    populateOverview();
  

    if (mainContent) mainContent.style.display = "none";
    if (header) header.style.display = "none";
    if (introText) introText.style.display = "none";
    if (latestWorksTitle) latestWorksTitle.style.display = "none";
    if (footer) footer.style.display = "none";
    if (copyright) copyright.style.display = "none";

    toggleButton.textContent = "=";
  }
});

window.addEventListener("resize", () => {
  if (isOverviewMode) populateOverview();
});


let resizeTimeout;

window.addEventListener("resize", () => {
  if (!isOverviewMode) return;

  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    populateOverview();
  }, 500); // ← リサイズ停止から500ms後に1回だけ実行
});

