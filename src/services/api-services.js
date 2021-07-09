export default class ApiService {
  constructor() {
    this.API_KEY = 'R6T2f5StA43ZJAlAODPBSAJJjoAoGQks';
    this.BASE_URL = 'https://app.ticketmaster.com/discovery/v2/events';
    this.page = 1;

    this._keyword;
    this._countryCode;
    this._size = 20;
  }

  fetchEvent() {
    const url = `${this.BASE_URL}.json?keyword=${this._keyword}&countryCode=${this._countryCode}&size=${this._size}&apikey=${this.API_KEY}`;
    return fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.page.totalElements === 0) {
          return Promise.reject('Opps! Something went wrong');
        } else {
          return data;
        }
      });
  }

  fetchEventById(id) {
    const url = `${this.BASE_URL}/${id}.json?&apikey=${this.API_KEY}`;
    return fetch(url).then(response => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject('Opps! Something went wrong');
    });
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
}
