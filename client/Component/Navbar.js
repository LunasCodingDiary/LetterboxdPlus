//////////////// REACT / REDUX //////////////
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

///////////// COMPONENTS //////////////////
import Profile from './User/Profile';
import { Login, Signup } from "./AuthForm";

////////////////// LOGO ////////////////
const logo = '/logo/JRL-Logo.png'

////////////// STORE ///////////////////

/////////////////// MATERIAL UI ///////////////////////////
import { AppBar, Toolbar, Typography, Button, Badge, IconButton, FormControl, InputLabel, NativeSelect, Tooltip, MenuItem, Menu, Dialog } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Box } from '@mui/system';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const Navbar = () => {
  const isLoggedIn = useSelector(state => !!state.auth.id)
  const products = useSelector(state => state.products)
  const cart = useSelector(state => state.userCart)
  const { brands } = useSelector(state => state)

  let quantity = 0;
  if (cart.orderitems) {
    quantity = cart.orderitems.reduce((acc, item) => acc + item.quantity, quantity)
  }

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


  //////// User Drop Down Menu ////////////////
  const handleBrand = (evt) => {
    setBrandMenu(evt.currentTarget);
  }

  const handleCloseBrand = () => {
    setBrandMenu(null);
  };

  const [brandMenu, setBrandMenu] = useState(null);
  const openBrand = Boolean(brandMenu);


  //////// Category Drop Down Menu ////////////////
  const handleCategory = (evt) => {
    setCategoryMenu(evt.currentTarget);
  }

  const handleCloseCategory = () => {
    setCategoryMenu(null);
  };

  const [categoryMenu, setCategoryMenu] = useState(null);
  const openCategory = Boolean(categoryMenu);

  const categories = Array.from(new Set(products.map(product => product.category)))


  return (
    <AppBar position="static" color='secondary' sx={{ boxShadow: 'none', borderBottom: 'solid 2px black' }}>
      <Toolbar>
        <Box sx={{ borderRight: 'solid 2px black', px: 2, py: 1 }} >
          <Button component={Link} to="/home" color="inherit">
            <img src={logo} width='120' />
          </Button>
        </Box>

        <Button component={Link} to="/products" color="inherit" sx={{ m: 1 }}>All Products</Button>

        <Tooltip title="Select Brand">
          <Button onClick={handleBrand} color="inherit" sx={{ m: 1 }}>Brands <ArrowDropDownIcon size='small' color="primary" /> </Button>
        </Tooltip>

        <Menu
          anchorEl={brandMenu}
          open={openBrand}
          onClose={handleCloseBrand}
          onClick={handleCloseBrand}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          {brands.map(brand => (
            < MenuItem component={Link} to={`/brands/${brand.id}`} key={brand.id}>
              {brand.name}
            </MenuItem>
          ))}
        </Menu>

        <Tooltip title="Select Category">
          <Button onClick={handleCategory} color="inherit" sx={{ m: 1 }}>Categories <ArrowDropDownIcon size='small' color="primary" /> </Button>
        </Tooltip>

        <Menu
          anchorEl={categoryMenu}
          open={openCategory}
          onClose={handleCloseCategory}
          onClick={handleCloseCategory}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          {categories.map(category => (
            < MenuItem component={Link} to={`/category/${category}`} key={category}>
              {category}
            </MenuItem>
          ))}
        </Menu>


        <Box sx={{ flexGrow: 1, textAlign: 'right' }}>
          <IconButton component={Link} to="/cart" size="large" aria-label="user cart" color="inherit">
            <Badge badgeContent={quantity} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Box>

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
//////////////// REACT / REDUX //////////////
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

///////////// COMPONENTS //////////////////
import Profile from './User/Profile';
import { Login, Signup } from "./AuthForm";

////////////////// LOGO ////////////////
const logo = '/logo/JRL-Logo.png'

////////////// STORE ///////////////////

/////////////////// MATERIAL UI ///////////////////////////
import { AppBar, Toolbar, Typography, Button, Badge, IconButton, FormControl, InputLabel, NativeSelect, Tooltip, MenuItem, Menu, Dialog } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Box } from '@mui/system';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const Navbar = () => {
  const isLoggedIn = useSelector(state => !!state.auth.id)
  const products = useSelector(state => state.products)
  const cart = useSelector(state => state.userCart)
  const { brands } = useSelector(state => state)

  let quantity = 0;
  if (cart.orderitems) {
    quantity = cart.orderitems.reduce((acc, item) => acc + item.quantity, quantity)
  }

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


  //////// Brand Drop Down Menu ////////////////
  const handleBrand = (evt) => {
    setBrandMenu(evt.currentTarget);
  }

  const handleCloseBrand = () => {
    setBrandMenu(null);
  };

  const [brandMenu, setBrandMenu] = useState(null);
  const openBrand = Boolean(brandMenu);


  //////// Category Drop Down Menu ////////////////
  const handleCategory = (evt) => {
    setCategoryMenu(evt.currentTarget);
  }

  const handleCloseCategory = () => {
    setCategoryMenu(null);
  };

  const [categoryMenu, setCategoryMenu] = useState(null);
  const openCategory = Boolean(categoryMenu);

  const categories = Array.from(new Set(products.map(product => product.category)))


  return (
    <AppBar position="static" color='secondary' sx={{ boxShadow: 'none', borderBottom: 'solid 2px black' }}>
      <Toolbar>
        <Box sx={{ borderRight: 'solid 2px black', px: 2, py: 1 }} >
          <Button component={Link} to="/home" color="inherit">
            <img src={logo} width='120' />
          </Button>
        </Box>

        <Button component={Link} to="/products" color="inherit" sx={{ m: 1 }}>All Products</Button>

        <Tooltip title="Select Brand">
          <Button onClick={handleBrand} color="inherit" sx={{ m: 1 }}>Brands <ArrowDropDownIcon size='small' color="primary" /> </Button>
        </Tooltip>

        <Menu
          anchorEl={brandMenu}
          open={openBrand}
          onClose={handleCloseBrand}
          onClick={handleCloseBrand}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          {brands.map(brand => (
            < MenuItem component={Link} to={`/brands/${brand.id}`} key={brand.id}>
              {brand.name}
            </MenuItem>
          ))}
        </Menu>

        <Tooltip title="Select Category">
          <Button onClick={handleCategory} color="inherit" sx={{ m: 1 }}>Categories <ArrowDropDownIcon size='small' color="primary" /> </Button>
        </Tooltip>

        <Menu
          anchorEl={categoryMenu}
          open={openCategory}
          onClose={handleCloseCategory}
          onClick={handleCloseCategory}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          {categories.map(category => (
            < MenuItem component={Link} to={`/category/${category}`} key={category}>
              {category}
            </MenuItem>
          ))}
        </Menu>


        <Box sx={{ flexGrow: 1, textAlign: 'right' }}>
          <IconButton component={Link} to="/cart" size="large" aria-label="user cart" color="inherit">
            <Badge badgeContent={quantity} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Box>

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
