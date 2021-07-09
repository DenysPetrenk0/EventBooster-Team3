import ApiService from '../services/api-services';
import debounce from 'lodash.debounce';
import eventsListTpl from '../tpl/cards.hbs';

const eventsGalleryRef = document.querySelect('.cards__list');
const searchInputRef = document.querySelector('.form-field');

//вешаем событие ввода в строку input
searchInputRef.addEventListener('input', debounce(onInputSearch, 500));

const newApi = new ApiService();
let inputSearchKeyword;

function onInputSearch(e) {
  inputSearchKeyword = e.target.value;
  let size = 20;
  let countryCode = '';
  const windowOuterWidth = window.outerWidth;

  //для планшета меняем количество подгружаемых в запросе событий на 21.
  if (windowOuterWidth > 768 && windowOuterWidth < 1280) size = 21;

  newApi.fetchEvent(inputSearchKeyword, countryCode, size).then(data => {
    renderGallery(data._embedded.events);
    // console.log(data);
    // console.log(data.page.totalPages);
    // console.log(data._embedded.events);
  });
  console.log(inputSearchKeyword);
}

function renderGallery({ event }) {
  eventsGalleryRef.innerHTML = eventsListTpl(event);
}

export default inputSearchKeyword;
