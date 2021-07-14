import modaltpl from '../tpl/modal.hbs';
import apiService from '../services/api-services.js';
import { renderGallery, setEventsOnPage } from './searching-input-dropdown';
import setPagination from './pagination';
import ticketSvg from '../images/modal/ticket.svg';
import refs from './refs';
import { showLoader, hideLoader } from './preloader.js';
import '../js/searching-input-dropdown.js';

//Слушатель событий(открытие модалки)_____________________
refs.eventCardsRef.addEventListener('click', event => {
  if (event.target.classList.contains('cards__list')) return;
  const targetId = event.target.closest('.card').dataset.index;
  showLoader();
  apiService
    .fetchEventById(targetId)
    .then(data => renderModal(data))
    .catch()
    .finally(hideLoader);
  refs.lightBox.classList.add('is-open');
  document.body.classList.add('no-scroll')
  window.addEventListener('keydown', escapeKeyListener);
});

//Заполнение шаблонки________________________________________________
function renderModal(data) {
  const event = {
    ...data,
    authorName: data.name.split(' ').slice(0, 2).join(' '),
    imgBigUrl: data.images.find(img => img.width === 1024 && img.height === 683),
    imgSmallUrl: data.images.find(img => img.width === 305 && img.height === 225),
    vipPrice: data.priceRanges[1] ? 1 : 0,
    urlPrice: data.url,
    urlVip: data.url,
    ticketSvg,
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
    refs.searchInputRef.value = evt.target.dataset.author;
    refs.clearSearchIconRef.style.opacity = 1;
    refs.searchIconRef.style.opacity = 0;

    apiService.keyword = evt.target.dataset.author;
    showLoader();
    apiService.page = 0;
    setEventsOnPage();

    apiService
      .fetchEvent()
      .then(data => {
        renderGallery(data);
        setPagination(data.page.totalElements);
      })
      .catch(console.log)
      .finally(hideLoader);
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
  document.body.classList.remove('no-scroll')
  window.removeEventListener('keydown', escapeKeyListener);
}
