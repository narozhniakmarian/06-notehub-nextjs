import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";
import clsx from "clsx";

interface PaginationProps {
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
}

export default function Pagination({
  totalPages,
  page,
  setPage,
}: PaginationProps) {
  return (
    <ReactPaginate
      pageCount={totalPages}
      pageRangeDisplayed={3}
      marginPagesDisplayed={1}
      onPageChange={({ selected }) => setPage(selected + 1)}
      forcePage={page - 1}
      containerClassName={css.pagination}
      activeClassName={css.active}
      disabledClassName={clsx(css.disabled, css.noHover)}
      previousLabel="←"
      nextLabel="→"
    />
  );
}
