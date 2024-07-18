import { BASE_ROUTE } from "../../../components/api";

export const deleteMovie = (movieId:number) =>fetch(`${BASE_ROUTE}/movies/${movieId}`, {
    method: 'DELETE',
  })