import ReactPaginate from "react-paginate";
import React from "react";

import "./pagination.css";
import PropTypes from "prop-types";

const Pagination = props => {
  const { initialPage, pageCount, changePage } = props;
  return (
    <div className="pagination d-flex justify-content-center">
      <ReactPaginate
        previousLabel={"<"}
        nextLabel={">"}
        marginPagesDisplayed={1}
        pageRangeDisplayed={2}
        initialPage={initialPage - 1}
        pageCount={pageCount}
        onPageChange={changePage}
        disableInitialCallback
      />
    </div>
  );
};
Pagination.propTypes = {
  initialPage: PropTypes.number.isRequired,
  pageCount: PropTypes.number,
  changePage: PropTypes.func.isRequired
};
Pagination.defaultProps = {
  pageCount: 1
};

export default Pagination;
