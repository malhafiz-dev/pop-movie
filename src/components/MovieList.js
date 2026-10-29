function MovieItem({ movie, onSelectedId }) {
  return (
    <li onClick={() => onSelectedId(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>📅</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

export default function MovieList({ movies, onSelectedId }) {
  return (
    <ul className="list list-movies">
      {movies.map((movie) => (
        <MovieItem
          key={movie.imdbID}
          movie={movie}
          onSelectedId={onSelectedId}
        />
      ))}
    </ul>
  );
}
