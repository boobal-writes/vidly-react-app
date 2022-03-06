import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

const Pagination = ({
  pageSize,
  totalItems,
  onPageChange,
  currentPageNumber,
}) => {
  const totalPages = Math.ceil(totalItems / pageSize);
  if (totalPages === 1) return null;
  const pageNumbers = _.range(1, totalPages + 1);
  return (
    <ul className="pagination">
      {pageNumbers.map((pageNumber) => (
        <li
          key={pageNumber}
          className={
            "page-item" + (pageNumber == currentPageNumber ? " active" : "")
          }
          onClick={() => onPageChange(pageNumber)}
        >
          <a className="page-link">{pageNumber}</a>
        </li>
      ))}
    </ul>
  );
};

Pagination.propTypes = {
  pageSize: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  currentPageNumber: PropTypes.number.isRequired,
};

export default Pagination;
