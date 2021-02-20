import React from 'react';
import Routes from './routes/routes';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getChampsData } from './libs';

function App() {
  getChampsData();

  return (
    <div className="App">
      <Routes />
    </div>
  );
}

export default App;
