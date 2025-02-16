// ✅ サイドメニューの開閉
function toggleMenu() {
    var menu = document.getElementById('sideMenu');
    var toggleButton = document.querySelector('.menu-toggle');

    if (menu.classList.contains('open')) {
        menu.classList.remove('open'); 
        toggleButton.textContent = "∨"; // △を▽に戻す
    } else {
        menu.classList.add('open');
        toggleButton.textContent = "∧"; // ▽を△に変更
    }
}

// ✅ Masonry 初期化
document.addEventListener("DOMContentLoaded", function () {
    var gallery = document.querySelector(".gallery");
    var msnry = new Masonry(gallery, {
        itemSelector: ".gallery-item",
        columnWidth: ".grid-sizer",
        percentPosition: true
    });

    // ✅ 画像や動画の読み込み後に Masonry を再レイアウト
    imagesLoaded(gallery, function () {
        msnry.layout();
    });

    var galleryItems = document.querySelectorAll(".gallery-item");
    var slideshow = document.getElementById("slideshow");
    var slideContainer = document.querySelector(".slide-container");
    var slideContent = document.querySelector(".slide-content");
    var caption = document.getElementById("caption");
    var counter = document.getElementById("counter");
    var closeBtn = document.getElementById("close-btn");
    var slideInfo = document.querySelector(".slide-info"); // ✅ キャプションエリア

    var currentIndex = 0;

    // ✅ スライドショーを表示
    function showSlide(index) {
        var selectedItem = document.querySelector(`.gallery-item[data-index="${index}"]`);
        if (!selectedItem) return;

        var media = selectedItem.querySelector("img, video").cloneNode(true);
        slideContent.innerHTML = ""; // スライドをクリア
        slideContent.appendChild(media);

        caption.textContent = selectedItem.getAttribute("data-caption") || "";
        counter.textContent = `${index + 1} / ${galleryItems.length}`;

        // ✅ スライドショーの表示
        slideshow.style.display = "block";
        slideshow.classList.add("active"); 

        // ✅ メーソンリーギャラリーを非表示
        document.getElementById("gallery-container").style.visibility = "hidden";
        document.getElementById("gallery-container").style.opacity = "0";

        // ✅ クローズボタンを表示
        closeBtn.style.display = "block";

        // ✅ キャプションエリアを確実に表示
        slideInfo.style.display = "flex";  // 🔥 ここを追加
        slideInfo.style.opacity = "1";  // 🔥 ここを追加
    

        currentIndex = index;

        if (media.tagName === "VIDEO") {
            media.muted = true;
            media.play();
        }
    }

    // ✅ スライドショーを閉じる
    function closeSlideshow() {
        slideshow.style.display = "none";
        slideshow.classList.remove("active");

        // ✅ メーソンリーギャラリーを復活
        document.getElementById("gallery-container").style.visibility = "visible";
        document.getElementById("gallery-container").style.opacity = "1";

        // ✅ クローズボタンを非表示
        closeBtn.style.display = "none";

        // ✅ キャプションエリアを非表示にする
        slideInfo.style.display = "none";
        slideInfo.style.opacity = "0";  // 🔥 ここを追加
    }

    // ✅ ギャラリークリックでスライドショーを表示
    galleryItems.forEach((item) => {
        item.addEventListener("click", function () {
            var index = parseInt(item.dataset.index); 
            showSlide(index);
        });
    });

    // ✅ クローズボタンでスライドショーを閉じる
    if (closeBtn) {
        closeBtn.addEventListener("click", function(event) {
            event.stopPropagation();
            closeSlideshow();
        });
    } else {
        console.error("Error: close-btn が見つかりません。");
    }

    // ✅ スライドショーの外側をクリックで閉じる
    if (slideshow) {
        slideshow.addEventListener("click", function (event) {
            if (event.target === slideshow) {
                closeSlideshow(); 
            } else {
                var rect = slideshow.getBoundingClientRect();
                var clickX = event.clientX - rect.left;
                if (clickX < rect.width / 2) {
                    prevSlide();
                } else {
                    nextSlide();
                }
            }
        });
    } else {
        console.error("Error: slideshow が見つかりません。");
    }

    // ✅ スライドの前後切り替え
    function nextSlide() {
        currentIndex = (currentIndex + 1) % galleryItems.length;
        showSlide(currentIndex);
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
        showSlide(currentIndex);
    }

    // ✅ マウスホバー時のカーソルテキスト
    slideContainer.addEventListener("mousemove", function (event) {
        var rect = slideContainer.getBoundingClientRect();
        var mouseX = event.clientX - rect.left;

        if (mouseX < rect.width / 2) {
            slideContainer.classList.add("left-half");
            slideContainer.classList.remove("right-half");
        } else {
            slideContainer.classList.add("right-half");
            slideContainer.classList.remove("left-half");
        }

        var indicator = document.getElementById("cursor-text"); 
        if (!indicator) {
            indicator = document.createElement("div");
            indicator.id = "cursor-text";
            indicator.style.position = "absolute";
            indicator.style.pointerEvents = "none";
            indicator.style.fontSize = "18px";
            indicator.style.color = "white";
            indicator.style.fontWeight = "bold";
            slideContainer.appendChild(indicator);
        }

        // ✅ テキストを適切な位置に配置
        indicator.style.left = (mouseX + 10) + "px";
        indicator.style.top = (event.clientY - rect.top - 10) + "px";

        // ✅ 左右でテキストを変更
        indicator.innerText = (mouseX < rect.width / 2) ? "＜" : "＞";
    });

    // ✅ Masonry のレイアウト再計算
    imagesLoaded(document.querySelector(".gallery"), function () {
        msnry.layout();
    });
});
