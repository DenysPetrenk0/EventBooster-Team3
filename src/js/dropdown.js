import countryList from './countries-code.js';
import dropdownTpl from '../tpl/dropdown.hbs';

const countryListRef = document.querySelector('.dropdown__list');
const dropdownTitleRef = document.querySelector('.dropdown__title');
const dropdownRef = document.querySelector('.dropdown');

dropdownRef.addEventListener('click', onClickDropdown);

function onClickDropdown(e) {
  //   Проверяем точно ли мы кликнули на "Dropdown" (на будущее, т.к. слушатель весит на "Dropdown DIV" пока что,
  //  но планируем обьеденить слушатели и тогда пригодится данная строка)

  if (e.target.getElementById === 'dropdown' || e.target.getElementById === 'country') return;

  // Проверяем кликнули ли мы по стране, если да, то оставляем в форме страну, добавляем аттрибут страны и фетчим
  if (e.target.classList.contains('dropdown__item')) {
    const attributeName = e.target.getAttribute('data-country-id');
    const countryName = e.target.textContent;

    dropdownTitleRef.setAttribute('data-country-id', attributeName);
    dropdownTitleRef.textContent = countryName;
  }

  // Рендерим список стран
  countryListRef.innerHTML = dropdownTpl(countryList);

  // Оперируем классом "visually-hidden" для скрытия списка стран по клику
  if (countryListRef.classList.contains('visually-hidden')) {
    countryListRef.classList.remove('visually-hidden');
  } else {
    countryListRef.classList.add('visually-hidden');
  }
}
