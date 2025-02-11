document.addEventListener("DOMContentLoaded", function () {
    const images = document.querySelectorAll(".gallery-item img");
    const slideshow = document.getElementById("slideshow");
    const slideshowImg = document.getElementById("slideshow-img");
    const closeBtn = document.querySelector(".close");
    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");

    let currentIndex = 0;

    function showSlideshow(index) {
        currentIndex = index;
        slideshowImg.src = images[currentIndex].src;
        slideshow.style.display = "flex";
    }

    images.forEach((img, index) => {
        img.addEventListener("click", () => showSlideshow(index));
    });

    closeBtn.addEventListener("click", () => {
        slideshow.style.display = "none";
    });

    prevBtn.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        slideshowImg.src = images[currentIndex].src;
    });

    nextBtn.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % images.length;
        slideshowImg.src = images[currentIndex].src;
    });

    

    // スライドショー背景クリックで閉じる
    slideshow.addEventListener("click", (e) => {
        if (e.target === slideshow) {
            slideshow.style.display = "none";
        }
    });
});


