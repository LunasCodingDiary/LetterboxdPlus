///////////////////////LIBRARY ///////////////////////
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";

/////////////////////// COMPONENT AND PAGES  /////////////////////
import Home from "./components/Home/Home";
// import Directors from "./components/films/Directors";
// import Singlefilm from "./components/films/Singlefilm";
import Films from "./components/Films/Films";
import SingleFilm from "./components/Films/SingleFilm";
// import Category from "./components/Genres/Genres";
import Profile from "./components/User/Profile/Profile";
import Diary from "./components/User/Diary/Table";
import Watchlist from "./components/User/Watchlist";
//Admin Functions to be added later 
// import AdminFilms from "./components/Admin/Films/AdminFilmsTable";
// import FilmCreateForm from "./components/Admin/Films/FilmCreateForm";
// import FilmUpdateForm from "./components/Admin/Films/FilmUpdateForm";
// import AdminUsers from "./components/Admin/Users/AdminUsersTable";
// import UserCreateForm from "./components/Admin/Users/UserCreateForm";
// import UserUpdateForm from "./components/Admin/Users/UserUpdateForm";


///////////////// STORE ////////////////////////
import { fetchDiaries, me } from "./store";

const Routes = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => !!state.auth.id);
  //const { isAdmin } = useSelector((state) => state.auth);

  useEffect(() => { //hook for dispatch
    dispatch(me());
    dispatch(fetchDiaries());

    if (isLoggedIn) {
      dispatch(fetchDiaries());
    }
  }, [isLoggedIn]);

  return (
    <div>
      {isLoggedIn ? (
        <>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/home" component={Home} />
            {/* <Route exact path="/directors" component={directors} />
            <Route path="/directors/:directorId" component={SingleDirector} /> */}
              {/* <Route path="/genre/:genreId" component={Genre} /> */}
            <Route exact path="/films" component={Films} />
            <Route path="/films/:filmId" component={SingleFilm} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/diary" component={Diary} />
            <Route exact path="/watchlist" component={Watchlist} />
           
            <Redirect to="/home" />
          </Switch>
        </>
      ) : (
        <>
          <Switch>
            <Route path="/home" component={Home} />
            <Route exact path="/" component={Home} />
            {/* <Route exact path="/directors" component={Directors} />
            <Route path="/films/:directorId" component={SingleDirector} /> */}
            <Route exact path="/Films" component={Films} />
            <Route path="/Films/:FilmId" component={SingleFilm} />
            {/* <Route path="/genre/:genred" component={Genre} /> */}
          </Switch>
        </>
      )}
    </div>
  );
};

////////////////////// EXPORT COMPONENT ///////////////////////////////
export default Routes;
