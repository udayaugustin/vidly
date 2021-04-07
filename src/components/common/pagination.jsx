import _ from "lodash";
import PropTypes from "prop-types";
import React, { Component } from "react";

class Pagination extends Component {
  state = {};
  render() {
    const { currentPage, onPageChange, itemsCount, pageSize } = this.props;
    const pagesCount = Math.ceil(itemsCount / pageSize);

    if (pagesCount === 1) return null;

    const pages = _.range(1, pagesCount + 1);

    return (
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          {pages.map((p) => {
            return (
              <li
                key={p}
                className={p === currentPage ? "page-item active" : "page-item"}
                onClick={() => onPageChange(p)}
              >
                <a className="page-link">{p}</a>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
};

export default Pagination;
