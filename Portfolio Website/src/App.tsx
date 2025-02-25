import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import SquareCard from './components/cards/SquareCard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SquareCard />} />
      </Routes>
    </Router>
  );
}

export default App;
