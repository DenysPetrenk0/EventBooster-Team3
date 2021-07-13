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
  if (value === Theme.DARK) return;

  if (value === Theme.LIGHT) {
    onSwitchingTheme('dark-theme', Theme.LIGHT);
  }
}

function onSwitchTheme() {
  if (document.body.classList.contains('dark-theme')) {
    onSwitchingTheme('dark-theme', Theme.LIGHT);

    return;
  }

  if (document.body.classList.contains('light-theme')) {
    onSwitchingTheme('light-theme', Theme.DARK);
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
    document.querySelectorAll('.card__date').forEach(e => (e.style.color = 'rgb(14,14,14)'));
    document.querySelectorAll('.card__location').forEach(e => (e.style.color = 'rgb(14,14,14)'));
  }

  if (present === 'light-theme') {
    document.querySelectorAll('.card__date').forEach(e => (e.style.color = ''));
    document.querySelectorAll('.card__location').forEach(e => (e.style.color = ''));
  }
}
