import countryList from './countries-code.js';
import dropdownTpl from '../tpl/dropdown.hbs';
import ApiService from '../services/api-services';
import eventsListTpl from '../tpl/cards.hbs';
import debounce from 'lodash.debounce';

const apiService = new ApiService();
const countryListRef = document.querySelector('.dropdown__list');
const dropdownTitleRef = document.querySelector('.dropdown__title');
const dropdownRef = document.querySelector('.dropdown');
const eventCardsRef = document.querySelector('.cards__list');
const eventsGalleryRef = document.querySelector('.cards__list');
const searchInputRef = document.querySelector('.form-field');

document.addEventListener('click', onClickDropdown);
searchInputRef.addEventListener('input', debounce(onInputSearch, 500));

function onClickDropdown(e) {
  if (
    e.target.getAttributeNames().includes('data-dropdown') ||
    e.target.getAttributeNames().includes('data-country-id')
  ) {
    // Проверяем кликнули ли мы по стране, если да, то оставляем в форме страну, добавляем аттрибут страны и фетчим
    if (e.target.classList.contains('dropdown__item')) {
      const attributeName = e.target.getAttribute('data-country-id');
      const countryName = e.target.textContent;

      dropdownTitleRef.setAttribute('data-country-id', attributeName);
      dropdownTitleRef.textContent = countryName;
    }

    // Рендерим список стран
    countryListRef.innerHTML = dropdownTpl(countryList);

    // Оперируем классом "visually-hidden" для скрытия списка стран по клику
    if (countryListRef.classList.contains('visually-hidden')) {
      countryListRef.classList.remove('visually-hidden');
    } else {
      countryListRef.classList.add('visually-hidden');
    }
  }

  if (e.target.getAttributeNames().includes('data-country-id')) {
    apiService.countryCode = dropdownTitleRef.getAttribute('data-country-id');

    apiService
      .fetchEvent()
      .then(data => renderGallery(data))
      .catch(console.log);
  }
}

function onInputSearch(e) {
  apiService.keyword = e.target.value;
  const windowOuterWidth = window.outerWidth;

  //для планшета меняем количество подгружаемых в запросе событий на 21.
  if (windowOuterWidth > 768 && windowOuterWidth < 1280) apiService.size = 21;

  apiService
    .fetchEvent()
    .then(data => renderGallery(data))
    .catch(console.log);
}

function renderGallery(data) {
  const events = data._embedded.events.map(evt => ({
    ...evt,
    imgUrl: evt.images.find(img => img.width === 640 && img.height === 427),
    locationRef: evt._embedded.venues[0].name,
  }));
  eventCardsRef.innerHTML = eventsListTpl(events);
}
