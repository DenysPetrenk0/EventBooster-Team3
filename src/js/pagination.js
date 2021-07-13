import Pagination from 'tui-pagination';
import eventsListTpl from '../tpl/cards.hbs';
import apiService from '../services/api-services';
import setEventsOnPage from '../js/searching-input-dropdown';
import apiServices from '../services/api-services';

const refs = {
  eventCardsRef: document.querySelector('.cards__list'),
};
export default function setPagination(totalItems) {
  const options = {
    totalItems,
    itemsPerPage: apiServices.size,
    visiblePages: 5,
    page: 1,
    centerAlign: true,
  };
  const pagination = new Pagination('pagination', options);
  pagination.on('beforeMove', function (eventData) {
    apiServie.page = eventData.page - 1;
    apiService.fetchEvent().then(renderGallery).catch(console.log);
  });
}

//функция генерации галереи событий
function renderGallery(data) {
  const events = data._embedded.events.map(evt => ({
    ...evt,
    imgUrl: evt.images.find(img => img.width === 640 && img.height === 427),
    locationRef: evt._embedded.venues[0].name,
  }));
  refs.eventCardsRef.innerHTML = eventsListTpl(events);
}
