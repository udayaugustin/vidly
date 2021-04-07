import React, { Component } from "react";
import { Link } from "react-router-dom";
import auth from "../services/authService";
import Like from "./common/like";
import Table from "./common/table";

class MoviesTable extends Component {
  columns = [
    {
      path: "title",
      label: "Title",
      content: (m) => {
        if (this.props.user)
          return <Link to={`/movies/${m._id}`}>{m.title}</Link>;
        else return m.title;
      },
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: (m) => (
        <Like isLiked={m.liked} onLike={() => this.props.onLike(m)} />
      ),
    },
  ];

  deleteColumn = {
    key: "delete",
    content: (m) => {
      if (!this.props.user) return null;

      return (
        <button
          onClick={() => this.props.onDelete(m._id)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      );
    },
  };

  constructor() {
    super();
    const user = auth.getCurrentUser();
    if (user && user.isAdmin) this.columns.push(this.deleteColumn);
  }

  render() {
    const { movies, sortColumn, onSort } = this.props;

    return (
      <Table
        columns={this.columns}
        sortColumn={sortColumn}
        onSort={onSort}
        data={movies}
      />
    );
  }
}

export default MoviesTable;
