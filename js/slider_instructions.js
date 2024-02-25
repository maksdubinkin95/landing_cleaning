const carousel = document.querySelector(".instructions__list");
const arrowButtons = document.querySelectorAll(".instructions__slider i");
const firstCardWidth = document.querySelector(".instruction").offsetWidth;
const carouselChildrens = [...carousel.children];

let isDragging = false,
    startX,
    startScrollLeft;

let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

carouselChildrens
    .slice(-cardPerView)
    .reverse()
    .forEach((card) => {
        carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
    });

carouselChildrens.slice(0, cardPerView).forEach((card) => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

arrowButtons.forEach((button) => {
    button.addEventListener("click", () => {
        carousel.scrollLeft += button.id == "left" ? -firstCardWidth : firstCardWidth;
    });
});

const draggingStart = (event) => {
    isDragging = true;
    carousel.classList.add("dragging");
    startX = event.pageX;
    startScrollLeft = carousel.scrollLeft;
};

const dragging = (event) => {
    if (!isDragging) return;
    
    carousel.scrollLeft = startScrollLeft - (event.pageX - startX);
};

const draggingStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
};

const infiniteScroll = () => {
    if (carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - 2 * carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    } else if (Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    }
};

carousel.addEventListener("mousedown", draggingStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", draggingStop);
carousel.addEventListener("scroll", infiniteScroll);
