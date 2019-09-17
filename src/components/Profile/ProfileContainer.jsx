import React, { Component, useState, useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Profile from './Profile';
import { addPost, getUserProfileThunkCreator, getUserStatusThunkCreator, changeStatusThunkCreator } from '../../redux/reducers/pprofile-reducer';
import { withRouter } from 'react-router';
import withRedirect from '../../hoc/Redirect';

const ProfileContainer = (props) => {

    const getUserProfile = (ID = props.myID) => {
        props.getUserProfileThunkCreator(ID);
        props.getUserStatusThunkCreator(ID);
    }
    
    useEffect( () => {
        const userId = props.match.params.id;
        getUserProfile(userId);
    }, [props.match.params.id] )

    return (
        <Profile {...props} />
    )
}

const mapStateToProps = state => {
    return {
        userProfile: state.profilePage.userProfile,
        posts: state.profilePage.posts,
        status: state.profilePage.status,
        myID: state.auth.id
    }
};

export default compose(
    connect(mapStateToProps, { addPost, getUserProfileThunkCreator, getUserStatusThunkCreator, changeStatusThunkCreator }),
    withRouter,
    withRedirect,
)(ProfileContainer);