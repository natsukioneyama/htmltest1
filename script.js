

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
    { src: "img/untitled/01/15.jpg", caption: `<p>Photography Lucie Rox</p><p>Stylist Someone Name</p>`},
     { src: "img/untitled/01/22.jpg", caption: ``},
      { src: "img/untitled/01/14.jpg", caption: "" },
       { src: "img/untitled/01/11.jpg", caption: "" },
        { src: "img/untitled/01/07.jpg", caption: "" },
         { src: "img/untitled/01/09.jpg", caption: "" }
  ],
  [ // Project 1: SANS TITLE
    { src: "img/beautypapers/01/07.jpg", caption: '<p>Photography Lucie Rox</p><p>Stylist Someone Name</p>' },
     { src: "img/beautypapers/01/20.jpg", caption: "" },
      { src: "img/beautypapers/01/16.jpg", caption: "" },
       { src: "img/beautypapers/01/14.jpg", caption: "" },
        { src: "img/beautypapers/01/12.jpg", caption: "" },
         { src: "img/beautypapers/01/06.jpg", caption: "" },
          { src: "img/beautypapers/01/03.jpg", caption: "" }
  ],
   [ 
     { src: "thumbs/voguemexico/01/IMG_6345.jpg", caption: `<p>Photography Lucie Rox</p><p>Stylist Someone Name</p>`}
  ],
     [ 
     { src: "img/sanstitle/001/13.jpg", caption: `<p>Photography Lucie Rox</p><p>Stylist Someone Name</p>`},
      { src: "img/sanstitle/001/10.jpg", caption: ``},
       { src: "img/sanstitle/001/05.jpg", caption: ``},
        { src: "img/sanstitle/001/04.jpg", caption: ``},
         { src: "img/sanstitle/001/02.jpg", caption: ``}
  ],
       [ 
     { src: "img/replicaman/ss24/22.jpg", caption: `<p>Photography Lucie Rox</p><p>Stylist Someone Name</p>`},
      { src: "img/replicaman/ss24/21.jpg", caption: ``},
       { src: "img/replicaman/ss24/18.jpg", caption: ``},
         { src: "img/replicaman/ss24/16.jpg", caption: ``},
           { src: "img/replicaman/ss24/03.jpg", caption: ``},
             { src: "img/replicaman/ss24/11.jpg", caption: ``}
     
  ],
   [ 
     { src: "img/thegreatest/symmetryissue_/02.jpg", caption: `<p>Photography Lucie Rox</p><p>Stylist Someone Name</p>`},
      { src: "img/thegreatest/symmetryissue_/31.jpg", caption: ``},
       { src: "img/thegreatest/symmetryissue_/18.jpg", caption: ``},
         { src: "img/thegreatest/symmetryissue_/27.jpg", caption: ``},
           { src: "img/thegreatest/symmetryissue_/17.jpg", caption: ``},
             { src: "img/thegreatest/symmetryissue_/05.jpg", caption: ``},
              { src: "img/thegreatest/symmetryissue_/04.jpg", caption: ``}
  ],
  [ // Project 6: NUMERO VIDEO
  {
    src: "video/numeroswitzerlandhomme/NShomme01.mp4",
    type: "video",
    caption: "<p> Numéro Switzerland Homme</p>"
  }
],



];

// ✅ Overview用 Justified Gallery 初期化
function setupJustifiedGallery() {
  const screenWidth = $(window).width();
  let rowHeight;

  if (screenWidth < 600) {
    rowHeight = 120;
  } else if (screenWidth < 900) {
    rowHeight = 180;
  } else {
    rowHeight = 220;
  }

  $('#overviewGallery').justifiedGallery('destroy').justifiedGallery({
    rowHeight: rowHeight,
    margins: 5,
    lastRow: 'nojustify'
  });
}

$(document).ready(setupJustifiedGallery);
$(window).on('resize', function () {
  clearTimeout(window.resizeTimer);
  window.resizeTimer = setTimeout(setupJustifiedGallery, 250);
});


// ✅ ここに入れてください（TOPページ用）
document.querySelectorAll(".project a img, .project a video").forEach((el) => {
  el.addEventListener("click", (e) => {
    if (isOverviewMode) return;
    e.preventDefault();

    const projectElement = el.closest(".project");
    const index = parseInt(projectElement.dataset.project);
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
      type: $(this).data('type') || 'image',
      caption: $(this).data('caption') || ''
    };
  }).get();
  const index = $('#overviewGallery a').index(this);
  openLightbox(allImages, index);
});



// ✅ Lightbox 表示関数
// ✅ Lightbox 表示関数
function openLightbox(imageArray, startIndex) {
  swiperWrapper.innerHTML = '';

  imageArray.forEach(item => {
    const src = typeof item === 'string' ? item : item.src;
    const type = typeof item === 'string' ? 'image' : item.type || 'image';
    let rawCaption = typeof item === 'string' ? '' : item.caption || '';

    rawCaption = rawCaption.replace(/<br\s*\/?>/gi, '\n');
    if (!rawCaption.includes('<p>')) {
      const lines = rawCaption.split('\n');
      rawCaption = lines.map(line => `<p>${line.trim()}</p>`).join('');
    }

    const mediaElement = (type === 'video')
        ? `<video src="${src}" autoplay muted loop playsinline style="max-width: 80vw; max-height: 80vh;"></video>`
        : `<img src="${src}" />`;

    swiperWrapper.innerHTML += `
      <div class="swiper-slide">
        <div class="slide-content">
          <div class="img-wrapper">
            ${mediaElement}
            ${rawCaption ? `<div class="caption">${rawCaption}</div>` : ""}
          </div>
        </div>
      </div>
    `;
  });

  // スクロール固定処理などはそのまま
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
  const projects = document.getElementById('projects');
  let isOverviewMode = false;
  let overviewSlides = [];

  toggleBtn.addEventListener('click', () => {
    isOverviewMode = !isOverviewMode;

    toggleBtn.innerHTML = isOverviewMode
      ? '<i class="fas fa-square"></i>'
      : '<i class="fas fa-th-large"></i>';

    overviewGallery.style.display = isOverviewMode ? 'block' : 'none';
    if (projects) {
      projects.style.display = isOverviewMode ? 'none' : '';
    }

    // ✅ 他セクションをトグル（1回だけ！）
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

    document.querySelectorAll('.section-header').forEach(el => {
      el.style.display = isOverviewMode ? 'none' : '';
    });

    // ✅ overviewSlides を生成
    if (isOverviewMode) {
      overviewSlides = Array.from(document.querySelectorAll('#overviewGallery a')).map(link => {
        const raw = link.dataset.caption || "";
        const type = link.dataset.type || "image";

        let captionHtml;
        if (raw.includes('<p>')) {
          captionHtml = raw;
        } else {
          const lines = raw.split('\n');
          captionHtml = lines.map(line => `<p>${line.trim()}</p>`).join('');
        }

        return {
          src: link.getAttribute('href'),
          type: type,
          caption: captionHtml
        };
      });
    } else {
      overviewSlides = [];
    }
  });
});

