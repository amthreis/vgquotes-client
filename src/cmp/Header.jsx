import React from 'react'

import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={ styles.base } >
        <div className={ styles.fixed } >
            <button className={ styles.button }>
                <img src="./src/assets/icon.png" alt="" width={32} height={32}/>
            </button>
        </div>
    </header>
  )
}

export default Header