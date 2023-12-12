import React from 'react';
import styles from "./FeedTop.module.css";

const FeedTop = ({count, max, onClick}) => {


    return (
    <button className={ styles.base } onClick={ onClick } >+{ Math.min(max, count) } new posts</button>
    );
};

export default FeedTop;