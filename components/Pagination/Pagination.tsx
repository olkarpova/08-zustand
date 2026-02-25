import ReactPaginate from "react-paginate";
import css from './Pagination.module.css';

interface PaginationProps {
    totalPages: number,
    currentPage: number,
    onPageChange: (page: number)=> void,
}


export default function Pagination({ totalPages, currentPage, onPageChange }:
    PaginationProps) {
    if (totalPages <= 1) {
        return null;
    }
    const handlePageClick = (event: { selected: number }) => {
        onPageChange(event.selected + 1);
    };
        
    return (
        <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={totalPages}
            previousLabel="<"
            renderOnZeroPageCount={null}
            forcePage={currentPage - 1}
            containerClassName={css.pagination}
            activeClassName={css.active}
        />
    )
}
