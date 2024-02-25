const carouselServices = document.querySelector(".services__list");
const arrowButtonsServices = document.querySelectorAll(".services__slider i");
const firstCardWidthServices = document.querySelector(".service").offsetWidth;
const carouselChildrensServices = [...carouselServices.children];

let isDraggingServices = false,
    startXServices,
    startScrollLeftServices;

let cardPerViewServices = Math.round(carouselServices.offsetWidth / firstCardWidthServices);

carouselChildrensServices
    .slice(-cardPerViewServices)
    .reverse()
    .forEach((card) => {
        carouselServices.insertAdjacentHTML("afterbegin", card.outerHTML);
    });
carouselChildrensServices.slice(0, cardPerViewServices).forEach((card) => {
    carouselServices.insertAdjacentHTML("beforeend", card.outerHTML);
});

arrowButtonsServices.forEach((button) => {
    button.addEventListener("click", () => {
        carouselServices.scrollLeft += button.id == "left" ? -firstCardWidthServices : firstCardWidthServices;
    });
});

const draggingStartServices = (event) => {
    isDraggingServices = true;
    carouselServices.classList.add("dragging");
    startXServices = event.pageX;
    startScrollLeftServices = carouselServices.scrollLeft;
};

const draggingServices = (event) => {
    if (!isDraggingServices) return;
    carouselServices.scrollLeft = startScrollLeftServices - (event.pageX - startXServices);
};

const draggingStopServices = () => {
    isDraggingServices = false;
    carouselServices.classList.remove("dragging");
};

const infiniteScrollServices = () => {
    if (carouselServices.scrollLeft === 0) {
        carouselServices.classList.add("no-transition");
        carouselServices.scrollLeft = carouselServices.scrollWidth - 2 * carouselServices.offsetWidth;
        carouselServices.classList.remove("no-transition");
    } else if (Math.ceil(carouselServices.scrollLeft) === carouselServices.scrollWidth - carouselServices.offsetWidth) {
        carouselServices.classList.add("no-transition");
        carouselServices.scrollLeft = carouselServices.offsetWidth;
        carouselServices.classList.remove("no-transition");
    }
};

carouselServices.addEventListener("mousedown", draggingStartServices);
carouselServices.addEventListener("mousemove", draggingServices);
document.addEventListener("mouseup", draggingStopServices);
carouselServices.addEventListener("scroll", infiniteScrollServices);