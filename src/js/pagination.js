import Pagination from 'tui-pagination';
// import apiService;
export default function setPagination(totalItems) {
  const options = {
    totalItems,
    itemsPerPage: 20,
    visiblePages: 5,
    page: 1,
    centerAlign: false,
  };
  const pagination = new Pagination('pagination', options);
  pagination.on('beforeMove', function (eventData) {
    //  apiServie.page=eventData.page-1;
    // apiService.fetchEvent().then(render)
  });
}
