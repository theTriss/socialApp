import React from 'react';
import styles from './Pagination.module.css';
import Preloader from './Preloader';

const Pagination = ({ action, data, paginationPreloader }) => {
    return (
        <div className={styles.paginationBlock}>
            <div onClick={() => { action(...data) }}
                className={styles.pagination}>{paginationPreloader ? <Preloader /> : String.fromCharCode(0xD83E, 0xDC47)}
            </div>
        </div>
    )
}

export default Pagination;