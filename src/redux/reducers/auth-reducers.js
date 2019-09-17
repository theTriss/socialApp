import { authAPI } from '../../api/api';
import { stopSubmit } from 'redux-form';
import { getUserProfileThunkCreator } from './pprofile-reducer';

const SET_USER_DATA = 'SET-USER-DATA';
const SHANGE_IS_AUTH = 'CHANGE-IS-AUTH';
const LOG_OUT = 'LOG-OUT';
const SET_CAPTCHA = 'SET-CAPTCHA';

let initialState = {
    id: null,
    login: null,
    email: null,
    captcha: '',
    isAuth: true,
}

let authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data,
                captcha: '',
                isAuth: true,
            }
        case SHANGE_IS_AUTH: {
            return {
                ...state,
                isAuth: false
            }
        }
        case LOG_OUT:
            return {
                ...state,
                id: null,
                login: null,
                email: null,
                isAuth: true,
            }
        case SET_CAPTCHA:
            return {
                ...state,
                captcha: action.captcha
            }
        default:
            return state;
    }
}

export const changeIsAuth = () => ({ type: SHANGE_IS_AUTH });
export const setUserData = (data) => ({ type: SET_USER_DATA, data });
export const logOut = () => ({ type: LOG_OUT })
export const setCaptcha = (captcha) => ({ type: SET_CAPTCHA, captcha })


export const getAuthThunkCreator = () => {
    return (dispatch) => {
        return authAPI.getAuth()
            .then(response => {
                if (response.data.resultCode == 0) {
                    dispatch(setUserData(response.data.data));
                    return dispatch(getUserProfileThunkCreator(response.data.data.id))
                } else dispatch(changeIsAuth());
            })
    }
}

export const logInThunkCreator = (data) => {
    return (dispatch) => {
        authAPI.logIn(data)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(getAuthThunkCreator());
                }
                else if (response.data.resultCode === 10) {
                    authAPI.getCaptcha().then(response => {
                        dispatch(setCaptcha(response.data.url));
                    })
                }
                else {
                    dispatch(stopSubmit('login', { _error: response.data.messages[0] }))
                }
            })
    }
}

export const logOutThunkCreator = () => {
    return (dispatch) => {
        authAPI.logOut()
            .then(response => dispatch(logOut()))
    }
}

export default authReducer;