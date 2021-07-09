import countryList from './countries-code.js';
import dropdownTpl from '../tpl/dropdown.hbs';
import ApiService from '../services/api-services';
import eventsListTpl from '../tpl/cards.hbs';

const apiService = new ApiService();
const countryListRef = document.querySelector('.dropdown__list');
const dropdownTitleRef = document.querySelector('.dropdown__title');
const dropdownRef = document.querySelector('.dropdown');
const eventCardsRef = document.querySelector('.cards__list');

document.addEventListener('click', onClickDropdown);

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
    const inputSearchKeyword = '';
    const size = '20';
    const countryCode = dropdownTitleRef.getAttribute('data-country-id');

    apiService
      .fetchEvent(inputSearchKeyword, countryCode, size)
      .then(data => renderGallery(data))
      .catch(console.log);
  }
}

function renderGallery(data) {
  const events = data._embedded.events;
  // console.log(events);
  eventCardsRef.innerHTML = eventsListTpl(events);
  // findPictures(events);
}

// function findPictures(events) {
//   console.log(events);
//   const picsArr = [];
//   for (let event of events) {
//     for (let e of event.images) {
//       if (e.width === 640 && e.height === 427) {
//         picsArr.push(e);
//       }
//     }
//   }
//   const picsRef = document.querySelectorAll('.pics');

//   picsRef.forEach(pic => {
//     for (let i = 0; i < picsArr.length; i++) {
//       console.log(picsArr[i]);
//       pic.setAttribute(src, picsArr[i].url);
//     }
//     return;
//   });
// }
