import React, { useEffect } from 'react';

interface PaginationProps<T> {
  page: number;
  onChangePage: (page: number) => void;
  maxPage?: number;
}

function Pagination<T extends object>({
  page,
  onChangePage,
  maxPage,
}: PaginationProps<T>) {
  const onClickPrevPage = () => {
    onChangePage(page - 1);
  };
  const onClickNextPage = () => {
    onChangePage(page + 1);
  };

  return (
    <div className="flex justify-center gap-3 m-5">
      <button
        onClick={onClickPrevPage}
        disabled={page === 1}
        className="disabled:color-grey text-xl"
      >
        {'<'}
      </button>
      <span>{page}</span>
      <button
        onClick={onClickNextPage}
        disabled={maxPage === page}
        className="disabled:color-grey text-xl"
      >
        {'>'}
      </button>
    </div>
  );
}

export default Pagination;
