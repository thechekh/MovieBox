import ReactPaginate from "react-paginate";
import React from "react";

import './pagination.css'

const Pagination = (props) => {
    return (
        <div className="pagination d-flex justify-content-center">
            <ReactPaginate
                previousLabel={'<'}
                nextLabel={'>'}
                marginPagesDisplayed={1}
                pageRangeDisplayed={2}
                initialPage={props.initialPage - 1}
                pageCount={props.pageCount}
                onPageChange={props.changePage}
                disableInitialCallback={ true }
            />
        </div>
    );
};

export default Pagination;
