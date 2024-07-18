import { useEffect, useState } from 'react';
import Modal from 'react-modal';

interface Movie {
  id: number;
  name: string;
}

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [editingMovieId, setEditingMovieId] = useState<number | null>(null); // состояние для отслеживания ID редактируемого фильма
  const [newName, setNewName] = useState(''); // состояние для хранения нового имени фильма
  const [modalIsOpen, setModalIsOpen] = useState(false);// модальное окно


  useEffect(() => {
    fetch('http://localhost:777/movies').then((response) => response.json()).then((parsedData) => setMovies(parsedData as any))
  }, []);

  const handleEditClick = (movieId: number) => {
    setEditingMovieId(movieId);
  };

  const handleDeleteClick = (movieId: number) => {
    fetch(`http://localhost:777/movies/${movieId}`, {
      method: 'DELETE',
    }).then(() => fetch('http://localhost:777/movies').then((response) => response.json()).then((parsedData) => setMovies(parsedData as any)));
  };

  const handleOkClick = () => {
    if (editingMovieId && newName) {
      fetch(`http://localhost:777/movies/${editingMovieId}`, {
        method: 'PUT',
        body: JSON.stringify({ name: newName }),
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(() => fetch('http://localhost:777/movies').then((response) => response.json()).then((parsedData) => setMovies(parsedData as any)));
      setEditingMovieId(editingMovieId);
      setNewName('');
    }

  };

  const [movieName, setMovieName] = useState<string>();

  const handleAddMovie = () => {
    if (movieName) {
      fetch(`http://localhost:777/movies/`, {
        method: 'POST',
        body: JSON.stringify({ name: movieName }),
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(() => fetch('http://localhost:777/movies').then((response) => response.json()).then((parsedData) => setMovies(parsedData as any)));

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
        <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
          <div>
            <h2>Добавить фильм</h2>
            <p>Введите название что бы добавить фильм </p>
            <input type='text' id="movieName" value={movieName} onChange={(e) => setMovieName(e.target.value)} />
            <button onClick={handleAddMovie}>Добавить фильм</button>
            <button onClick={() => setModalIsOpen(false)}> закрыть модальное окно</button>
          </div>
        </Modal>
      </div>

    </div>

  );
}

export default App
