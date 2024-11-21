import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import { Items, Pokemon, Pokemons } from './pages';
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Pokemons />} />
          <Route path="/items" element={<Items />} />
          <Route path="/pokemons" element={<Pokemons />} />
          <Route path="/pokemons/:name" element={<Pokemon />} />
        </Routes>
      </div>
    </Router>

  );
}

export default App;
