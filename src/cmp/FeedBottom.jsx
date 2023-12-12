import { useEffect, useRef } from "react";

import styles from "./FeedBottom.module.css";
import useOnScreen from "../hooks/useOnScreen";

import Spinner from "react-activity/dist/Spinner";

const FeedBottom = ({ isLoading,  onSeen }) => {
  
    const ref = useRef(null);
    const isVisible = useOnScreen(ref);

    useEffect(() => {
        //console.log("bottom.vis: ", isVisible);

        if (isVisible && onSeen) {
            onSeen();
        }
    }, [isVisible]);


    return (
        
        <div ref={ref} className={ styles.base }>
        {
            (isLoading ) ? <Spinner/> : <p className={ styles.text }>- you've seen it all -</p> 
        }
        </div>
    );


  //return <div ref={ref}>{isVisible && `Yep, I'm on screen`}</div>
}

export default FeedBottom;