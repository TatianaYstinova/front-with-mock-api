import { Movie } from "../types";
import { BASE_ROUTE } from '../../../components/api';

export const getAllMovies = (): Promise<Movie[]> => fetch(`${BASE_ROUTE}/movies`).then((response) => response.json())