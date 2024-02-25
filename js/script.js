// Прокрутка к блоку

const menuLinks = document.querySelectorAll("a[data-goto], .button[data-goto]");
if (menuLinks.length > 0) {
    menuLinks.forEach((menuLink) => {
        menuLink.addEventListener("click", onMenuLinkClick);

        function onMenuLinkClick(event) {
            const menuLink = event.target;
            if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
                const gotoBlock = document.querySelector(menuLink.dataset.goto);
                const goToBlockValue = gotoBlock.getBoundingClientRect().top + window.scrollY - document.querySelector(".header").offsetHeight;

                window.scrollTo({
                    top: goToBlockValue,
                    behavior: "smooth",
                });
                event.preventDefault();
            }
        }
    });
}

// Скрытие меню

const header = document.querySelector(".header");
const burgerButton = document.querySelector(".burger-button");
const crossButton = document.querySelector(".cross-button");
const mobileOverlayList = document.querySelectorAll(".mobile-overlay__item, .mobile-overlay__button");
const dialog = document.querySelector("dialog");

mobileOverlayList.forEach((item) => {
    item.addEventListener("click", () => {
        dialog.close();
        header.classList.toggle("disabled");
    });
});
burgerButton.addEventListener("click", () => {
    header.classList.toggle("disabled");
});
crossButton.addEventListener("click", () => {
    header.classList.toggle("disabled");
});
