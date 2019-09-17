import { musicAPI } from '../../api/api';
import { togglePreloader } from './app-reducers';

const SET_TRACKS = 'SET-TRACKS';
const ADD_TRACKS = 'ADD-TRACKS';

const initialState = {
    tracks: [],
    basicRequest: `https://api.jamendo.com/v3.0/tracks/?client_id=7474c0d2&limit=10&`,
    nextRequest: undefined,
    searchActive: false,
};

const newsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TRACKS:
            return {
                ...state,
                tracks: [...action.tracks],
                nextRequest: action.next,
                searchActive: true,
            }
        case ADD_TRACKS:
            return {
                ...state,
                tracks: [...state.tracks, ...action.tracks],
                nextRequest: action.next
            }
        default:
            return state
    }
}

const setTracks = (tracks, next) => ({ type: SET_TRACKS, tracks, next });
const addTracks = (tracks, next) => ({ type: ADD_TRACKS, tracks, next });

export const setTracksThunkCreator = (url) => async (dispatch) => {
    dispatch(togglePreloader('musicPreloader', false));
    const { status, data: { headers: { next }, results } } = await musicAPI.getTracks(url);
    if (status === 200) {
        dispatch(setTracks(results, next));
        dispatch(togglePreloader('musicPreloader', true));
    }
}

export const addTrackThunkCreator = (url) => async (dispatch) => {
    dispatch(togglePreloader('musicPaginationPreloader', true));
    const { status, data: { headers: { next }, results } } = await musicAPI.getTracks(url);
    if(status === 200) {
        dispatch(addTracks(results, next))
        dispatch(togglePreloader('musicPaginationPreloader', false));
    }
}

export default newsReducer;