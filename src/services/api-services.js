class ApiService {
  constructor() {
    this.API_KEY = 'R6T2f5StA43ZJAlAODPBSAJJjoAoGQks';
    this.BASE_URL = 'https://app.ticketmaster.com/discovery/v2/events';

    this._keyword = '';
    this._countryCode = '';
    this._size = 20;
    this._page = 0; // НАЧИНАЕТСЯ с 0, номер текущей страницы для отображения
  }

  //запрос для поиска по полю input и dropdown на главной странице
  fetchEvent() {
    const url = `${this.BASE_URL}.json?keyword=${this._keyword}&countryCode=${this._countryCode}&size=${this._size}&page=${this._page}&apikey=${this.API_KEY}`;
    // console.log(url);

    return fetch(url)
      .then(response => response.json())
      .then(data => {
        // console.log(data);
        if (data.page.totalElements === 0) {
          return Promise.reject('Opps! Something went wrong');
        } else {
          return data;
        }
      });
  }

  //запрос для модального окна по ID события, его можно взять в атрибуте <li class='card' data-index={{id}}>
  fetchEventById(id) {
    const url = `${this.BASE_URL}/${id}.json?&apikey=${this.API_KEY}`;
    return fetch(url).then(response => response.json());
  }

  get keyword() {
    return this._keyword;
  }

  set keyword(value) {
    this._keyword = value;
  }

  get countryCode() {
    return this._countryCode;
  }

  set countryCode(value) {
    this._countryCode = value;
  }

  get size() {
    return this._size;
  }

  set size(value) {
    this._size = value;
  }

  get page() {
    return this._page;
  }

  set page(value) {
    this._page = value;
  }
}

export default new ApiService();
