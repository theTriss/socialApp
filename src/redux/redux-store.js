import { createStore, combineReducers, applyMiddleware  } from "redux";
import dialogsReducer from './reducers/dialogs-reducers';
import profileReducer from './reducers/pprofile-reducer';
import usersReducer from './reducers/users-reducers';
import authReducer from './reducers/auth-reducers';
import reduxThunk from 'redux-thunk';
import appReducer from './reducers/app-reducers';
import newsReducer from './reducers/news-reducers';
import musicReduxer from './reducers/music-reducer';
import { reducer as formReducer }from 'redux-form';

const reducers = combineReducers({
    dialogsPage: dialogsReducer,
    profilePage: profileReducer,
    usersPage: usersReducer,
    newsPage: newsReducer,
    musicPage: musicReduxer,
    auth: authReducer,
    form: formReducer,
    init: appReducer,
});

export let store = createStore( reducers, applyMiddleware(reduxThunk) );

window.store = store;

export default store;