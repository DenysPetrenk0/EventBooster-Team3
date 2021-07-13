import Pagination from 'tui-pagination';
// import eventsListTpl from '../tpl/cards.hbs';
import apiService from '../services/api-services';
import { renderGallery } from '../js/searching-input-dropdown';

const refs = {
  eventCardsRef: document.querySelector('.cards__list'),
};

export default function setPagination(totalEvents) {
  const options = {
    totalItems: totalEvents > 1000 ? 1000 : totalEvents,
    itemsPerPage: apiService.size,
    visiblePages: 5,
    page: 1,
    centerAlign: true,
  };
  const pagination = new Pagination('pagination', options);
  pagination.on('beforeMove', function (eventData) {
    apiService.page = eventData.page - 1;
    apiService.fetchEvent().then(renderGallery).catch(console.log);
  });
}
