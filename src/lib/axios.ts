import axios from "axios"

export const api = {
    getCurrentUser: async () => {
        const { data } = await axios.get("/api/get-current-user");
        return data;
    },
    getMoviesPopular: async () => {
        const { data } = await axios.get('/api/get-movies-popular');
        return data;
    },
    getMoviesSearch: async (movieTitle: string) => {
        const { data } = await axios.get("/api/search-movies/" + movieTitle);
        return data;
    },
    getMovieFromId: async (movieId: string) => {
        const { data } = await axios.get("/api/get-movie-details/" + movieId);
        return data;
    },
    addToWatchList: async (movieData:{ title: string, id: number, poster_path: string}) => {
        const { data } = await axios.post("/api/add-to-watchlist", movieData);
        return data;
    },
    addToFavourte: async (movieData:{ title: string, id: number, poster_path: string}) => {
        const { data } = await axios.post("/api/add-to-favourites", movieData);
        return data;
    },
    deleteFromWatchList: async (movieId: string) => {
        const { data } = await axios.delete("/api/delete-watchList-movie/" + movieId);
        return data;
    },
    deleteFromFavourites: async (movieId: string) => {
        const { data } = await axios.delete("/api/delete-favourite-movie/" + movieId);
        return data;
    },
    createReview: async ( rating: { title: string, rating: Number}) => {
        const { data } = await axios.post("/api/create-review", rating);
        return data;
    },
    getReviews: async (userId: string) => {
        const { data } = await axios.get("/api/get-review/" + userId);
        return data;
    }
}