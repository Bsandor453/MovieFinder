import './App.css';
import { MovieList } from './components/MovieList.tsx';

function App() {
  return (
    <>
      <h1>Movies</h1>
      <section>
        <MovieList term={'batman'} />
      </section>
    </>
  );
}

export default App;
