import * as React from 'react';
import {AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Button, Tooltip, MenuItem} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { useNavigate } from 'react-router-dom';
import {signOut} from 'firebase/auth'
import auth from './Config';

import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';

function MainHeader()
{
    var navigate=useNavigate();
    const pages = ['Products', 'Pricing', 'Blog'];

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
  
    const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
    };
    
    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    };
  
    const handleCloseNavMenu = () => {
      setAnchorElNav(null);
    };
  
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };  

    React.useEffect(()=>{
      var token=localStorage.getItem('Auth Token');
      if(!token)
        navigate("../", { replace: true });
    });

    var logOutUser=()=>{
      localStorage.clear();
      signOut(auth);
    };

    return (
        <AppBar position="static">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
            <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                >
                <ShoppingCartCheckoutIcon sx={{ fontSize: 30, display: { xs: 'none', md: 'flex' } }} />
                </IconButton>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
              >
                E-Commerce
              </Typography>
    
              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <ShoppingCartCheckoutIcon sx={{fontSize: 30}}/>
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: 'block', md: 'none' },
                  }}
                >
                  {pages.map((page) => (
                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
              
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                {pages.map((page) => (
                  <Button
                    key={page}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    {page}
                  </Button>
                ))}
              </Box>
    
              <Box sx={{ flexGrow: 0 }}>
                
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Typography textAlign="center" sx={{color:"white", fontSize:"20px"}} mr={2}>{localStorage.getItem('Name')}</Typography>
                      <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                  </IconButton>                    
                </Tooltip>
              
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={handleCloseUserMenu}>
                      <Typography textAlign="center" onClick={() => logOutUser()}>Logout</Typography>
                  </MenuItem>
                  
                </Menu>
                
              </Box>

            </Toolbar>
          </Container>
        </AppBar>
      );
}

export default MainHeader;