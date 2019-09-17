import { newsAPI } from '../../api/api';
import { togglePreloader } from './app-reducers';

const SET_NEWS = 'SET-NEWS';
const ADD_NEWS = 'ADD-NEWS';

const initialValue = {
    countries: [
        {
            id: 1,
            country: 'ua',
        },
        {
            id: 2,
            country: 'ru',
        },
        {
            id: 3,
            country: 'pl',
        },
        {
            id: 4,
            country: 'us',
        },
        {
            id: 5,
            country: 'gb',
        },
        {
            id: 6,
            country: 'cn',
        },
        {
            id: 7,
            country: 'fr',
        },
        {
            id: 8,
            country: 'de',
        },
        {
            id: 9,
            country: 'it',
        },
        {
            id: 10,
            country: 'jp',
        },
        {
            id: 11,
            country: 'nl',
        },
        {
            id: 12,
            country: 'pt',
        },
    ],
    categories: [
        {
            id: 1,
            category: 'sports'
        },
        {
            id: 2,
            category: 'entertainment'
        },
        {
            id: 3,
            category: 'general'
        },
        {
            id: 4,
            category: 'health'
        },
        {
            id: 5,
            category: 'science'
        },
        {
            id: 6,
            category: 'business'
        },
        {
            id: 7,
            category: 'technology'
        },
    ],
    news: [],
    searchActive: false,
    requestBody: {},
    totalResults: 0,
}

const newsReducer = (state = initialValue, action) => {
    switch (action.type) {
        case SET_NEWS:
            return {
                ...state,
                news: [...action.news],
                searchActive: true,
                totalResults: action.totalResults,
                requestBody: { ...action.requestBody },
            }
        case ADD_NEWS:
            return {
                ...state,
                news: [...state.news, ...action.news],
                requestBody: {...state.requestBody, page: state.requestBody.page + 1}
            }
        default:
            return state
    }
}

export const setNews = (news, totalResults, requestBody) => ({ type: SET_NEWS, news, totalResults, requestBody });
export const addNews = (news) => ({ type: ADD_NEWS, news });

export const setNewsThunkCreator = (q, country, category) => async (dispatch) => {
    dispatch(togglePreloader('newsPreloader', false));
    const response = await newsAPI.getNews(q, country, category);
    const { articles, status, totalResults } = response.data;
    if (status === 'ok') {
        dispatch(setNews(articles, totalResults, { q, country, category, page: 2 }))
        dispatch(togglePreloader('newsPreloader', true))
    }
}

export const addNewsThunkCreator = (q, country, category, page) => async (dispatch) => {
    dispatch(togglePreloader('newsPaginationPreloader', true));
    const response = await newsAPI.getNews(q, country, category, page);
    const { articles, status } = response.data;
    if (status === 'ok') {
        dispatch(addNews(articles))
        dispatch(togglePreloader('newsPaginationPreloader', false))
    }
}

export default newsReducer