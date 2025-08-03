let swiper;
const lightbox = document.getElementById("lightbox");
const swiperWrapper = document.getElementById("swiper-wrapper");
const projects = document.getElementById("projects");
const overviewGallery = document.getElementById("overviewGallery");
let isOverviewMode = false;

// ✅ プロジェクトごとの全画像を定義
const projectGalleries = [
  [ // Project 0: UNTITLED
    { src: "img/untitled/01/11.jpg", caption: `<p>Photographer: Lucie Rox</p><p>Stylist: Someone Name</p>`},
    { src: "img/untitled/01/12.jpg", caption: "" },
    { src: "img/untitled/01/13.jpg", caption: "Close-up view" },
    { src: "img/untitled/01/14.jpg", caption: "" }
  ],
  [ // Project 1: SANS TITLE
    "img/sanstitle/001/05.jpg",
    "img/sanstitle/001/06.jpg"
  ]
];

// ✅ Overview用 Justified Gallery 初期化
$('#overviewGallery').justifiedGallery({
  rowHeight: 180,
  margins: 5
})

  .on('jg.complete', function () {
    const allAnchors = $('#overviewGallery a').length;
    const visibleEntries = $('#overviewGallery .jg-entry').length;

    console.log(`📸 Overviewギャラリー：${allAnchors} 枚中 ${visibleEntries} 枚をレイアウト表示中`);
  });

// ✅ トップページの代表サムネイルクリック → 各プロジェクトの全画像 Lightbox 表示
document.querySelectorAll(".project").forEach((project) => {
  project.addEventListener("click", (e) => {
    if (isOverviewMode) return; // overview中は無効
    e.preventDefault();
    const index = parseInt(project.dataset.project);
    const images = projectGalleries[index];
    openLightbox(images, 0);
  });
});

// ✅ Overview モードの画像クリック → 全画像をLightboxに表示
$('#overviewGallery').on('click', 'a', function (e) {
  e.preventDefault();
  const allImages = $('#overviewGallery a').map(function () {
    return {
      src: $(this).attr('href'),
      caption: $(this).data('caption') || ''
    };
  }).get();
  const index = $('#overviewGallery a').index(this);
  openLightbox(allImages, index);
});


// ✅ Lightbox 表示関数
function openLightbox(imageArray, startIndex) {
  swiperWrapper.innerHTML = '';
  imageArray.forEach(item => {
    const src = typeof item === 'string' ? item : item.src;
    const caption = typeof item === 'string' ? '' : item.caption || '';
    swiperWrapper.innerHTML += `
      <div class="swiper-slide">
        <div class="slide-content">
          <img src="${src}" />
          ${caption ? `<div class="caption">${caption}</div>` : ""}
        </div>
      </div>
    `;
  });

  if (swiper) swiper.destroy();
  swiper = new Swiper('.swiper', {
    loop: false,
    initialSlide: startIndex,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    keyboard: {
      enabled: true
    }
  });

  lightbox.classList.add("active");
  document.body.style.overflow = "hidden"; 
}

// ✅ Lightbox背景クリックで閉じる
lightbox.addEventListener('click', (e) => {
  const isClickOnImage = e.target.closest('img');
  const isClickOnNav = e.target.closest('.swiper-button-next') || e.target.closest('.swiper-button-prev');

  if (!isClickOnImage && !isClickOnNav) {
    lightbox.classList.remove('active');
    document.body.style.overflow = "";
    
    if (swiper) swiper.destroy();
  }
});


// ✅ Overview 切り替えボタン
document.getElementById('toggleOverview').addEventListener('click', () => {
  isOverviewMode = !isOverviewMode;
  overviewGallery.style.display = isOverviewMode ? 'block' : 'none';
  projects.style.display = isOverviewMode ? 'none' : 'block';
});
