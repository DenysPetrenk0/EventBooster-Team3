const defaultUserThemeValue = JSON.parse(localStorage.getItem('Theme'));
const themeSwitchRef = document.querySelector('#theme-switch-toggle');

const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};

themeSwitchRef.addEventListener('change', onSwitchTheme);

defineUserThemeSettings(defaultUserThemeValue);

function defineUserThemeSettings(value) {
  if (value === Theme.DARK) return;

  if (value === Theme.LIGHT) onSwitchTheme();
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
  document.body.classList.replace(presentTheme, nextTheme);
  document.querySelector('.background').classList.replace(presentTheme, nextTheme);
  localStorage.setItem('Theme', JSON.stringify(nextTheme));
  themeSwitchRef.checked = presentTheme === Theme.DARK;
}
