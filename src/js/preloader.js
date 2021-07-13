const preloader = document.querySelector('#preloader');
window.onload = function () {
  setTimeout(() => {
    hideLoader();
  }, 1000);
};

function showLoader() {
  preloader.classList.remove('visually-hidden');
}
function hideLoader() {
  preloader.classList.remove('preloader-dark-bg');
  preloader.classList.add('visually-hidden');
}

export { showLoader, hideLoader };
