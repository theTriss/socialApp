import React from 'react';
import { reduxForm, Field } from 'redux-form';
import styles from './News.module.css';
import NewsItem from './NewsItem/NewsItem';
import withPreloader from '../../hoc/Preloader';
import Pagination from '../../common/Pagination';


const NewsBlock = ({ news }) => {
    return (
        news.map(item => <NewsItem newsItem={item} key={item.title} />)
    )
}

const News = ({ countries, categories, news, setNewsThunkCreator, totalResults, preloader, requestBody: { q, country, category, page },
    addNewsThunkCreator, paginationPreloader, searchActive }) => {

    const Preloader = withPreloader('preloader')(NewsBlock);

    const formSubmit = ({ search, country, category }) => {
        setNewsThunkCreator(search, country, category);
    }

    let NewsForm = ({ handleSubmit }) => {
        return (
            <form onSubmit={handleSubmit}>
                <div className={styles.searchBlock}>
                    <label>
                        <Field component='input' name='search' type='text' className={styles.search}></Field>
                    </label>
                </div>
                <div className={styles.searchParamBlock}>
                    <div className={styles.searchParam}>
                        <span className={styles.title}>Country:</span>
                        <Field component='select' name='country' className={`${styles.select} ${styles.selectCountry}`}>
                            {countries.map(({ id, country }) => <option key={id} value={country}>{country}</option>)}
                        </Field>
                    </div>
                    <div className={styles.searchParam}>
                        <span className={styles.title}>Category:</span>
                        <Field component='select' name='category' className={`${styles.select} ${styles.selectCategory}`}>
                            {categories.map(({ id, category }) => <option key={id} value={category}>{category}</option>)}
                        </Field>
                    </div>
                </div>
                <button className={styles.searchBtn}>&#128269;</button>
            </form>
        )
    }

    NewsForm = reduxForm({
        form: 'news',
        initialValues: {
            country: 'ua',
            category: 'sports'
        }
    })(NewsForm)

    return (
        <div>
            <NewsForm onSubmit={formSubmit} />
            <div>
                <Preloader news={news} preloader={preloader}/>
                {searchActive && news.length === 0 && <div style={{ display: 'flex', justifyContent: 'center' }}><img src="http://newrbk.ru/bbcode/netu.jpg" alt=""/></div> }
            </div>
            <div>
                {(news.length > 0 && news.length < totalResults)
                    && <Pagination action={addNewsThunkCreator} data={[q, country, category, page]}  paginationPreloader={paginationPreloader} />
                }
            </div>
        </div>
    )
}

export default News;