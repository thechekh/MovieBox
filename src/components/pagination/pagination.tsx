import ReactPaginate from "react-paginate";
import React from "react";

import "./pagination.css";

interface IProps {
  initialPage: number;
  pageCount: number;
  changePage: (e: { selected: number }) => void;
}

const Pagination: React.FunctionComponent<IProps> = ({
  initialPage,
  pageCount,
  changePage
}: IProps) => {
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
