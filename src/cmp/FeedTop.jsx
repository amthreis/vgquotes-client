import React, { useReducer, useRef } from 'react';
import styles from "./FeedTop.module.css";
import useOnScreen from '../hooks/useOnScreen';

const FeedTop = ({count, max, onClick}) => {

    const ref = useRef(null);
    const isVisible = useOnScreen(ref);

    return (
        <>
            <button ref={ref} className={ styles.base } onClick={ onClick } >+{ Math.min(max, count) } new posts</button>

            {
                !isVisible && <button  className={ styles.fixed } onClick={ onClick } >+{ Math.min(max, count) } new posts</button>
            }
            
        </>
    );
};

export default FeedTop;