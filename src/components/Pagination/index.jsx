import React from 'react';
import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss';

export default function Pagination({ totalPages, onPageChange }) {
  return (
    <ReactPaginate
      className={styles.pagination}
      breakLabel="..."
      nextLabel=">"
      onPageChange={onPageChange}
      pageRangeDisplayed={4}
      pageCount={totalPages}
      previousLabel="<"
      renderOnZeroPageCount={null}
    />
  );
}
