import Pagination from 'tui-pagination';
import apiService from '../services/api-services';
import { renderGallery, setEventsOnPage } from '../js/searching-input-dropdown';
import { hideLoader, showLoader } from './preloader';

function setPagination(totalEvents) {
  const options = {
    totalItems: totalEvents > 1000 ? 1000 : totalEvents,
    itemsPerPage: apiService.size,
    visiblePages: window.outerWidth < 768 ? 3 : 5,
    page: 1,
    centerAlign: true,
  };
  const pagination = new Pagination('pagination', options);

  pagination.on('beforeMove', function (eventData) {
    apiService.page = eventData.page - 1;
    showLoader();
    setEventsOnPage();
    apiService.fetchEvent().then(renderGallery).catch(console.log).finally(hideLoader);
  });
}

export default setPagination;
