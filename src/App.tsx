import React, { useEffect } from 'react';
import Routes from './routes/routes';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch } from 'react-redux';
import { fetchChamps, fetchRunes, fetchSpells } from './actions/initialDataAction';

function App() {

  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(fetchChamps());
  //   dispatch(fetchSpells());
  //   dispatch(fetchRunes())
  // }, [dispatch])

  return (
    <div className="App">
      <Routes />
    </div>
  );
}

export default App;
