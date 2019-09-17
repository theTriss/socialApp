import { profileAPI } from '../../api/api';

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET-USER-PROFILE';
const GET_STATUS = 'GET-STATUS';

let initialState = {
    posts: [
        {
            id: 1,
            postMessage: 'why always me?',
            likesCounter: 12
        },
        {
            id: 2,
            postMessage: 'i am ok, right now',
            likesCounter: 124,
        }
    ],
    userProfile: null,
    status: '',
}

let profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                posts: [...state.posts, {
                    id: state.posts.length + 1,
                    postMessage: action.postText,
                    likesCounter: 0
                }]
            };
        case SET_USER_PROFILE:
            return {
                ...state,
                userProfile: action.profile
            }
        case GET_STATUS:
            return {
                ...state,
                status: action.status
            }
        default:
            return state;
    }
}

export const addPost = (postText) => ({ type: ADD_POST, postText });
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile });
export const setStatus = (status) => ({ type: GET_STATUS, status });

export const getUserProfileThunkCreator = (userId) => {
    return (dispatch) => {
         return profileAPI.getUserProfile(userId)
            .then(response => { dispatch(setUserProfile(response.data)) })
    }
}


export const getUserStatusThunkCreator = (userId) => {
    return (dispatch) => {
        profileAPI.getStatus(userId)
            .then(response => dispatch(setStatus(response.data)));
    }
}

export const changeStatusThunkCreator = (status) => {
    return (dispatch) => {
        profileAPI.changeStatus(status)
            .then(response => { 
                if (response.data.resultCode == 0) dispatch(setStatus(status))
            })
    }
}

export const editProfileThunkCreator = (data) => (dispatch) => {
    profileAPI.editProfile(data);
    if(data.photo) {
        const formData = new FormData();
        formData.append('image', data.photo);
        profileAPI.setPhoto(formData)
    }
}

export default profileReducer;