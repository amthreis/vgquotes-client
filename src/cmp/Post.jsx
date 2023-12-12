import React from 'react'
import styles from "./Post.module.css";
import { formatRelative } from 'date-fns';


const Post = ({ post }) => {
    return (
    <li className={ styles.base }>
        <img className={ styles.avatar } src={ post.portraitUrl } alt="" width={64} height={64}/>
        <div className={ styles.content } >
            <h4 className={ styles.postAuthor } >{ post.character }</h4>
            <p className={ styles.postText } >{ post.quote }</p>
            <p className={ styles.postTime } >{ formatRelative(new Date(post.createdAt), new Date()) }</p>
        </div>
    </li>
    );
};

export default Post;