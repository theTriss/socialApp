import React from 'react';
import style from './ProfilePosts.module.css';
import Post from './Post/Post';
import { reduxForm, Field } from 'redux-form';


let PostsFrom = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field component='textarea' placeholder='your news...' name='postText' className={style.post__inputPost}/>
            <button className={style.posts__btn}>Send</button>
        </form>
    )
}

PostsFrom = reduxForm({
    form: 'post'
})(PostsFrom)

const ProfilePosts = ( props ) => {

    const changePost = (data) => {
        props.addPost(data.postText);
    }

    return (
        <div className={style.posts}>
            <h1 className={style.posts__title}>My Posts</h1>
            <PostsFrom onSubmit={changePost}/>
            <div className={style.fielWithPost}>
                {props.posts.map(item => <Post key={item.id} postMessage={item.postMessage} likesCounter={item.likesCounter} />)}
            </div>
        </div>
    )
}  

export default ProfilePosts;