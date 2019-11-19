import ReactPaginate from "react-paginate";
import React from "react";

import "./pagination.css";

interface IProps {
  initialPage: number;
  pageCount: number;
  changePage: (selected: any) => void;
}

const Pagination: React.FunctionComponent<IProps> = props => {
  // eslint-disable-next-line react/prop-types
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

export default Pagination;
