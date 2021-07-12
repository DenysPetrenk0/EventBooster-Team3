import countryList from './countries-code.js';
import dropdownTpl from '../tpl/dropdown.hbs';
import eventsListTpl from '../tpl/cards.hbs';
import ApiService from '../services/api-services';
import debounce from 'lodash.debounce';

const refs = {
  countryListRef: document.querySelector('.dropdown__list'),
  dropdownTitleRef: document.querySelector('.dropdown__title'),
  dropdownRef: document.querySelector('.dropdown'),
  eventCardsRef: document.querySelector('.cards__list'),
  searchInputRef: document.querySelector('.form-field'),
};

const apiService = new ApiService();
document.addEventListener('click', onClickDropdown);
refs.searchInputRef.addEventListener('input', debounce(onInputSearch, 500));

//функция обработки выбора списка стран поиск
function onClickDropdown(e) {
  if (
    e.target.getAttributeNames().includes('data-dropdown') ||
    e.target.getAttributeNames().includes('data-country-id')
  ) {
    // Проверяем кликнули ли мы по стране, если да, то оставляем в форме страну, добавляем аттрибут страны и фетчим
    if (e.target.classList.contains('dropdown__item')) {
      const attributeName = e.target.getAttribute('data-country-id');
      const countryName = e.target.textContent;

      refs.dropdownTitleRef.setAttribute('data-country-id', attributeName);
      refs.dropdownTitleRef.textContent = countryName;
    }

    // Рендерим список стран
    refs.countryListRef.innerHTML = dropdownTpl(countryList);

    // Оперируем классом "visually-hidden" для скрытия списка стран по клику
    if (refs.countryListRef.classList.contains('visually-hidden')) {
      refs.countryListRef.classList.remove('visually-hidden');
    } else {
      refs.countryListRef.classList.add('visually-hidden');
    }
  }

  if (e.target.getAttributeNames().includes('data-country-id')) {
    apiService.countryCode = refs.dropdownTitleRef.getAttribute('data-country-id');

    apiService
      .fetchEvent()
      .then(data => renderGallery(data))
      .catch(console.log);
  }
}

//функция обработки поля input поиск
function onInputSearch(e) {
  apiService.keyword = e.target.value;
  const windowOuterWidth = window.outerWidth;

  //для планшета (проверка по ширине браузера) меняем количество подгружаемых в запросе событий на 21.
  if (windowOuterWidth > 768 && windowOuterWidth < 1280) apiService.size = 21;

  apiService
    .fetchEvent()
    .then(data => {
      renderGallery(data);
      console.log(data);
    })
    .catch(console.log);
}

//функция генерации галереи событий
function renderGallery(data) {
  const events = data._embedded.events.map(evt => ({
    ...evt,
    imgUrl: evt.images.find(img => img.width === 640 && img.height === 427),
    locationRef: evt._embedded.venues[0].name,
  }));
  console.log(events);
  refs.eventCardsRef.innerHTML = eventsListTpl(events);
}