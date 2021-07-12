import modaltpl from '../tpl/modal.hbs';

const refs = {
    jsGallery: document.querySelector(".cards__list"),
    jsLightbox: document.querySelector(".js-lightbox"),
    lightBox: document.querySelector(".lightbox"),
    modalCloseBtn: document.querySelector(".lightbox__button"),
    lighBoxOverlay: document.querySelector(".lightbox__overlay"),
};


let currentIndex = 0;

//Заполнение шаблонки_____________________________________

// refs.lightBox.innerHTML = modaltpl;



//Слушатели событий__________________________________________________

refs.jsGallery.addEventListener("click", (event) => {
    event.preventDefault();
    const targetImage = event.target;

    if (targetImage.classList.contains("cards__list")) return;

    refs.lightBox.classList.add("is-open");
    currentIndex = +targetImage.dataset.index;
    refs.modalCloseBtn.addEventListener("keydown", galleryScroll);
});

refs.lightBox.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("lightbox__button") || evt.target.classList.contains('lightbox__overlay')) {
        closeLightBox(evt);
    };
});

//Закрытие модалки(esc не доработан)________________________________________________________

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

