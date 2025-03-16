// ✅ サイドメニューの開閉
function toggleMenu() {
    var menu = document.getElementById('sideMenu');
    var toggleButton = document.querySelector('.menu-toggle');

    if (menu.classList.contains('open')) {
        menu.classList.remove('open'); 
        toggleButton.textContent = "≡"; // △を▽に戻す
    } else {
        menu.classList.add('open');
        toggleButton.textContent = "✖"; // ▽を△に変更
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
    var galleryItems = document.querySelectorAll(".gallery-item");
   
         // ✅ キャプション要素を取得
    const captionTitle = document.querySelector(".caption-title"); // 🔥 data-caption を入れる
    const makeupSpan = document.querySelector(".makeup");
    const photographySpan = document.querySelector(".photography");
    const directorSpan = document.querySelector(".director"); // ✅ 追加
    const artDirectorSpan = document.querySelector(".art-director"); // ✅ 追加
    const stylingSpan = document.querySelector(".styling");


    var slideshow = document.getElementById("slideshow");
    var slideContent = document.querySelector(".slide-content");
    var slideCounter = document.querySelector(".slide-counter");
    var slideCaption = document.querySelector(".slide-caption");
    var closeBtn = document.getElementById("close-btn");
    var leftClick = document.getElementById("left-click");
    var rightClick = document.getElementById("right-click");
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
    item.addEventListener("click", handleGalleryItemTap);
});

function handleGalleryItemTap(event) {
    var item = event.currentTarget;
    var caption = item.querySelector(".caption");

    if (!caption) {
        console.error("❌ Error: .caption が見つかりません。");
        return;
    }

    // ✅ スマホかどうかを判定
    if (window.matchMedia("(hover: none)").matches) {
        console.log("📱 スマホでタップ検出");

        // ✅ 1回目のタップ → キャプションを表示
        if (!caption.classList.contains("visible")) {
            // 既に開いているキャプションを閉じる
            document.querySelectorAll(".caption.visible").forEach((el) => {
                el.classList.remove("visible");
            });

            caption.classList.add("visible");
            console.log("✅ キャプション表示: ", caption.textContent);

            // **🟢 `event.stopPropagation()` を削除** → 2回目のタップを有効にする
            return;
        }

        // ✅ 2回目のタップ → スライドショーを開く
        caption.classList.remove("visible");

        var index = item.dataset.index ? parseInt(item.dataset.index) : -1;
        console.log("🎯 スライド表示するインデックス: ", index);

        if (isNaN(index) || index < 0) {
            console.error("❌ Error: data-index が不正です。", item);
            return;
        }

        console.log("✅ `showSlide(" + index + ")` を実行");
        showSlide(index);
    } else {
        // ✅ PCではクリックで即スライドショーを開く
        var index = item.dataset.index ? parseInt(item.dataset.index) : -1;
        console.log("🎯 PC用スライド表示インデックス: ", index);

        if (isNaN(index) || index < 0) {
            console.error("❌ Error: data-index が不正です。", item);
            return;
        }

        console.log("✅ `showSlide(" + index + ")` を実行");
        showSlide(index);
    }
}





