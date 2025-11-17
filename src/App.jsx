
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import CarList from './components/CarList';
import Plans from './components/Plans';
import SuccessScreen from './pages/Success/SuccessScreen';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<><Header /><main className="main-content"><CarList /></main></>} />
          <Route path="/plans" element={<><Header /><main className="main-content"><Plans /></main></>} />
          <Route path="/success" element={<SuccessScreen />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
