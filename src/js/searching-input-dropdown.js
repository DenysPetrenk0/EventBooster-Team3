import countryList from './countries-code.js';
import dropdownTpl from '../tpl/dropdown.hbs';
import eventsListTpl from '../tpl/cards.hbs';
import apiService from '../services/api-services';
import debounce from 'lodash.debounce';
import setPagination from './pagination';
import { showLoader, hideLoader } from './preloader.js';
import { alert, notice, info, success, error, defaultModules } from '@pnotify/core';
import checkTheme from './theme-mode';
import refs from './refs';

document.addEventListener('DOMContentLoaded', onStartEventsLoad);
// window.onload = onStartEventsLoad;

refs.countriesDropdownRef.addEventListener('click', onClickDropdown);
refs.searchInputRef.addEventListener('input', debounce(onInputSearch, 500));

//функция подгрузки событий при первой загрузке страницы
function onStartEventsLoad() {
  apiService.resetPage();
  setEventsOnPage();

  apiService.fetchEvent().then(data => {
    renderGallery(data);
    setPagination(data.page.totalElements);
  });
}

document.body.addEventListener('click', closeCntrListByNotargetClick);
function closeCntrListByNotargetClick(e) {
  if (!e.target.closest('.countries-dropdown__wrapper')) {
    refs.countryListRef.classList.add('visually-hidden');
  }
}

//функция обработки выбора списка стран поиск
function onClickDropdown(e) {
  if (
    e.target.getAttributeNames().includes('data-dropdown') ||
    e.target.getAttributeNames().includes('data-country-id')
  ) {
    // Проверяем кликнули ли мы по стране, если да, то оставляем в форме страну, добавляем аттрибут страны и фетчим
    if (e.target.classList.contains('dropdown__item')) {
      const attributeName = e.target.dataset.countryId;
      const countryName = e.target.textContent;

      refs.dropdownTitleRef.dataset.countryId = attributeName;
      refs.dropdownTitleRef.textContent = countryName;
    }

    // Рендерим список стран
    refs.countryListRef.innerHTML = dropdownTpl(countryList);

    // Оперируем классом "visually-hidden" для скрытия списка стран по клику
    if (refs.countryListRef.classList.contains('visually-hidden')) {
      refs.countryListRef.classList.remove('visually-hidden');
      refs.dropdownIconRef.classList.add('dropdown__svg--open');
    } else {
      refs.countryListRef.classList.add('visually-hidden');
      refs.dropdownIconRef.classList.remove('dropdown__svg--open');
    }
  }

  if (e.target.getAttributeNames().includes('data-country-id')) {
    if (refs.dropdownTitleRef.getAttribute('data-country-id') === 'default') {
      apiService.countryCode = '';
    } else {
      apiService.countryCode = refs.dropdownTitleRef.getAttribute('data-country-id');
    }

    showLoader();
    apiService.resetPage();
    setEventsOnPage();

    apiService
      .fetchEvent()
      .then(data => {
        renderGallery(data);
        setPagination(data.page.totalElements);
        checkTheme(JSON.parse(localStorage.getItem('Theme')));
      })
      .catch(() => (refs.eventCardsRef.innerHTML = ''))
      .finally(hideLoader);
  }
}

//функция обработки поля input поиск
function onInputSearch(e) {
  apiService.keyword = e.target.value;
  refs.eventCardsRef.innerHTML = '';

  if (!e.target.value.length) {
    refs.searchIconRef.style.opacity = 1;
    refs.clearSearchIconRef.style.opacity = 0;
  } else {
    refs.clearSearchIconRef.style.opacity = 1;
    refs.searchIconRef.style.opacity = 0;
  }
  showLoader();
  apiService.resetPage();
  setEventsOnPage();

  apiService
    .fetchEvent()
    .then(data => {
      renderGallery(data);
      setPagination(data.page.totalElements);
    })
    .catch(console.log)
    .finally(hideLoader);
}

//функция генерации галереи событий
function renderGallery(data) {
  const events = data._embedded.events.map(evt => ({
    ...evt,
    imgUrl: evt.images.find(img => img.width === 1024 && img.height === 683),
    locationRef: evt._embedded.venues[0].name,
  }));
  refs.eventCardsRef.innerHTML = eventsListTpl(events);
  checkTheme(JSON.parse(localStorage.getItem('Theme')));
}

//функция установки количества событий на странице
function setEventsOnPage() {
  const windowOuterWidth = window.outerWidth;
  //для планшета (проверка по ширине браузера) меняем количество подгружаемых в запросе событий на 21.
  if (windowOuterWidth > 768 && windowOuterWidth < 1280) {
    apiService.size = 21;
  } else {
    apiService.size = 20;
  }
}

export { renderGallery, setEventsOnPage };
