import { useEffect, useState } from 'react';
import { Modal } from './components/modal';
import { createMovie, deleteMovie, getAllMovies, Movie, updateMovie } from './entities/movie';

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [editingMovieId, setEditingMovieId] = useState<number | null>(null); // состояние для отслеживания ID редактируемого фильма
  const [newName, setNewName] = useState(''); // состояние для хранения нового имени фильма
  const [modalIsOpen, setModalIsOpen] = useState(false);// модальное окно

  console.log({movies});

  useEffect(() => {
    getAllMovies().then((parsedData) => setMovies(parsedData))
  }, []);

  const handleEditClick = (movieId: number) => {
    setEditingMovieId(movieId);
  };

  const handleDeleteClick = (movieId: number) => {
    deleteMovie(movieId).then(() => getAllMovies().then((parsedData) => setMovies(parsedData)));
  };

  const handleOkClick = () => {
    if (editingMovieId && newName) {
      updateMovie({ editingMovieId, newName }).then(() => getAllMovies().then((parsedData) => setMovies(parsedData)));
      setEditingMovieId(editingMovieId);
      setNewName('');
    }

  };

  const [movieName, setMovieName] = useState<string>();

  const handleAddMovie = () => {
    if (movieName) {
      createMovie({ movieName }).then(() => getAllMovies().then((parsedData) => setMovies(parsedData as any)));

      setModalIsOpen(true);
    }
  }

  return (
    <div>
      {movies.map((movie) => (
        <div key={movie.id} className="movie">
          {movie.name}
          <button onClick={() => handleEditClick(movie.id)}>Редактировать</button>
          <button onClick={() => handleDeleteClick(movie.id)}>Удалить</button>
        </div>
      ))}
      {editingMovieId ? (
        <input value={newName} onChange={(e) => setNewName(e.target.value)} />
      ) : null}
      {editingMovieId && (
        <button onClick={handleOkClick}>OK</button>
      )}
      <div>
        <button onClick={() => setModalIsOpen(true)}>Добавить фильм</button>
        <Modal isOpen={modalIsOpen} setModalIsOpen={() => setModalIsOpen(false)}>
          <div>
            <h2>Добавить фильм</h2>
            <p>Введите название что бы добавить фильм </p>
            <input type='text' id="movieName" value={movieName} onChange={(e) => setMovieName(e.target.value)} />
            <button onClick={handleAddMovie}>Добавить фильм</button>
          </div>
        </Modal>
      </div>

    </div>

  );
}

export default App
