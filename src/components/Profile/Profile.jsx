import React from 'react';
import style from './Profile.module.css';
import ProfilePosts from './ProfilePosts/ProfilePosts';
import ProfileInfo from './ProfileInfo/ProfileInfo';

const Profile = ( props ) => {
    
    return (
        <main>
            <ProfileInfo userProfile={props.userProfile} changeStatus={props.changeStatusThunkCreator} status={props.status}/>
            <ProfilePosts posts={props.posts} addPost={props.addPost} />
        </main>
    )
}


export default Profile;