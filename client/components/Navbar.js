//////////////// REACT / REDUX //////////////
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

///////////// COMPONENTS //////////////////
// import Profile from './User/Profile';
// import { Login, Signup } from "./AuthForm";

const Profile = () => null
const Login = () => null
const Signup = () => null
////////////////// LOGO ////////////////
const logo = '/logo/LB-Logo.png'

////////////// STORE ///////////////////

/////////////////// MATERIAL UI ///////////////////////////
import { AppBar, Toolbar, Typography, Button, Badge, IconButton, FormControl, InputLabel, NativeSelect, Tooltip, MenuItem, Menu, Dialog } from '@mui/material';
// import CreateIcon from '@mui/icons-material/Create';
import { Box } from '@mui/system';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const Navbar = () => {
  const isLoggedIn = useSelector(state => !!state.auth.id)
  const films = useSelector(state => state.films)
  const entries = useSelector(state => state.entries)
  const cart = useSelector(state => state.userCart)
  //const { brands } = useSelector(state => state)
//   let quantity = 0;
//   if (cart.orderitems) {
//     quantity = cart.orderitems.reduce((acc, item) => acc + item.quantity, quantity)
//   }

  //////////////// Login / Sigup Forms /////////////////////
  const [openLogin, setopenLogin] = useState(false);
  const [loginForm, setloginForm] = useState(false);

  const handleChangeForm = () => {
    setloginForm(!loginForm)
  }

  const handleLoginClose = () => {
    setloginForm(false)
    setopenLogin(false)
  }

  const handleLoginOpen = () => {
    setopenLogin(true)
  }

  return (
    <AppBar position="static" color='secondary' sx={{ boxShadow: 'none', borderBottom: 'solid 2px black' }}>
      <Toolbar>
        <Box sx={{ borderRight: 'solid 2px black', px: 2, py: 1 }} >
          <Button component={Link} to="/home" color="inherit">
            <img src={logo} width='200' />
          </Button>
        </Box>

        <Button component={Link} to="/films" color="inherit" sx={{ m: 1 }}>Newly Added Films</Button>

        {/* <Box sx={{ flexGrow: 1, textAlign: 'right' }}>
          <IconButton component={Link} to="/diary" size="large" aria-label="user entry" color="green">
            <Badge badgeContent={quantity} color="error">
              <CreateIcon />
            </Badge>
          </IconButton>
        </Box> */}

        {isLoggedIn ? (
          <>
            <Profile handleLoginClose={handleLoginClose} />
          </>
        ) : (
          <>
            <Box sx={{ textAlign: 'right' }}>
              <Button onClick={handleLoginOpen} color="inherit">Login</Button>
            </Box>
            <Dialog open={openLogin} onClose={handleLoginClose}>
              {loginForm ? (
                <Signup handleChangeForm={handleChangeForm} loginForm={loginForm} />
              ) : (
                <Login handleChangeForm={handleChangeForm} loginForm={loginForm} />
              )}
            </Dialog>
          </>
        )}
      </Toolbar>
    </AppBar >
  )
}

export default Navbar
