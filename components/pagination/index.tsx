import React from 'react';

interface PaginationProps<T> {
  page: number;
  maxPage?: number;
  onClickNext: () => void;
  onClickPrev: () => void;
}

function Pagination<T extends object>({
  page,
  onClickPrev,
  onClickNext,
  maxPage,
}: PaginationProps<T>) {
  return (
    <div className="flex justify-center gap-3 m-5">
      <button onClick={onClickPrev} className="disabled:color-grey text-xl">
        {'<'}
      </button>
      <span>{page}</span>
      <button onClick={onClickNext} className="disabled:color-grey text-xl">
        {'>'}
      </button>
    </div>
  );
}

export default Pagination;
