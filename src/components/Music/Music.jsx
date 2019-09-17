import React from 'react';
import { reduxForm, Field } from 'redux-form';
import newsStyles from '../News/News.module.css';
import withPreloader from '../../hoc/Preloader';
import Pagination from '../../common/Pagination';
import Track from './Tracks/Track';
import styles from './Music.module.css';



const TracksBlock = ({ tracks }) => {
    return (
        <div className={styles.trackBlock}>
            {tracks.length > 0 && tracks.map((track, index) => <Track trackInfo={track} key={`${track.id}${index}`} />)}
        </div>
    )
}

const Music = ({ tracks, nextRequest, setTracksThunkCreator, basicRequest, addTrackThunkCreator, preloader, paginationPreloader, searchActive }) => {

    const Preloader = withPreloader('preloader')(TracksBlock);

    let MusicForm = ({ handleSubmit }) => {
        return <form onSubmit={handleSubmit}>
            <div className={newsStyles.searchBlock}>
                <Field component='input' name='trackName' className={newsStyles.search} />
            </div>
            <button className={newsStyles.searchBtn}>&#128269;</button>
        </form>
    }

    MusicForm = reduxForm({
        form: 'music'
    })(MusicForm);

    const formSubmit = ({ trackName }) => {
        trackName ? setTracksThunkCreator(basicRequest + `name=${trackName}`) : setTracksThunkCreator(basicRequest);
    }

    return (
        <div>
            <MusicForm onSubmit={formSubmit} />
            <div className={styles.tracksBlock}>
                <Preloader preloader={preloader} tracks={tracks} />
                {searchActive && tracks.length === 0 && <div><img src="http://newrbk.ru/bbcode/netu.jpg" alt=""/></div>}
            </div>
            {nextRequest && <Pagination action={addTrackThunkCreator} data={[nextRequest]} paginationPreloader={paginationPreloader} />}
        </div>
    )
}

export default Music