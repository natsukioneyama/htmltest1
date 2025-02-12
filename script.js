

  document.addEventListener("DOMContentLoaded", function() {
    var grid = document.querySelector('.gallery');
    imagesLoaded(grid, function() {
      new Masonry(grid, {
        itemSelector: '.gallery-item',
        columnWidth: '.gallery-item',  // 各アイテムの幅を基準にする
        percentPosition: true,
        gutter: 10
      });
    });

  /* スライドのデータ配列（ギャラリー順と対応） */
  var slides = [
    { type: "video", src: "video/numeroswitzerlandhomme/01.mp4", caption: "NUMERO SWITZERLAND" },
    { type: "image", src: "img/Untitled_/01/01.jpg", caption: "UNTITLED X LUCIE ROX" },
    { type: "image", src: "img/crash/103/08.jpg", caption: "CRASH x MANUEL OBADIA-WILLS" },
    { type: "image", src: "img/sanstitle/001/03.jpg", caption: "SANS TITLE-001 VISUAL SCRAPBOOK/TESS PETRONIO/SUZANNE KOLLER" },
    { type: "image", src: "img/sanstitle/001/17.jpg", caption: "SANS TITLE-001 VISUAL SCRAPBOOK/TESS PETRONIO/SUZANNE KOLLER" },
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
});