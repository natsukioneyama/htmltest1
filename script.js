function setVhUnit() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}
setVhUnit();
window.addEventListener('resize', setVhUnit);


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
      "img/Untitled_/01/05.jpg",
      "img/Untitled_/01/06.jpg"
    ],
    caption: "Vogue Mexico<br>Photography: Tess Petronio<br>Styling: Name"
  },
  {
    images: [
      "img/sanstitle/001/15.jpg",
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

document.querySelectorAll(".project").forEach((project, index) => {
  project.dataset.index = index;
  project.addEventListener("click", () => {
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
  if (
    e.target.classList.contains("swiper-slide") ||
    e.target.closest(".swiper-slide")
  ) {
    lightbox.style.display = "none";
  }
});

let scrollPosition = 0;


function openLightbox(index) {
  scrollPosition = window.scrollY;
  document.body.style.top = `-${scrollPosition}px`;
  document.body.classList.add('lightbox-open');
  lightbox.style.display = 'flex';

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
}

function closeLightbox() {
  document.body.classList.remove('lightbox-open');
  document.body.style.top = '';
  window.scrollTo(0, scrollPosition);
  lightbox.style.display = 'none';
}

