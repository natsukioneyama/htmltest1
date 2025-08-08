

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
    { src: "img/untitled/01/15.jpg", caption: `<p>Photographer: Lucie Rox</p>`},
     { src: "img/untitled/01/22.jpg", caption: ``},
      { src: "img/untitled/01/14.jpg", caption: "" },
       { src: "img/untitled/01/11.jpg", caption: "" },
        { src: "img/untitled/01/07.jpg", caption: "" },
         { src: "img/untitled/01/09.jpg", caption: "" }
  ],
  [ // Project 1: SANS TITLE
    { src: "img/beautypapers/01/07.jpg", caption: '<p>Photographer: Jeremie Monnier</p>' },
     { src: "img/beautypapers/01/20.jpg", caption: "" },
      { src: "img/beautypapers/01/16.jpg", caption: "" },
       { src: "img/beautypapers/01/14.jpg", caption: "" },
        { src: "img/beautypapers/01/12.jpg", caption: "" },
         { src: "img/beautypapers/01/06.jpg", caption: "" },
          { src: "img/beautypapers/01/03.jpg", caption: "" }
  ],

     [ 
     { src: "img/sanstitle/001/13.jpg", caption: `<p>Photographer: Tess Petronio</p><br><p>Styling: Suzanne Koller</p>`},
      { src: "img/sanstitle/001/10.jpg", caption: ``},
       { src: "img/sanstitle/001/05.jpg", caption: ``},
        { src: "img/sanstitle/001/04.jpg", caption: ``},
         { src: "img/sanstitle/001/02.jpg", caption: ``}
  ],
       [ 
     { src: "img/replicaman/ss24/22.jpg", caption: `<p>Photographer: Pavel Golik</p><br><p>Styling: Andrej Skok</p>`},
      { src: "img/replicaman/ss24/21.jpg", caption: ``},
       { src: "img/replicaman/ss24/18.jpg", caption: ``},
         { src: "img/replicaman/ss24/16.jpg", caption: ``},
           { src: "img/replicaman/ss24/03.jpg", caption: ``},
             { src: "img/replicaman/ss24/11.jpg", caption: ``}
     
  ],
   [ 
     { src: "img/thegreatest/symmetryissue_/02.jpg", caption: `<p>Photographer: Hein Gijsbers</p>`},
       { src: "img/thegreatest/symmetryissue_/18.jpg", caption: ``},
         { src: "img/thegreatest/symmetryissue_/27.jpg", caption: ``},
           { src: "img/thegreatest/symmetryissue_/17.jpg", caption: ``},
              { src: "img/thegreatest/symmetryissue_/04.jpg", caption: ``}
  ],
  [ 
  { src: "video/numeroswitzerlandhomme/NShomme01.mp4", type: "video",caption: "<p> Numéro Switzerland Homme</p>" }
],
   [ 
     { src: "img//lampoon/muscleissue/08.jpg", caption: `<p>Photographer: Manon Clavelier</p>`},
      { src: "img/lampoon/muscleissue/18.jpg", caption: ``},
       { src: "img/lampoon/muscleissue/07.jpg", caption: ``},
         { src: "img/lampoon/muscleissue/03.jpg", caption: ``},
           { src: "img/lampoon/muscleissue/06.jpg", caption: ``},
             { src: "img/lampoon/muscleissue/05.jpg", caption: ``}
  ],
     [ 
     { src: "img/numeroswitzerland/issue01-2/09.jpg", caption: `<p>Photographer: Antoine & Charlie</p>`},
      { src: "img/numeroswitzerland/issue01-2/07.jpg", caption: ``}
  ],
     [ 
     { src: "img/beauty/01/07.jpg", caption: ``},
      { src: "img/beauty/01/08.jpg", caption: ``},
       { src: "img/beauty/01/06.jpg", caption: ``},
        { src: "img/beauty/01/04.jpg", caption: ``},
         { src: "img/beauty/01/05.jpg", caption: ``},
          { src: "img/beauty/01/02.jpg", caption: ``},
           { src: "img/beauty/01/03.jpg", caption: ``},
            { src: "img/beauty/01/01.jpg", caption: ``}
  ],
       [ 
     { src: "img/10menmagazine/issue58/15.jpg", caption: `<p>Photographer: Allen Hamitouche</p>`},
      { src: "img/10menmagazine/issue58/22.jpg", caption: ``},
      { src: "img/10menmagazine/issue58/12.jpg", caption: ``},
      { src: "img/10menmagazine/issue58/11.jpg", caption: ``},
      { src: "img/10menmagazine/issue58/10.jpg", caption: ``},
      { src: "img/10menmagazine/issue58/08.jpg", caption: ``},
      { src: "img/10menmagazine/issue58/04.jpg", caption: ``},
      { src: "img/10menmagazine/issue58/05.jpg", caption: ``},
      { src: "img/10menmagazine/issue58/03.jpg", caption: ``},
  ],
      [
      { src: "img/dapperdan/25/07.jpg", caption: `<p>Photographer: Joe Lai</p>`},
      { src: "img/dapperdan/25/05.jpg", caption: ``},
      { src: "img/dapperdan/25/03.jpg", caption: ``},
      { src: "img/dapperdan/25/02.jpg", caption: ``}
  ],    
    [ 
  { src: "video/beauty/01/01.mp4", type: "video",caption: "<p>Dirctor: Beltran Gonzalez</p>" }
],
   [
    { src: "img/crash/103/11.jpg", caption: `<p>Photographer: Manuel Obadia-Wills</p>`},
    { src: "img/crash/103/09.jpg", caption: ``},
    { src: "img/crash/103/07.jpg", caption: ``},
    { src: "img/crash/103/08.jpg", caption: ``},
    { src: "img/crash/103/06.jpg", caption: ``},
    { src: "img/crash/103/05.jpg", caption: ``},
    { src: "img/crash/103/03.jpg", caption: ``},
    { src: "img/crash/103/04.jpg", caption: ``},  
],
    [ 
    { src: "video/nowness/massimilianobombas01.mp4", type: "video",caption: "<p>Director: Massimiliano Bomba</p>" }
],
    [
    { src: "img/nicotine/issue07/01.jpg", caption: `<p>Photographer: Fernando Uceda</p>`},
    { src: "img/nicotine/issue07/03.jpg", caption: ``},
    { src: "img/nicotine/issue07/02.jpg", caption: ``},
    { src: "img/nicotine/issue07/05.jpg", caption: ``},
    { src: "img/nicotine/issue07/13.jpg", caption: ``},
    { src: "img/nicotine/issue07/14.jpg", caption: ``},
    { src: "img/nicotine/issue07/09.jpg", caption: ``},
], 
  [ 
    { src: "video/givenchyss23/gv01.mp4", type: "video",caption: "<p></p>" },
    { src: "video/givenchyss23/gv02.mp4", type: "video",caption: "<p></p>" },
    { src: "video/givenchyss23/gv03.mp4", type: "video",caption: "<p></p>" }
  ],


];






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







