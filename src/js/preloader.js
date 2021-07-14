import refs from './refs';
// const preloader = document.querySelector('#preloader');

window.onload = function () {
  setTimeout(() => {
    hideLoader();
  }, 1000);
};

function showLoader() {
  refs.preloader.classList.remove('visually-hidden');
}
function hideLoader() {
  refs.preloader.classList.remove('preloader-dark-bg');
  refs.preloader.classList.add('visually-hidden');
}

export { showLoader, hideLoader };
