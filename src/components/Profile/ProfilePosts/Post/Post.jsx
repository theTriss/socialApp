import React, { Fragment } from 'react';
import style from './Post.module.css';

const Post = (props) => {

    return (
        <div className={style.post}>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYvKBrZIgurM0ze641205MG2KHoQZnVhjqPQmMi3uupWorWQSB" alt="Avatar" className={style.ava}/>
            <div className={style.postMessage}>{props.postMessage}</div>
            <div>Likes: {props.likesCounter}</div>
        </div>
    )
}

export default Post;