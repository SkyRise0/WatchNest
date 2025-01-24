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
    }
}