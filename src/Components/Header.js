import {Button, AppBar, Typography, Box, Toolbar} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { useNavigate } from "react-router-dom";

function Header()
{
    let navigate = useNavigate();

    function handleData() 
    {
        if(window.location.pathname==='/')
            navigate("../signup", { replace: true });
        else if(window.location.pathname==='/signup')
            navigate("../", { replace: true });
    }    

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                >
                <ShoppingCartCheckoutIcon sx={{ fontSize: 30 }} />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    E-Commerce
                </Typography>
                <Button color="inherit" onClick={handleData}>{window.location.pathname==='/'?"Signup":"Login"}</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Header;