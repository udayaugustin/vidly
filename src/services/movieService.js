import http from "./httpService";

const apiEndPoint = "/movies";

function movieUrl(id) {
  return `${apiEndPoint}/${id}`;
}

export async function getMovies() {
  const { data: movies } = await http.get(apiEndPoint);
  return movies;
}

export async function getMovie(id) {
  return await http.get(movieUrl(id));
}

export async function saveMovie(movie) {
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    return await http.put(movieUrl(movie._id), body);
  }

  return await http.post(apiEndPoint, movie);
}

export async function deleteMovie(id) {
  await http.delete(movieUrl(id));
}
