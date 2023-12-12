import React, { useEffect, useState } from 'react'
import styles from "./Feed.module.css";
import Post from './Post';
import FeedBottom from './FeedBottom';


import Spinner from "react-activity/dist/Spinner";
import "react-activity/dist/Spinner.css";
import { seconds } from '../utils';


const Feed = () => {
    const [posts, setPosts] = useState([]);
    const [isLoadingMore, setisLoadingMore] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [oldestDate, setOldestDate] = useState();


    useEffect(() =>  {
        //window.scrollTo(0, 0);
        //fetchPosts();
    }, []);

    
    async function fetchPosts() {

        if (isLoadingMore) {
            //console.log("was already loading...")
            return;
        }

        setisLoadingMore(true);

        await seconds(2);

        const response = await fetch(`http://localhost:3004/older/${ oldestDate || new Date() }`);

        if (response.status === 200) {
            const result = await response.json();

            //console.log("posts ft",result);
            //console.log("beofre", posts.length);

            console.log("fetch", result.posts.length);

            setPosts([... posts, ...result.posts]);
            setHasMore(result.hasMore);
            setOldestDate(result.posts[result.posts.length - 1].createdAt);
            setisLoadingMore(false);

            //console.log("oldest", result.posts[result.posts.length - 1].createdAt);
        }
        else {
            setisLoadingMore(false);
        }
    }

    function handleSeen() {
        console.log("LOAD MORE POSTS NOW BECAUSE I WAS SEEN!!! hasMore", hasMore);
        if (hasMore) {
            //console.log("LOAD MORE POSTS NOW BECAUSE I WAS SEEN!!!");
            fetchPosts();
        }
    }

    if (posts === undefined) {
        return <div className={ styles.center } ><Spinner/></div>;
    }

    return (
    <ul className={ styles.base }>
        { posts.map(p => <Post key={ p.id } post={ p } />) }
        <FeedBottom isLoading={isLoadingMore} onSeen={ handleSeen }/>
    </ul>
    );
};

export default Feed;