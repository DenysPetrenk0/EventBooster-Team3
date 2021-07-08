export default class ApiService {
  constructor() {
    this.API_KEY = 'R6T2f5StA43ZJAlAODPBSAJJjoAoGQks';
    this.BASE_URL = 'https://app.ticketmaster.com/discovery/v2/events.json?';
    this.page = 1;
  }

  fetchEvent(keyword = '', countryCode = '', size = 20) {
    const url = `${this.BASE_URL}keyword=${keyword}&countryCode=${countryCode}&size=${size}&apikey=${this.API_KEY}`;
    return fetch(url).then(response => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject('Opps! Something went wrong');
    });
  }
}
