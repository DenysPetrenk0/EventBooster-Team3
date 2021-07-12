import ApiService from '../services/api-services';

const eventsGalleryRef = document.querySelector('.cards__list');

eventsGalleryRef.addEventListener('click', getEventById);

const newApi = new ApiService();
let eventToRead;

function getEventById(e) {
  cardOnClick = e.target.value;

  newApi.fetchEventById(cardOnClick).then(data => {
    renderCard();
    //??шаблон модалки из hbs
  });
}
getEventById(id)
  .then(event => console.log(event))
  .catch(error => console.log(error));
