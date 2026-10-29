# Pop Movie

Pop Movie is a React application for discovering movies with the [OMDb API](https://www.omdbapi.com/), viewing movie details, and keeping a personal list of watched movies with ratings.

This project was built as a hands-on React portfolio project, with a focus on reusable components, API integration, and managing application state.

## Features

- Search for movies by title
- View movie details, including the plot, cast, genre, runtime, and IMDb rating
- Rate movies and add them to a watched list
- Review watched movies with summary statistics
- Remove movies from the watched list
- Loading and error states for API requests
- Scrollable movie lists

## Tech Stack

- React
- JavaScript
- CSS
- OMDb API

## Getting Started

### Prerequisites

- Node.js and npm
- An API key from [OMDb API](https://www.omdbapi.com/apikey.aspx)

### Installation

1. Clone the repository and move into the project directory.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the project root and add your OMDb API key:

   ```env
   REACT_APP_OMDB_API_KEY=YOUR_API_KEY
   ```

   Replace `YOUR_API_KEY` with your own key. Do not commit `.env`; it is excluded by `.gitignore`.

4. Start the development server:

   ```bash
   npm start
   ```

The app will be available at `http://localhost:3000`.

## Production Build

Create an optimized production build with:

```bash
npm run build
```

The generated static files are written to the `build` directory.

## Notes

- The watched list is currently stored in React state and is cleared when the page is reloaded.
- Create React App embeds `REACT_APP_*` variables in the client-side bundle. The OMDb key can therefore be seen by users of a deployed site. For a public production deployment, consider routing API requests through a backend or serverless function and storing the key server-side.
