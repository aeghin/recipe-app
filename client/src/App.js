import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Auth } from './pages/Auth';
import { CreateRecipe } from './pages/CreateRecipe';
import { SavedRecipe } from './pages/SavedRecipe';
import { Navbar } from './components/Navbar';
function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/saved-recipes" element={<SavedRecipe />} />
          <Route path="/create-recipe" element={<CreateRecipe />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
