import styles from "./styles.module.sass";

export function FontSizeChanger() {
  const changeFontSize = (size: string, event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    localStorage.setItem('fontSize', size);
    document.body.style.setProperty('--base-font-size', size);

    // Remove the selected class from all elements
    document.querySelectorAll(`.${styles.FontSize} a`).forEach(el => {
      el.classList.remove(styles.Selected);
    });
    
    // Add the selected class to the clicked element
    event.currentTarget.classList.add(styles.Selected);
  };

  return (
    <div className={styles.FontSize}>
      <a className={`${styles.Small}`} href="#" onClick={(e) => changeFontSize('10px', e)} aria-label="Pequena" title="Pequena">
        A
      </a>

      <a className={`${styles.Medium}`} href="#" onClick={(e) => changeFontSize('16px', e)} aria-label="Normal" title="Normal">
        A
      </a>

      <a className={`${styles.Large}`} href="#" onClick={(e) => changeFontSize('22px', e)} aria-label="Grande" title="Grande">
        A
      </a>

      <span>Tamanho do texto</span>
    </div>
  );
}
