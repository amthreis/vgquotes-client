import React from 'react'

import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={ styles.base } >
        <div className={ styles.fixed } >
            <a href='#top' className={ styles.button }>
                <img src="./src/assets/icon.png" alt="" width={32} height={32}/>
            </a>
        </div>
    </header>
  )
}

export default Header