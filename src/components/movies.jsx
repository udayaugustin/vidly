import React, { Component } from "react";
import { toast } from "react-toastify";
import _ from "lodash";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";
import logger from "../services/logService";
import SearchBox from "./common/searchBox";
import { paginate } from "../utils/paginate";
import { getGenres } from "../services/genreService";
import { getMovies, deleteMovie } from "../services/movieService";

class Movies extends Component {
  state = {
    movies: [],
    pageSize: 4,
    currentPage: 1,
    genres: [],
    selectedGenre: {},
    searchQuery: "",
    sortColumn: { path: "title", order: "asc" },
  };

  async componentDidMount() {
    const { data: genreList } = await getGenres();
    const genres = [{ _id: "", name: "All Genres" }, ...genreList];
    this.setState({ movies: await getMovies(), genres });
  }

  deleteItem = (movieId) => {
    const origianlMovies = this.state.movies;
    const movies = this.state.movies.filter((m) => m._id !== movieId);
    this.setState({ movies });

    try {
      deleteMovie(movieId);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This movie already deleted");

      this.setState({ movies: origianlMovies });
      logger.log(ex);
    }
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movie };
    movies[index].liked = !movie.liked;

    this.setState({ movies });
  };

  handlePageChange = (currentPage) => {
    this.setState({ currentPage });
  };

  handleItemSelected = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPaginated = () => {
    const {
      movies: allMovies,
      currentPage,
      pageSize,
      selectedGenre,
      sortColumn,
      searchQuery,
    } = this.state;

    let filtered = allMovies;

    if (searchQuery !== "")
      filtered = allMovies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id)
      filtered =
        selectedGenre && selectedGenre._id
          ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
          : allMovies;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  handleCreateMovie = () => {
    this.props.history.push("/movies/new");
  };

  handleSearch = (query) => {
    this.setState({
      selectedGenre: {},
      searchQuery: query,
      currentPage: 1,
    });
  };

  render() {
    const {
      movies: allMovies,
      currentPage,
      pageSize,
      genres,
      selectedGenre,
      sortColumn,
      searchQuery,
    } = this.state;

    const { length: count } = allMovies;
    //if (count === 0) return <p>There are no movies in DB</p>;

    const { user } = this.props;

    const { totalCount, data: movies } = this.getPaginated();

    return (
      <React.Fragment>
        <div className="row">
          <div className="col-3">
            <ListGroup
              items={genres}
              onItemSelect={this.handleItemSelected}
              selectedItem={selectedGenre}
            />
          </div>
          <div className="col-9">
            {user && (
              <button
                onClick={this.handleCreateMovie}
                className="btn btn-primary"
                style={{ marginBottom: 20 }}
              >
                New Movie
              </button>
            )}

            <p>Showing {totalCount} movies in the database.</p>
            <SearchBox name="search" onChange={this.handleSearch} />
            <MoviesTable
              movies={movies}
              sortColumn={sortColumn}
              onLike={this.handleLike}
              onDelete={this.deleteItem}
              onSort={this.handleSort}
              user={user}
            />
            <Pagination
              itemsCount={totalCount}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Movies;
