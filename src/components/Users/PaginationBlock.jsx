import React from 'react';
import style from './Users.module.css';

const PaginationBlock = ({ currentPage, pages, requestOnCurrentPage, pageCount }) => {

    const createPage = (page) => <span key={page} className={`${style.currentPage} ${(currentPage === page
        ? style.activePage : '')}`} onClick={() => { requestOnCurrentPage(page) }} >{page}</span>;

    const createEllipsis = () => <span className={`${style.currentPage} ${style.currentPage_ellipsis}`}>...</span>;

    const setPage = (condition) => pages.map( page => eval(condition) ? createPage(page) : false);

    return (
        <div className={style.paginationBlock}>
            {pageCount > 10
                ? currentPage < 3
                    ? <>
                        {setPage('page < 4')}
                        {createEllipsis()}
                        {setPage('page > pageCount - 2')}
                    </>
                    : currentPage === 3
                        ? <>
                            {setPage('page <= 4')}
                            {createEllipsis()}
                            {setPage('page > pageCount - 2')}
                        </>
                        : currentPage === 4
                            ? <>
                                {setPage('page <= 5')}
                                {createEllipsis()}
                                {setPage('page > pageCount - 2')}
                            </>
                            : (currentPage > 4 && currentPage < pageCount - 3)
                                ? <>
                                    {setPage('page === 1 || page === 2')}
                                    {createEllipsis()}
                                    {setPage('page == currentPage || page === currentPage + 1 || page == currentPage - 1')}
                                    {createEllipsis()}
                                    {setPage('page > pageCount - 2')}
                                </>
                                : <>
                                    {setPage('page === 1 || page === 2')}
                                    {createEllipsis()}
                                    {setPage('page === pageCount - 4 || page >= pageCount - 3')}
                                </>
                : pages.map(page => createPage(page))
            }
        </div>
    )
}

export default PaginationBlock