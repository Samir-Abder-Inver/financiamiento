
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import CarList from './components/CarList';
import Plans from './components/Plans';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="main-content"> {/* Añadida clase aquí */}
          <Routes>
            <Route path="/" element={<CarList />} />
            <Route path="/plans" element={<Plans />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
