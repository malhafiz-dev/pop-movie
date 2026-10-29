import { useEffect, useState } from "react";
import { BoxMovies, Logo, Main, Navbar } from "./components/AppLayout";
import { ErrorMessage, Loader } from "./components/Feedback";
import MovieDetails from "./components/MovieDetails";
import MovieList from "./components/MovieList";
import { NumResults, Search } from "./components/MovieSearch";
import WatchedList from "./components/WatchedList";
import { searchMovies } from "./services/omdb";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  function handleSelectedMovieId(id) {
    setSelectedMovieId((selectedId) => (selectedId === id ? null : id));
  }

  function handleAddWatched(movie) {
    setWatched((currentWatched) => [...currentWatched, movie]);
  }

  function handleDeleteWatched(id) {
    setWatched((currentWatched) =>
      currentWatched.filter((movie) => movie.imdbID !== id),
    );
  }

  useEffect(() => {
    const controller = new AbortController();

    if (query.length < 3) {
      setMovies([]);
      setError("");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError("");

    async function loadMovies() {
      try {
        const searchResults = await searchMovies(query, controller.signal);
        setMovies(searchResults);
      } catch (requestError) {
        if (requestError.name === "AbortError") return;
        setError(requestError.message);
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    }

    loadMovies();
    return () => controller.abort();
  }, [query]);

  return (
    <>
      <Navbar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </Navbar>
      <Main>
        <BoxMovies>
          {isLoading && <Loader />}
          {error && <ErrorMessage message={error} />}
          {!isLoading && !error && !query.trim() && (
            <p className="empty-state">Silahkan cari movienya..</p>
          )}
          {!isLoading && !error && query.trim() && (
            <MovieList movies={movies} onSelectedId={handleSelectedMovieId} />
          )}
        </BoxMovies>
        <BoxMovies>
          {selectedMovieId ? (
            <MovieDetails
              selectedId={selectedMovieId}
              onCloseMovie={() => setSelectedMovieId(null)}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <WatchedList
              watched={watched}
              onDeleteWatched={handleDeleteWatched}
            />
          )}
        </BoxMovies>
      </Main>
    </>
  );
}
