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

// ✅ .addEventListener
document.addEventListener("DOMContentLoaded", function () {
    var gallery = document.querySelector(".gallery");
    var msnry = new Masonry(gallery, {
        itemSelector: ".gallery-item",
        columnWidth: ".grid-sizer",
        percentPosition: true
    });

    imagesLoaded(gallery, function () {
        msnry.layout();
    });

    window.addEventListener("resize", function() {
        msnry.layout();
    });
    

    var leftClick = document.getElementById("left-click");
    var rightClick = document.getElementById("right-click");

    var galleryItems = document.querySelectorAll(".gallery-item");
    var slideshow = document.getElementById("slideshow");
    var slideContent = document.querySelector(".slide-content");
    var caption = document.getElementById("caption");
    var counter = document.getElementById("counter");
    var closeBtn = document.getElementById("close-btn");
    var slideInfo = document.querySelector(".slide-info");
    var lastTappedItem = null; // 最後にタップされたアイテムを記録
    var currentIndex = 0;

    if (!slideshow || galleryItems.length === 0) {
        console.error("❌ Error: slideshow または ギャラリーアイテムが見つかりません。");
        return;
    }

    if (!leftClick || !rightClick) {
        console.error("❌ Error: left-click または right-click が見つかりません。");
        return;
    }

    leftClick.addEventListener("click", function(event) {
        event.stopPropagation();
        console.log("⬅ 左クリック発火");
        prevSlide();
    });

    rightClick.addEventListener("click", function(event) {
        event.stopPropagation();
        console.log("➡ 右クリック発火");
        nextSlide();
    });

    // ✅ スマホでは1回目のタップでキャプション表示、2回目でスライドショー表示
    galleryItems.forEach((item) => {
        item.addEventListener("click", function (event) {
            event.preventDefault();
            var caption = item.querySelector(".caption");

            if (window.matchMedia("(hover: none)").matches) {
                if (!caption.classList.contains("visible")) {
                    // 既に開いているキャプションを閉じる
                    document.querySelectorAll(".caption.visible").forEach((el) => {
                        el.classList.remove("visible");
                    });

                    caption.classList.add("visible");
                    lastTappedItem = item;
                } else {
                    // 2回目のタップでスライドショーを開く
                    caption.classList.remove("visible");
                    currentIndex = parseInt(item.dataset.index);
                    showSlide(currentIndex);
                }
            } else {
                // ✅ PCではクリックで即スライドショーを開く
                currentIndex = parseInt(item.dataset.index);
                showSlide(currentIndex);
            }
        });
    });

    function showSlide(index) {
        var selectedItem = document.querySelector(`.gallery-item[data-index="${index}"]`);
        if (!selectedItem) return;

        var media = selectedItem.querySelector("img, video").cloneNode(true);
        slideContent.innerHTML = "";
        slideContent.appendChild(media);

        caption.textContent = selectedItem.getAttribute("data-caption") || "";
        counter.textContent = `${index + 1} / ${galleryItems.length}`;

        slideshow.style.display = "block";
        slideshow.classList.add("active");
        slideInfo.style.display = "flex";
        slideInfo.style.opacity = "1";

        document.getElementById("gallery-container").style.visibility = "hidden";
        document.getElementById("gallery-container").style.opacity = "0";

        closeBtn.style.display = "block";
        currentIndex = index;

        if (media.tagName === "VIDEO") {
            media.muted = true;
            media.play();
        }
    }

    function closeSlideshow() {
        slideshow.style.display = "none";
        slideshow.classList.remove("active");
        document.getElementById("gallery-container").style.visibility = "visible";
        document.getElementById("gallery-container").style.opacity = "1";
        slideInfo.style.display = "none";
        slideInfo.style.opacity = "0";
    }

    closeBtn.addEventListener("click", function(event) {
        event.stopPropagation();
        closeSlideshow();
    });

    function nextSlide() {
        currentIndex = (currentIndex + 1) % galleryItems.length;
        console.log("次のスライド: ", currentIndex); // ✅ ここで確認
        showSlide(currentIndex);
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
        showSlide(currentIndex);
    }

    slideshow.addEventListener("click", function(event) {
        if (event.target === slideshow) {
            closeSlideshow();
        }
    });
});
