const swiper = new Swiper(".swiper", {
  loop: false,
  keyboard: {
    enabled: true,
  },
    navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

const lightbox = document.getElementById("lightbox");
const swiperWrapper = document.getElementById("swiper-wrapper");

const galleries = [
  {
    images: [
      "img/Untitled_/01/04.jpg",
      "img/Untitled_/01/04.jpg",
      "img/Untitled_/01/04.jpg"
    ],
    caption: "Vogue Mexico<br>Photography: Name<br>Styling: Name"
  },
  {
    images: [
      "img/002/01.jpg",
      "img/002/02.jpg"
    ],
    caption: "10 Men<br>Photography: Name<br>Styling: Name"
  },
  {
    images: [
      "img/003/01.jpg",
      "img/003/02.jpg",
      "img/003/03.jpg",
      "img/003/04.jpg"
    ],
    caption: "Beauty Papers<br>Photography: Name<br>Styling: Name"
  }
];

document.querySelectorAll(".project").forEach(project => {
  project.addEventListener("click", () => {
    const index = parseInt(project.dataset.index);
    const gallery = galleries[index];

    swiperWrapper.innerHTML = "";
    gallery.images.forEach(src => {
      const slide = document.createElement("div");
      slide.className = "swiper-slide";
      slide.innerHTML = `
  <div class="slide-content">
    <img src="${src}" alt="Slide" />
    <div class="caption">${gallery.caption}</div>
  </div>
`;

      swiperWrapper.appendChild(slide);
    });

    swiper.update();
    swiper.slideTo(0);
    lightbox.style.display = "flex";
  });
});

lightbox.addEventListener("click", (e) => {
  if (e.target.classList.contains("swiper-slide") || e.target.closest(".swiper-slide")) {
    lightbox.style.display = "none";
  }
});