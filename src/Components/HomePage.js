import {Card, CardActions, CardContent, CardMedia, Button, Typography} from '@mui/material';
import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MainHeader from './MainHeader';
import Categories from '../Data/Categories';

function HomePage()
{
    var [searchParams, setSearchParams] = useSearchParams();
    var navigate=useNavigate();

    function handleRedirect(name)
    {
        navigate("/listing?Category="+name);
    };
    
    var components=Categories.map(item => {
        return (
            <Card key={item.id} sx={{ maxWidth: 345, margin:"3% 3% 0% 3%", display:"inline-block" }}>
            <CardMedia
                component="img"
                alt="green iguana"
                height="140"
                image={item.URL}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                {item.Name}
                </Typography>
            </CardContent>
            <CardActions style={{float:"right"}}>
                <Button size="small" onClick={()=>{handleRedirect(item.Name)}}>View Category</Button>
            </CardActions>
        </Card>
        )

    });
    
    useEffect(()=>{
        if(searchParams.get("signup"))
            toast.success("Registration Was Successful!",{position: toast.POSITION.BOTTOM_RIGHT});
    });

    return (
        <>
            <MainHeader/>
            <ToastContainer/>

            <div style={{textAlign:"center"}}>
            {components}
            </div>
            
        </>
    );
}

export default HomePage;