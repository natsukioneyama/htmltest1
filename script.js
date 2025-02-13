
window.addEventListener('load', function() {
  setTimeout(function() {
    if (msnry) {
      msnry.reloadItems();
      msnry.layout();
    }
  }, 500); // 500ミリ秒の遅延
});


var msnry; // Masonry インスタンスをグローバルに保持
document.addEventListener("DOMContentLoaded", function() {
  var grid = document.querySelector('.gallery');
  
  // Masonry 初期化（imagesLoaded を使って画像がすべて読み込まれてから）
  imagesLoaded(grid, function() {
    msnry = new Masonry(grid, {
      itemSelector: '.gallery-item',
      columnWidth: '.gallery-item',
      percentPosition: true,
      gutter: 10
    });
  });

  /* スライドのデータ配列（ギャラリー順と対応） */
  var slides = [
    { type: "video", src: "video/numeroswitzerlandhomme/01.mp4", caption: "NUMERO SWITZERLAND" },
    { type: "image", src: "img/crash/103/08.jpg", caption: "CRASH x MANUEL OBADIA-WILLS" },
    { type: "image", src: "img/crash/103/03.jpg", caption: "CRASH x MANUEL OBADIA-WILLS" },
    { type: "image", src: "img/Untitled_/01/01.jpg", caption: "UNTITLED X LUCIE ROX" },
    { type: "image", src: "img/Untitled_/01/04.jpg", caption: "UNTITLED X LUCIE ROX" },
    { type: "image", src: "img/Untitled_/01/13.jpg", caption: "UNTITLED X LUCIE ROX" },
    { type: "image", src: "img/numeroswitzerlandhomme/Issue01/08.jpg", caption: "NUMERO SWITZERLAND" },
    { type: "image", src: "img/sanstitle/001/03.jpg", caption: "SANS TITLE-001 VISUAL SCRAPBOOK / TESS PETRONIO / SUZANNE KOLLER" },
    { type: "image", src: "img/sanstitle/001/17.jpg", caption: "SANS TITLE-001 VISUAL SCRAPBOOK / TESS PETRONIO / SUZANNE KOLLER" },
    { type: "image", src: "img/Replica man/ss24/13.jpg", caption: "REPLICA MAN SS24/PAVEL GOLIK / ANDREJ SKOK" },
    { type: "image", src: "img/Replica man/ss24/18.jpg", caption: "REPLICA MAN SS24/PAVEL GOLIK / ANDREJ SKOK" },
    { type: "image", src: "img/Replica man/ss24/12.jpg", caption: "REPLICA MAN SS24/PAVEL GOLIK / ANDREJ SKOK" },
    { type: "video", src: "video/givenchyss23/gv01.mp4", caption: "GIVENCHY HOMME" },
    { type: "image", src: "img/numeroswitzerland/Issue01–02/02.jpg", caption: "NUMERO SWITZERLAND" },
    { type: "image", src: "img/numeroswitzerland/Issue01–02/06.jpg", caption: "NUMERO SWITZERLAND" },
    { type: "image", src: "img/beauty/01/01.jpg", caption: "" },
    { type: "image", src: "img/beauty/01/03.jpg", caption: "" },
    { type: "image", src: "img/numeroswitzerland/Issue01-01/07.jpg", caption: "NUMERO SWITZERLAND" },
    { type: "image", src: "img/numeroswitzerland/Issue01-01/09.jpg", caption: "NUMERO SWITZERLAND" },
    { type: "image", src: "img/lampoon/Muscleissue/01.jpg", caption: "LAMPOON MAGAZINE" },
    { type: "image", src: "img/lampoon/Muscleissue/02.jpg", caption: "LAMPOON MAGAZINE" },
    { type: "image", src: "img/lampoon/Muscleissue/07.jpg", caption: "LAMPOON MAGAZINE" },
    { type: "image", src: "img/Untitled_/01/12.jpg", caption: "UNTITLED X LUCIE ROX" },
    { type: "image", src: "img/Untitled_/01/03.jpg", caption: "UNTITLED X LUCIE ROX" },
    { type: "image", src: "img/Untitled_/01/08.jpg", caption: "UNTITLED X LUCIE ROX" },
    { type: "image", src: "img/beauty/01/07.jpg", caption: "" },
    { type: "image", src: "img/crash/103/05.jpg", caption: "CRASH x MANUEL OBADIA-WILLS" },
    { type: "image", src: "img/crash/103/04.jpg", caption: "CRASH x MANUEL OBADIA-WILLS" },
    { type: "video", src: "video/nowness/massimilianobombas01.mp4", caption: "NOWNESS X MASSIMILIANO BOMBAS" },
    { type: "image", src: "img/10menmagazine/Issue58/08.jpg", caption: "10 MEN MAGAZINE" },
    { type: "image", src: "img/10menmagazine/Issue58/22.jpg", caption: "10 MEN MAGAZINE" },
    { type: "image", src: "img/beautypapers/01/03.jpg", caption: "BEAUTYPAPERS.COM" },
    { type: "image", src: "img/apartpublication/12/07.jpg", caption: "A PART PUBLICATION" },
    { type: "video", src: "video/swarovski_/287055659_472882711310330_5260526794169277173_n 2.mp4", caption: "SWAROVSKI" },
    { type: "image", src: "img/thegreatest/Printissue/01.jpg", caption: "THE GREATEST MAGAZINE" },
    { type: "image", src: "img/thegreatest/Printissue/02.jpg", caption: "THE GREATEST MAGAZINE" },
    { type: "image", src: "img/nicotine/Issue7/01.jpg", caption: "NICOTINE MAGAZINE ISSUE 7 / FERNANDO UCEDA" },
    { type: "image", src: "img/dapperdann/24/05.jpg", caption: "DAPPER DANN X JOE LAI" },
    { type: "image", src: "img/crash/103/01.jpg", caption: "CRASH x MANUEL OBADIA-WILLS" },
    { type: "video", src: "video/clarins/01.mp4", caption: "CLARINS" },
    { type: "video", src: "video/voguechina/vc01.mp4", caption: "VOGUE CHINA" },
  ];

  /* オーバーレイおよび各要素の取得 */
  var slideshowOverlay = document.getElementById("slideshow-overlay");
  var slideshowContainer = document.getElementById("slideshow-container");
  var slideContainer = document.getElementById("slide");
  var captionContainer = document.getElementById("caption");
  var encounterButton = document.getElementById("encounter-button");  // 表示用のみ
  var closeButton = document.getElementById("close-button");

  var currentIndex = 0;

  /* スライドを表示する関数 */
  function displaySlide(index) {
    slideContainer.innerHTML = "";
    var slide = slides[index];
    var element;
    if (slide.type === "image") {
      element = document.createElement("img");
      element.src = slide.src;
      element.alt = slide.caption;
    } else if (slide.type === "video") {
      element = document.createElement("video");
      element.src = slide.src;
      element.setAttribute("playsinline", "");
      element.setAttribute("autoplay", "");
      element.setAttribute("loop", "");
      element.setAttribute("muted", "");  // ここで消音に設定
      element.volume = 0;     
    }
    slideContainer.appendChild(element);
    captionContainer.textContent = slide.caption;
    updateEncounter();
  }

  /* エンカウンター表示更新（現在何枚中の何枚目か） */
  function updateEncounter() {
    encounterButton.textContent = (currentIndex + 1) + " / " + slides.length;
  }

  /* スライドショー画面のクリックイベントで前後スライドを切り替え */
  slideshowContainer.addEventListener("click", function(e) {
    // クローズボタンがクリックされた場合は何もしない
    if(e.target.id === "close-button") return;
    var rect = slideshowContainer.getBoundingClientRect();
    var clickX = e.clientX - rect.left;
    if (clickX < rect.width / 2) {
      // 左半分：前のスライド
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    } else {
      // 右半分：次のスライド
      currentIndex = (currentIndex + 1) % slides.length;
    }
    displaySlide(currentIndex);
  });

  /* マウスムーブでカーソルを更新（左半分なら←、右半分なら→） */
  slideshowContainer.addEventListener("mousemove", function(e) {
    var rect = slideshowContainer.getBoundingClientRect();
    var x = e.clientX - rect.left;
    if (x < rect.width / 2) {
      slideshowContainer.style.cursor = "w-resize"; // 左向き矢印
    } else {
      slideshowContainer.style.cursor = "e-resize"; // 右向き矢印
    }
  });

  /* 各ギャラリーアイテムのクリックで該当スライドを表示 */
  var galleryItems = document.querySelectorAll('.gallery-item');
  galleryItems.forEach(function(item) {
    item.addEventListener("click", function() {
      currentIndex = parseInt(item.getAttribute("data-index"));
      displaySlide(currentIndex);
      slideshowOverlay.style.display = "block";
    });
  });

  /* クローズボタンでオーバーレイを閉じる */
  closeButton.addEventListener("click", function() {
    slideshowOverlay.style.display = "none";
    var video = slideContainer.querySelector("video");
    if (video) {
      video.pause();
    }
  });
  

 
// ウィンドウのサイズ変更時に Masonry のレイアウトを更新
window.addEventListener("resize", function() {
  if (msnry) {
    msnry.reloadItems();
    msnry.layout();
  }
});

});
