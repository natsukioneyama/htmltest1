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
      {src: "img/Untitled_/01/04.jpg", caption: "Vogue Mexico<br>Photography: Tess Petronio<br>Styling: Name"},
      {src: "img/Untitled_/01/04.jpg", caption: ""}
     
    ],
  },
  {
    images: [
      {src: "sanstitle/001/15.jpg", caption: "Vogue Mexico<br>Photography: Tess Petronio<br>Styling: Name"}
    ],

  },
  {
    images: [
      {src: "sanstitle/001/15.jpg", caption: "Vogue Mexico<br>Photography: Tess Petronio<br>Styling: Name"}
    ],

  },
  {
    images: [
       {src: "Replica man/ss24/13.jpg", caption: "Vogue Mexico<br>Photography: Tess Petronio<br>Styling: Name"}
    ],
   
  }
];

document.querySelectorAll(".project").forEach((project, index) => {
  project.dataset.index = index;
  project.addEventListener("click", () => {
    const gallery = galleries[index];
    swiperWrapper.innerHTML = "";

   gallery.images.forEach(image => {
  const slide = document.createElement("div");
  slide.className = "swiper-slide";
  slide.innerHTML = `
    <div class="slide-content">
      <img src="${image.src}" alt="Slide" />
      ${image.caption ? `<div class="caption">${image.caption}</div>` : ""}
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

 gallery.images.forEach(image => {
  const slide = document.createElement("div");
  slide.className = "swiper-slide";
  slide.innerHTML = `
    <div class="slide-content">
      <img src="${image.src}" alt="Slide" />
      ${image.caption ? `<div class="caption">${image.caption}</div>` : ""}
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

