import refs from './refs';
// const themeSwitchRef = document.querySelector('#theme-switch-toggle');

const defaultUserThemeValue = JSON.parse(localStorage.getItem('Theme'));

const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};

refs.themeSwitchRef.addEventListener('change', onSwitchTheme);

setTimeout(() => {
  defineUserThemeSettings(defaultUserThemeValue);
}, 150);

export default function defineUserThemeSettings(value) {
  if (value === Theme.LIGHT) {
    onSwitchingTheme(Theme.DARK, Theme.LIGHT);
  }
}

function onSwitchTheme() {
  if (document.body.classList.contains(Theme.DARK)) {
    onSwitchingTheme(Theme.DARK, Theme.LIGHT);

    return;
  }
  onSwitchingTheme(Theme.LIGHT, Theme.DARK);
}

function onSwitchingTheme(presentTheme, nextTheme) {
  document.body.classList.replace(presentTheme, nextTheme);

  localStorage.setItem('Theme', JSON.stringify(nextTheme));
  refs.themeSwitchRef.checked = presentTheme === Theme.DARK;
}
