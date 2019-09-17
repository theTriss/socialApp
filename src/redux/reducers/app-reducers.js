import { getAuthThunkCreator } from './auth-reducers';

const INITIALIZE_ME = 'INITIALIZE-ME';
const TOGGLE_PRELOADER = 'TOGGLE-PRELOADER';

const initialState = {
    initialize: false,
    newsPreloader: true,
    musicPreloader: true,
    settingPreloader: true,
    newsPaginationPreloader: false,
    musicPaginationPreloader: false,
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZE_ME:
            return {
                ...state,
                initialize: true
            }
        case TOGGLE_PRELOADER:
            const newState = { ...state };
            newState[action.preloader] = action.isPreloaderActive;
            return newState;
        default:
            return state
    }
}


const initializeMe = (isPreloaderActive) => ({ type: INITIALIZE_ME, isPreloaderActive });
export const togglePreloader = (preloader, isPreloaderActive) => ({ type: TOGGLE_PRELOADER, preloader, isPreloaderActive })

export const initializeThunkCreator = () => (dispatch) => {
    dispatch(getAuthThunkCreator())
        .then(response => { dispatch(initializeMe()) })
}

export default appReducer;