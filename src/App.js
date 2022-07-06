import { useEffect, useState } from 'react';
import './App.css';
import Movie from './Components/Movie';
import Filter from './Components/Filter';
import { motion, AnimatePresence} from 'framer-motion';

function App() {
  const [popular, setPopular] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeGenre, setActiveGenre] = useState(0);

  useEffect(() =>{
    fetchPopular();
  }, []);

  const fetchPopular = async () => {
      const data = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=47c6f63e37d84ef2e6f5456e0f974c91&language=en-US&page=1');

      const movies = await data.json();
      setPopular(movies.results);
      setFiltered(movies.results)
  } 
  return (
    <div className="App">
     <h2>Movies Hub</h2>
    <Filter popular={popular} setFiltered={setFiltered} activeGenre={activeGenre} setActiveGenre={setActiveGenre} />
     <motion.div 
     layout 
     className="popular-movies">
        <AnimatePresence>
        {filtered.map((movie) => {
          return <Movie key={movie.id} movie={movie}/>
        })}
        </AnimatePresence>
     </motion.div>
    </div>
  );
}

export default App;
