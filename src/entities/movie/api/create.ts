import { BASE_ROUTE } from "../../../components/api";

interface CreateMovieParams {
    movieName: string;
}

export const createMovie = ({ movieName }: CreateMovieParams) => fetch(`${BASE_ROUTE}/movies/`, {
    method: 'POST',
    body: JSON.stringify({ name: movieName }),
    headers: {
        'Content-Type': 'application/json',
    },
});