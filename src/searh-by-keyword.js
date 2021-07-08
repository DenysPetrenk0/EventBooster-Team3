import ApiService from './services/api-services';
import debounce from 'lodash.debounce';
// import eventsListTpl from './tpl/???.handlebars';

// const eventsGalleryRef = document.querySelect(".");
const searchInputRef = document.querySelector('.search-input');
searchInputRef.addEventListener('input', debounce(onInputSearch, 500));

const newApi = new ApiService();
let inputSearchKeyword;

function onInputSearch(e) {
  inputSearchKeyword = e.target.value;
  newApi.fetchEvent(inputSearchKeyword).then(data => {
    console.log(data);
    console.log(data.page.totalPages);
    console.log(data._embedded.events);
    // renderGallery();
  });
}

// function renderGallery({ event }) {
// eventsGalleryRef.innerHTML = eventsListTpl(event);
// }
