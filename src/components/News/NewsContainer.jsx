import React from 'react';
import { connect } from 'react-redux';
import News from './News';
import { setNewsThunkCreator, addNewsThunkCreator } from '../../redux/reducers/news-reducers';

const NewsContainer = (props) => {
    return (
        <News {...props}/>
    )
}

const mapStateToProps = (state) => {
    return {
        countries: state.newsPage.countries,
        categories: state.newsPage.categories,
        news: state.newsPage.news,
        totalResults: state.newsPage.totalResults,
        searchActive: state.newsPage.searchActive,
        preloader: state.init.newsPreloader,
        requestBody: state.newsPage.requestBody,
        paginationPreloader: state.init.newsPaginationPreloader,
    }
}

export default connect(mapStateToProps, {setNewsThunkCreator, addNewsThunkCreator})(NewsContainer)