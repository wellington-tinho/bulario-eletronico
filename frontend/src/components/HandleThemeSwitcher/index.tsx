import styles from './styles.module.sass';

export function HandleThemeSwitcher() {
  const userPreferenceThemeInBrowser = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  const userPreferenceThemeInPage = localStorage.getItem('theme') || userPreferenceThemeInBrowser;

  document.body.dataset.theme = userPreferenceThemeInPage;

  const changeTheme = () => {
    const currentTheme = document.body.dataset.theme;
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.body.dataset.theme = newTheme;
    localStorage.setItem('theme', newTheme);
  };

  return (
    <button 
      onClick={changeTheme}
      aria-label="Mudar contraste"
      title="Mudar contraste"
      className={styles.ButtonContrast}
    >
      <img src="assets/images/contrast.png" alt="Ícone de contraste"/>
    </button>
  );
}


