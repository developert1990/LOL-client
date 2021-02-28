import React, { useEffect, useState } from 'react';
import Routes from './routes/routes';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getChampsData } from './libs';
import { useDispatch, useSelector } from 'react-redux';
import { initialAppStateType } from './store';
import { TokenExpMessage } from './components';
import { refresh, signout } from './actions/userAction';

import firebase from 'firebase';
import { firebaseConfig } from './libs/firebase';


function App() {
  getChampsData();
  const { userInfo } = useSelector((state: initialAppStateType) => state.userStore);
  const [open, setOpen] = useState<boolean>(false);
  const dispatch = useDispatch();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCloseAndLogOut = () => {
    setOpen(false);
    dispatch(signout());
  };

  const handleCloseAndRefreshToken = async () => {
    setOpen(false);
    dispatch(refresh());
  };

  useEffect(() => {
    console.log('토큰 리프레시 하는 유즈 이팩 ==> : ', userInfo)
    if (userInfo) {
      const timeOut = setTimeout(() => {

        userInfo && handleClickOpen();
        // 토큰 유지시간.
      }, 1000 * (userInfo.tokenExp as number));
      return () => {
        clearTimeout(timeOut);
      }
    }


  }, [userInfo]);

  useEffect(() => {
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }, [])



  return (
    <div className="App">
      <Routes />
      <TokenExpMessage open={open} setOpen={setOpen} handleCloseAndLogOut={handleCloseAndLogOut} handleCloseAndRefreshToken={handleCloseAndRefreshToken} />
    </div>
  );
}

export default App;
