import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import {useState,useEffect} from "react";
import Header from "./Components/Header";
import LogOut from "./Routes/LogIn";
import Movie from "./Routes/Movie";
import Search from "./Routes/Search";
import TvSeries from "./Routes/Series";
import { authService } from "./Fbase/fbase";
import "./App.css"

export interface Hello{
  isLoggedIn: boolean;
}

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn]:any = useState(authService.currentUser);
  
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if(user){
        setIsLoggedIn(true);
      }else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  })
  setInterval(()=>{
    console.log(authService.currentUser?.displayName);

  },2000)

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Header />
      <Routes>
      {isLoggedIn && init ? 
        <>
        <Route path="/" element={<Movie />}>
          <Route path="movies/:movieId" element={<Movie />} />
        </Route>
        <Route path="/tv" element={<TvSeries />}>
          <Route path=":tv_id" element={<TvSeries />} />
        </Route>
        <Route path="/search" element={<Search />}>
          <Route path="movie/:movieId" element={<Search />} />
          <Route path="tv/:tv_id" element={<Search />} />
        </Route>
        </> : <Route path="*" element={<LogOut/>}>
        </Route>}
      </Routes>
    </BrowserRouter>
    )
}

export default App;