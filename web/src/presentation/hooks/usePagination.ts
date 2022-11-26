import { useState } from 'react';

type Props = {
  initialPage: number;
  itemsPerPage: number;
};

export const usePagination = ({ initialPage, itemsPerPage }: Props) => {
  const [page, setPage] = useState(initialPage);
  const [total, setTotal] = useState(0);
  const perPage = itemsPerPage;

  function nextPage() {
    setPage(page + 1);
  }

  function reset() {
    setPage(0);
    setTotal(0);
  }

  return {
    nextPage,
    total,
    setTotal,
    perPage,
    page,
    reset
  };
};
