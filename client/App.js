import { CssBaseline, ThemeProvider } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { HashRouter } from 'react-router-dom'
import theme from "./theme";

import Navbar from "./components/Navbar";
import Routes from "./Routes";
import Footer from "./components/Footer";

import { fetchFilms } from "./store/films";
import { fetchDirectors } from "./store/directors";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFilms());
    dispatch(fetchDirectors());
  }, []);

  return (
    // <ThemeProvider theme={theme}>
    //   <CssBaseline />
    <div> 
       <HashRouter history={history}>
        <Navbar />
        <Routes />
        <Footer />
        {/* <App /> */}
       </HashRouter>
      
    </div>
    // </ThemeProvider>
  );
};

export default App;
