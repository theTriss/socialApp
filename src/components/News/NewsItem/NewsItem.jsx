import React from 'react';
import styles from './NewsItem.module.css'

const NewsItem = ({newsItem: { title, urlToImage, publishedAt, description, url, author }}) => {

    const date = publishedAt.split('T');

    return (
        <div className={styles.news}>
            <div className={styles.newsItem}>
                <h3 className={styles.newsItem__title}>{title}</h3>
                <img src={urlToImage} alt="" className={styles.newsItem__img}/>
                <div className={styles.newsItem__date}>{`${date[0]} ${date[1].substr(0,5)}`}</div>
                <div className={styles.newsItem__description}>{description}</div>
                <div className={styles.newsItem__about}>
                    <div className={styles.newsItem__author}>{author}</div>
                    <div className={styles.newsItem__continue}><a href={url} target='_blanc'>Продолжить чтение</a></div>
                </div>
            </div>
        </div>
    )
}

export default NewsItem