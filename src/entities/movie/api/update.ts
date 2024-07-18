import { BASE_ROUTE } from "../../../components/api";

interface UpdateMovieParams {
    editingMovieId: number;
    newName: string;
}

export const updateMovie = ({ editingMovieId, newName }: UpdateMovieParams) => fetch(`${BASE_ROUTE}/movies/${editingMovieId}`, {
    method: 'PUT',
    body: JSON.stringify({ name: newName }),
    headers: {
        'Content-Type': 'application/json',
    },
})