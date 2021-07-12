const preloader = document.querySelector('#preloader');

showLoader();

setTimeout(() => {
  hideLoader();
}, 1000);

function showLoader() {
  document.querySelector('#preloader').classList.remove('visually-hidden');
}
function hideLoader() {
  document.querySelector('#preloader').classList.add('visually-hidden');
}
export { showLoader, hideLoader };
