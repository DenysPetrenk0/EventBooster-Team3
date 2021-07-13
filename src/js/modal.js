import modaltpl from '../tpl/modal.hbs';
import apiService from '../services/api-services.js';
import '../js/searching-input-dropdown.js';

const refs = {
    jsGallery: document.querySelector(".cards__list"),
    jsLightbox: document.querySelector(".js-lightbox"),
    lightBox: document.querySelector(".lightbox"),
    modalCloseBtn: document.querySelector(".lightbox__button"),
    lighBoxOverlay: document.querySelector(".lightbox__overlay"),
};



let currentIndex = 0;



//Слушатель событий(открытие модалки)__________________________________________________

refs.jsGallery.addEventListener("click", (event) => {
    // event.preventDefault();
    if (event.target.classList.contains("cards__list")) return;
    const targetId = event.target.closest('.card').dataset.index;
    apiService.fetchEventById(targetId).then(data => { renderModal(data); console.log(data) }).catch();

    console.log(targetId);

    refs.lightBox.classList.add("is-open");

});

//Заполнение шаблонки_____________________________________
function renderModal(data) {
    console.log(data);
    console.log();
    refs.lightBox.innerHTML = modaltpl(data);
}
//Закрытие модалки(esc не доработан)________________________________________________________

refs.lightBox.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("lightbox__button") || evt.target.classList.contains('lightbox__overlay')) {
        closeLightBox(evt);
    };
});


window.addEventListener("keydown", (event) => {
    if (event.code === "Escape") {
        closeLightBox(event);
    }
});



function closeLightBox(event) {
    if (event.target.tagName === "BUTTON" || event.target.tagName === "DIV") {
        refs.lightBox.classList.remove("is-open");
    }
}


//Лево-право,недоработано //

function galleryScroll(event) {
    if (event.code === "ArrowRight") {
        if (currentIndex === galleryItems.length) {
            currentIndex = 0;
        }
        currentIndex += 1;
    } else if (event.code === "ArrowLeft") {
        if (currentIndex === 0) {
            currentIndex = galleryItems.length;
        }
        currentIndex -= 1;
    }
}

