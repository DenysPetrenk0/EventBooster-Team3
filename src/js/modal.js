import modaltpl from '../tpl/modal.hbs';
import apiService from '../services/api-services.js';
import { renderGallery, setEventsOnPage } from './searching-input-dropdown';
import setPagination from './pagination';

import '../js/searching-input-dropdown.js';

const refs = {
  jsGallery: document.querySelector('.cards__list'),
  lightBox: document.querySelector('.lightbox'),

  jsLightbox: document.querySelector('.js-lightbox'),
  modalCloseBtn: document.querySelector('.lightbox__button'),
  lighBoxOverlay: document.querySelector('.lightbox__overlay'),
};

//Слушатель событий(открытие модалки)_____________________
refs.jsGallery.addEventListener('click', event => {
  if (event.target.classList.contains('cards__list')) return;
  const targetId = event.target.closest('.card').dataset.index;
  apiService
    .fetchEventById(targetId)
    .then(data => renderModal(data))
    .catch();
  refs.lightBox.classList.add('is-open');
  window.addEventListener('keydown', escapeKeyListener);
});

//Заполнение шаблонки________________________________________________
function renderModal(data) {
  const event = {
    ...data,
    authorName: data.name.split(' ').slice(0, 2).join(' '),
    imgBigUrl: data.images.find(img => img.width === 1024 && img.height === 683),
    imgSmallUrl: data.images.find(img => img.width === 305 && img.height === 225),
  };
  refs.lightBox.innerHTML = modaltpl(event);
}

//Закрытие модалки на крестик и за ее пределами_______________________
refs.lightBox.addEventListener('click', evt => {
  if (
    evt.target.classList.contains('lightbox__button') ||
    evt.target.classList.contains('lightbox__overlay')
  ) {
    closeLightBox();
  }
  //Закрытие модалки по MORE FROM THIS AUTHOR
  if (evt.target.classList.contains('modal-btn-more')) {
    apiService.keyword = evt.target.dataset.author;
    setEventsOnPage();
    apiService
      .fetchEvent()
      .then(data => {
        renderGallery(data);
        setPagination(data.page.totalElements);
      })
      .catch(console.log);
    closeLightBox();
  }
});

//Закрытие модалки по Escape, функция для callback_________________________________
function escapeKeyListener(evt) {
  if (evt.code === 'Escape') {
    closeLightBox();
  }
}

function closeLightBox() {
  refs.lightBox.classList.remove('is-open');
  window.removeEventListener('keydown', escapeKeyListener);
}
