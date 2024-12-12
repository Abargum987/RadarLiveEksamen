const burgerMenu = document.querySelector(".burger-menu")
const navMenu = document.querySelector(".nav-menu")

burgerMenu.addEventListener("click", () => {
    burgerMenu.classList.toggle("active");
    navMenu.classList.toggle("active");
});

document.querySelectorAll(".nav-item").forEach(n => n.addEventListener("click", () => {
    burgerMenu.classList.remove("active");
    navMenu.classList.remove("active");
    }));