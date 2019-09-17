import React from 'react';
import { connect } from 'react-redux';
import Music from './Music';
import { setTracksThunkCreator, addTrackThunkCreator } from '../../redux/reducers/music-reducer';

const MusicContainer = (props) => {
    return (
        <Music {...props}/>
    )
}

const mapStateToProps = (state) => {
    return {
        tracks: state.musicPage.tracks,
        nextRequest: state.musicPage.nextRequest,
        basicRequest: state.musicPage.basicRequest,
        searchActive: state.musicPage.searchActive,
        preloader: state.init.musicPreloader,
        paginationPreloader: state.init.musicPaginationPreloader,
    }
}

export default connect(mapStateToProps, { setTracksThunkCreator, addTrackThunkCreator })(MusicContainer)