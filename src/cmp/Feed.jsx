import React, { useEffect, useState } from 'react'
import styles from "./Feed.module.css";
import Post from './Post';
import FeedBottom from './FeedBottom';


import Spinner from "react-activity/dist/Spinner";
import "react-activity/dist/Spinner.css";
import { seconds } from '../utils';
import FeedTop from './FeedTop';

const MAX_POSTS_UNTIL_REFRESH = 20;

function getAPI() {
    //console.log("do")
    const apis = JSON.parse(import.meta.env.VITE_API);

    

    if (import.meta.env.VITE_USE_LOCAL_API === undefined || import.meta.env.VITE_USE_LOCAL_API === 'true') return apis[0];

    //console.log(apis);
    return apis[1];
}

const Feed = () => {
    const [posts, setPosts] = useState([]);
    const [isLoadingMore, setisLoadingMore] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [oldestDate, setOldestDate] = useState();
    const [newestDate, setNewestDate] = useState();
    const [newerPosts, setNewerPosts] = useState([]);

    // useEffect(() => {
    //     getAPI();

    //     //doa();
    // }, []);

    // async function doa() {
    //     const res = await fetch(`http://localhost:3004/ip`);
        
    //     console.log("res",res);
    //     const r = await res.json();

    //     console.log("r",r);
    //     console.log("---");
    // }

    useEffect(() => {
        if (newerPosts.length < MAX_POSTS_UNTIL_REFRESH) {

            const timer = window.setInterval(() => {
                //console.log("-----inter");
                fetchNewerPosts();
            }, 7000);
            return () => window.clearInterval(timer);
        }

    }, [newestDate, newerPosts]);

    async function fetchNewerPosts() {

        //console.log(newestDate)
        if (newestDate === undefined) return;
        
        console.log("fetch",getAPI());

        const response = await fetch(`${ getAPI() }/newer/${ newestDate.getTime() }`);

        if (response.status === 200) {
            const result = await response.json();

            //console.log("posts ft",result);
            //console.log("beofre", posts.length);

            if (result.length > 0) {

                //console.log("found newer", result.length);
                //console.log("newer list before: ", newerPosts.length);
    
                if (newestDate === undefined || new Date(result[0].createdAt).getTime() > newestDate.getTime()) {
                    setNewestDate(new Date(result[0].createdAt));
                    //console.log("new newest date:", result[0].createdAt);
                }


                setNewerPosts([...result, ...newerPosts]);
            }

            
            //console.log("------------------d-");
        }
    }
    
    async function fetchOlderPosts() {

        if (isLoadingMore) {
            //console.log("was already loading...")
            return;
        }

        setisLoadingMore(true);

        //await seconds(2);

        console.log("fetch",getAPI());
        const response = await fetch(`${ getAPI() }/older/${ (oldestDate || new Date()).getTime() }`);

        //console.log(`${ getAPI() }/older/${ (oldestDate || new Date()).getTime() }`);
        //console.log(`http://localhost:3004/older/${ (oldestDate || new Date()).getTime() }`);

        if (response.status === 200) {
            const result = await response.json();

            //console.log("posts ft",result);
            //console.log("beofre", posts.length);

            //console.log("fetch", result.posts.length);

            if (result.posts.length > 0) {

                if (newestDate === undefined || new Date(result.posts[0].createdAt).getTime() > newestDate.getTime()) {
                    setNewestDate(new Date(result.posts[0].createdAt));

                    /*
                    console.log("OLD newest date:", newestDate);
                    console.log("new newest date:", new Date(result.posts[0].createdAt).getTime());
                    console.log("new newest date:", new Date(result.posts[0].createdAt));
                    console.log("post from: ", result.posts[0].character);
                    */
                }

                setPosts([... posts, ...result.posts]);
                setHasMore(result.hasMore);
                setOldestDate(new Date(result.posts[result.posts.length - 1].createdAt));
            }
            else {
                setHasMore(false);
            }
            setisLoadingMore(false);

            //console.log("oldest", result.posts[result.posts.length - 1].createdAt);
        }
        else {
            setisLoadingMore(false);
        }
    }

    function handleClickNewerPosts() {
        //console.log("add newer");


        if (newerPosts.length >= MAX_POSTS_UNTIL_REFRESH) {
            window.location.reload();
        } else {

            window.scrollTo(0, 0);

            setPosts([...newerPosts, ...posts]);
            setNewerPosts([]);
        }
    }

    function handleSeen() {
        //console.log("LOAD MORE POSTS NOW BECAUSE I WAS SEEN!!! hasMore", hasMore);
        if (hasMore) {
            //console.log("LOAD MORE POSTS NOW BECAUSE I WAS SEEN!!!");
            fetchOlderPosts();
        }
    }

    if (posts === undefined) {
        return <div className={ styles.center } ><Spinner/></div>;
    }

    return (
    <div className={ styles.base }>
        { newerPosts?.length > 0 && <FeedTop count={ newerPosts.length } max={ MAX_POSTS_UNTIL_REFRESH } onClick={ handleClickNewerPosts }/> } 
        { posts.map(p => <Post key={ `${p.id}_${p.createdAt}` } post={ p } />) }
        <FeedBottom isLoading={isLoadingMore} onSeen={ handleSeen }/>
    </div>
    );
};

export default Feed;