import React from "react";
import styled from "styled-components";

interface PaginationProps<T> {
  page: number;
  maxPage?: number;
  onClickNext: () => void;
  onClickPrev: () => void;
  onClickPage: (index: number) => void;
}

function Pagination<T extends object>({
  page,
  onClickPrev,
  onClickNext,
  onClickPage,
  maxPage,
}: PaginationProps<T>) {
  const onClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (e.target instanceof HTMLButtonElement) {
      if (e.target.dataset.index) {
        onClickPage(Number(e.target.dataset.index));
      }
    }
  };

  if (!maxPage) return null;
  return (
    <PaginationContainer>
      <button onClick={onClickPrev} className="first" disabled={page === 1}>
        {"<"}
      </button>
      <div className="pageButtonContainer" onClick={onClick}>
        {Array.from({ length: maxPage }, (_, index) => index + 1).map((v) => (
          <button data-index={v} key={v} className={v === page ? "active" : ""}>
            {v}
          </button>
        ))}
      </div>
      <button onClick={onClickNext} className="end" disabled={page === maxPage}>
        {">"}
      </button>
    </PaginationContainer>
  );
}

export default Pagination;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  /* gap: 10px; */
  margin: 20px;

  button {
    min-width: 30px;
    height: 30px;
    font-size: 15px;
    text-align: center;
    border-radius: 30px;
    font-weight: bold;
    margin: 5px;
    &:disabled {
      color: gray;
    }
    &.active {
      color: white;
      background: #3b8ef5;
    }
  }

  .first,
  .end {
    font-size: 18px;
  }
`;
