const API_KEY = process.env.REACT_APP_OMDB_API_KEY;

async function fetchFromOmdb(params, signal) {
  if (!API_KEY) {
    throw new Error("OMDb API key is not configured.");
  }

  const searchParams = new URLSearchParams({
    ...params,
    apikey: API_KEY,
  });
  const response = await fetch(`https://www.omdbapi.com/?${searchParams}`, {
    signal,
  });

  if (!response.ok) {
    throw new Error("Unable to load movies from OMDb.");
  }

  const data = await response.json();
  if (data.Response === "False") {
    throw new Error(data.Error);
  }

  return data;
}

export async function searchMovies(query, signal) {
  const data = await fetchFromOmdb({ s: query }, signal);
  return data.Search;
}

export function getMovieDetails(movieId, signal) {
  return fetchFromOmdb({ i: movieId }, signal);
}
