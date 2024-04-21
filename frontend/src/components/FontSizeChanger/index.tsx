import { useState } from "react";
import styles from "./styles.module.sass";


export function FontSizeChanger() {
  const [selectedSize, setSelectedSize] = useState(localStorage.getItem('fontSize') || '16px');

  const changeFontSize = (size: string, event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    localStorage.setItem('fontSize', size);
    document.body.style.setProperty('--base-font-size', size);
    setSelectedSize(size); 
  };

  const fontSizeIsSelected = (size: string) => selectedSize === size ? styles.Selected : '';

  const classNames = (size: string, cssClass: string) => `${fontSizeIsSelected(size)} ${cssClass}`;


  return (
    <div className={styles.FontSize}>
      <a className={classNames('10px', styles.Small)} href="#" onClick={(e) => changeFontSize('10px', e)} aria-label="Pequena" title="Pequena">
        A
      </a>

      <a className={classNames('16px', styles.Medium)} href="#" onClick={(e) => changeFontSize('16px', e)} aria-label="Normal" title="Normal">
        A
      </a>

      <a className={classNames('22px', styles.Large)} href="#" onClick={(e) => changeFontSize('22px', e)} aria-label="Grande" title="Grande">
        A
      </a>

      <span>Tamanho do texto</span>
    </div>
  );
}