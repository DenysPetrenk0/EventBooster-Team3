import Pagination from 'tui-pagination';
import apiService from '../services/api-services';
import checkTheme from './theme-mode';
import { renderGallery, setEventsOnPage } from '../js/searching-input-dropdown';


function setPagination(totalEvents) {
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
    setEventsOnPage();
    apiService.fetchEvent().then(renderGallery).catch(console.log);
  });
}

export default setPagination;