// 🔻 **ロゴクリックの処理**
var logo = document.getElementById("logo");
if (logo) {
    logo.addEventListener("click", function (event) {
        event.preventDefault(); // リンクのデフォルト動作を無効化

        console.log("✅ 現在のURL: ", window.location.pathname);

        // **現在のページが `/index.html` でない場合はリダイレクト**
        if (window.location.pathname !== "/" && window.location.pathname !== "/index.html") {
            console.log("🔄 リダイレクト実行: ", window.location.origin + "/");
            window.location.href = window.location.origin + "/";
            return;
        }

        console.log("✅ スライドショーを閉じる処理を実行");

        // **スライドショーを閉じる**
        var slideshow = document.getElementById("slideshow");
        if (slideshow) {
            slideshow.style.display = "none";
            slideshow.classList.remove("active");
        }

        // **ギャラリーを表示**
        var galleryContainer = document.getElementById("gallery-container");
        if (galleryContainer) {
            galleryContainer.style.visibility = "visible";
            galleryContainer.style.opacity = "1";
        }

        // **ページの一番上へスクロール**
        window.scrollTo({
            top: 0,
            behavior: "smooth" // なめらかにスクロール
        });
    });
}

    // 🔺 **ロゴクリック処理の終了** 🔺





    function showSlide(index) {
        var selectedItem = document.querySelector(`.gallery-item[data-index="${index}"]`);
        if (!selectedItem) return;

        var media = selectedItem.querySelector("img, video").cloneNode(true);
        slideContent.innerHTML = "";
        slideContent.appendChild(media);

        console.log("✅ data-caption:", selectedItem.getAttribute("data-caption"));
        console.log("✅ data-makeup:", selectedItem.getAttribute("data-makeup"));
        console.log("✅ data-photography:", selectedItem.getAttribute("data-photography"));
        console.log("✅ data-styling:", selectedItem.getAttribute("data-styling"));
        console.log("✅ data-director:", selectedItem.getAttribute("data-director")); // 追加
        console.log("✅ data-art-director:", selectedItem.getAttribute("data-art-director")); // 追加

        
        // ✅ `data-caption` の値を取得
        const captionText = selectedItem.getAttribute("data-caption") || "";
        // ✅ `.caption-title` を表示する
        captionTitle.style.display = "block";

        // ✅ カウンターを更新 & 表示
        slideCounter.textContent = `[ ${index + 1} / ${galleryItems.length} ]`;
        slideCounter.style.display = "block";

        // ✅ キャプションを更新
        captionTitle.textContent = selectedItem.getAttribute("data-caption") || "";
        makeupSpan.textContent = selectedItem.getAttribute("data-makeup") || "";
        photographySpan.textContent = selectedItem.getAttribute("data-photography") || "";
        directorSpan.textContent = selectedItem.getAttribute("data-director") || "";
        artDirectorSpan.textContent = selectedItem.getAttribute("data-art-director") || "";
        stylingSpan.textContent = selectedItem.getAttribute("data-styling") || "";

        
        // ✅ 空のキャプションを非表示にする
        captionTitle.parentElement.style.display = captionTitle.textContent ? "block" : "none";
        makeupSpan.parentElement.style.display = makeupSpan.textContent ? "block" : "none";
        photographySpan.parentElement.style.display = photographySpan.textContent ? "block" : "none";
        directorSpan.parentElement.style.display = directorSpan.textContent ? "block" : "none";
        artDirectorSpan.parentElement.style.display = artDirectorSpan.textContent ? "block" : "none";
        stylingSpan.parentElement.style.display = stylingSpan.textContent ? "block" : "none";
        makeupSpan.parentElement.style.display = makeupSpan.textContent ? "block" : "none";

        var photographyText = selectedItem.getAttribute("data-photography");
        var makeupText = selectedItem.getAttribute("data-makeup");
        var directorText = selectedItem.getAttribute("data-director"); // ✅ 追加
        var artDirectorText = selectedItem.getAttribute("data-art-director"); // ✅
        var stylingText = selectedItem.getAttribute("data-styling");
     
  
       
        // ✅ 空のキャプションを非表示にする
        if (photographyText) {
            photographySpan.textContent = photographyText;
            photographySpan.parentElement.style.display = "block";
        } else {
            photographySpan.parentElement.style.display = "none";
        }
    
        if (stylingText) {
            stylingSpan.textContent = stylingText;
            stylingSpan.parentElement.style.display = "block";
        } else {
            stylingSpan.parentElement.style.display = "none";
        }
    
        if (makeupText) {
            makeupSpan.textContent = makeupText;
            makeupSpan.parentElement.style.display = "block";
        } else {
            makeupSpan.parentElement.style.display = "none";
        }



        slideCaption.style.display = "block"; // ✅ キャプションを表示
        
        // ✅ CLOSE ボタンを表示、非表示
        document.querySelector(".close-btn").style.display = "block";
        //document.querySelector(".close-btn").style.display = "none";
 

        slideshow.style.display = "block";
        slideshow.classList.add("active");

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
    }

    document.body.style.overflow = "auto";

    closeBtn.addEventListener("click", function(event) {
        event.stopPropagation();
        closeSlideshow();
    });

    closeBtn.addEventListener("touchend", function(event) {
        event.preventDefault(); // タップ動作を防ぐ
        console.log("📱 Close button tapped!");
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
