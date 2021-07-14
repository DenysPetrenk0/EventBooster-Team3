const defaultUserThemeValue = JSON.parse(localStorage.getItem('Theme'));
const themeSwitchRef = document.querySelector('#theme-switch-toggle');

const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};

themeSwitchRef.addEventListener('change', onSwitchTheme);

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

  if (document.body.classList.contains(Theme.LIGHT)) {
    onSwitchingTheme(Theme.LIGHT, Theme.DARK);
    return;
  }
}

function onSwitchingTheme(presentTheme, nextTheme) {
  switchClassName(presentTheme, nextTheme);

  localStorage.setItem('Theme', JSON.stringify(nextTheme));
  themeSwitchRef.checked = presentTheme === Theme.DARK;
}

function switchClassName(present, next) {
  document.body.classList.replace(present, next);
  document.querySelector('.background').classList.replace(present, next);

  if (present === 'dark-theme') {
    document.querySelectorAll('.card__date').forEach(e => e.classList.add('light-theme'));
    document.querySelectorAll('.card__location').forEach(e => e.classList.add('light-theme'));
    document.querySelectorAll('.tui-page-btn').forEach(e => e.classList.add('light-theme'));
  }

  if (present === 'light-theme') {
    document.querySelectorAll('.card__date').forEach(e => e.classList.remove('light-theme'));
    document.querySelectorAll('.card__location').forEach(e => e.classList.remove('light-theme'));
    document.querySelectorAll('.tui-page-btn').forEach(e => e.classList.remove('light-theme'));
  }
}
