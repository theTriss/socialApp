import React from 'react';
import styles from './Track.module.css';

const Track = ({ trackInfo: { name, audio, artist_name, image } }) => {
    return (
        <div className={styles.track}>
            <div className={styles.track__img}>
                <img src={image ? image : 'https://www.viser.edu.rs/images/no_photo.jpeg'} alt=""/>
            </div>
            <div className={styles.track__name}>{`${artist_name} - ${name}`}</div>
            <audio src={audio} controls className={styles.track__audio}></audio>
        </div>
    )
}

export default Track;