

function closeLightbox() {
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.width = '';
  window.scrollTo(0, scrollPosition);
}



let swiper;
const lightbox = document.getElementById("lightbox");
const swiperWrapper = document.getElementById("swiper-wrapper");
const projects = document.getElementById("projects");
const overviewGallery = document.getElementById("overviewGallery");
let isOverviewMode = false;

// ✅ プロジェクトごとの全画像を定義
const projectGalleries = [
  [ // Project 0: UNTITLED
    { src: "img/untitled/01/11.jpg", caption: `<p>Photography Lucie Rox</p><p>Stylist Someone Name</p>`},
    { src: "img/untitled/01/12.jpg", caption: `<p>Photography Lucie Rox</p><p>Stylist Someone Name</p>`},
    { src: "img/untitled/01/13.jpg", caption: "" },
    { src: "img/untitled/01/14.jpg", caption: "" }
  ],
  [ // Project 1: SANS TITLE
    { src: "img/sanstitle/001/05.jpg", caption: "" },
    { src: "img/sanstitle/001/06.jpg", caption: "" }
  ],
   [ 
     { src: "img/beautypapers/01/07.jpg", caption: `<p>Photography Lucie Rox</p><p>Stylist Someone Name</p>`},
     { src: "img/beautypapers/01/08.jpg", caption: `<p>Photography Lucie Rox</p><p>Stylist Someone Name</p>`}
  ],
     [ 
     { src: "img/replicaman/ss24/02.jpg", caption: `<p>Photography Lucie Rox</p><p>Stylist Someone Name</p>`},
     { src: "img/replicaman/ss24/06.jpg", caption: `<p>Photography Lucie Rox</p><p>Stylist Someone Name</p>`}
  ],
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
    let rawCaption = typeof item === 'string' ? '' : item.caption || '';

    // ✅ HTMLエンティティとしての <br> を正規表現で置換
    rawCaption = rawCaption.replace(/<br\s*\/?>/gi, '\n'); // ← 改行に一旦変換

    // ✅ 改行ごとに <p> タグで包む
    if (!rawCaption.includes('<p>')) {
      const lines = rawCaption.split('\n');
      rawCaption = lines.map(line => `<p>${line.trim()}</p>`).join('');
    }

    swiperWrapper.innerHTML += `
      <div class="swiper-slide">
        <div class="slide-content">
          <img src="${src}" />
          ${rawCaption ? `<div class="caption">${rawCaption}</div>` : ""}
        </div>
      </div>
    `;
  });

 const scrollPosition = window.scrollY || window.pageYOffset;
  document.body.classList.add("lightbox-open");
  document.body.style.position = "fixed";
  document.body.style.top = `-${scrollPosition}px`;
  document.body.style.left = "0";
  document.body.style.right = "0";
  document.body.style.overflow = "hidden";
  document.body.style.width = "100%";
  document.body.dataset.scrollPosition = scrollPosition.toString();

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
  },
  on: {
    imagesReady: () => swiper.update()
  
    }
  });

  lightbox.classList.add("active");
  document.body.style.overflow = "hidden";
}



function closeLightbox() {
  const savedScroll = parseInt(document.body.dataset.scrollPosition || "0", 10);
  document.body.classList.remove("lightbox-open");
  document.body.style.position = "";
  document.body.style.top = "";
  document.body.style.left = "";
  document.body.style.right = "";
  document.body.style.overflow = "";
  document.body.style.width = "";
  delete document.body.dataset.scrollPosition;

  // ✅ 少し遅延させて scroll を戻す（iOS含め反映しやすくなる）
  setTimeout(() => {
    window.scrollTo({ top: savedScroll, behavior: "instant" });
  }, 0);
}





// ✅ Lightbox背景クリックで閉じる
lightbox.addEventListener('click', (e) => {
  const isClickOnImage = e.target.closest('img');
  const isClickOnNav = e.target.closest('.swiper-button-next') || e.target.closest('.swiper-button-prev');

  if (!isClickOnImage && !isClickOnNav) {
    lightbox.classList.remove('active');

    if (swiper) swiper.destroy();
    closeLightbox(); // ← 必ず呼び出す
  }
});



document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('toggleOverview');
  const overviewGallery = document.getElementById('overviewGallery');
  let isOverviewMode = false;

  toggleBtn.addEventListener('click', () => {
    isOverviewMode = !isOverviewMode;

    // アイコンを切り替え
    toggleBtn.innerHTML = isOverviewMode
      ? '<i class="fas fa-square"></i>'
      : '<i class="fas fa-th-large"></i>';

    // Overview ギャラリー表示の切り替え
    overviewGallery.style.display = isOverviewMode ? 'block' : 'none';

    // projects セクションの切り替え
    const projects = document.getElementById('projects');
    if (projects) {
      projects.style.display = isOverviewMode ? 'none' : '';
    }

    // 他セクションをトグル
    const elementsToToggle = [
      document.querySelector('.header'),
      document.querySelector('.projects-section'),
      document.querySelector('.archive-section'),
      document.querySelectorAll('.section-divider'),
      document.querySelector('.contact-section'),
      document.querySelector('.bio-section'),
      document.querySelector('footer.site-footer')
    ];

    elementsToToggle.forEach(el => {
      if (!el) return;
      if (NodeList.prototype.isPrototypeOf(el)) {
        el.forEach(item => item.style.display = isOverviewMode ? 'none' : '');
      } else {
        el.style.display = isOverviewMode ? 'none' : '';
      }
    });
  });
});

