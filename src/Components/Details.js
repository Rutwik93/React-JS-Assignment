import MainHeader from './MainHeader';
import { useState, useEffect } from 'react';
import {db} from './Config';
import {doc, getDoc} from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cartSlice';
import {useSearchParams} from 'react-router-dom';
import { styled, Typography, Paper, Grid, Button } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CircularProgress from '@mui/material/CircularProgress';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

function Details()
{
    var [details,setDetails]=useState({});
    var [loading,setLoading]=useState(true);
    var [counter, setCounter] = useState(1);
    var [searchParams, setSearchParams] = useSearchParams();
    var dispatch=useDispatch();

    useEffect(()=>{
        var myfun=async ()=>{
            const docRef = doc(db, "Products", searchParams.get("id"));
            const docSnap = await getDoc(docRef);
            setLoading(false);
            if (docSnap.exists()) 
            {
                setDetails({
                    id:docSnap.id,
                    ...docSnap.data()
                });
            }
        }
        myfun();
    },[]);

    var addItem=(id,details,counter)=>{
        dispatch(addToCart({id:id,data:details,quantity:counter}));
        toast.success("Item added to cart!",{position: toast.POSITION.BOTTOM_RIGHT});
    };

    var incrementValue=()=>{
        setCounter(counter+1);
    };

    var decrementValue=()=>{
        if(counter>1)
            setCounter(counter-1);
    };
    

    return (
        <>
            <MainHeader/>
            
            <div className="mainContainer">
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={4}>
                        <Item>
                            <img src={details.URL} style={{maxWidth:"100%"}}/>
                        </Item>
                    </Grid>
                    <Grid item xs={12} sm={12} md={8}>
                        <Item sx={{textAlign:"left"}}>
                            <Typography sx={{display:"inline-block"}} sx={{color:"#2C3333"}} variant="h4" gutterBottom component="div">
                                Name: {details.Name}
                            </Typography>    
                            <Typography variant="h4" sx={{color:"#2C3333"}} gutterBottom component="div">
                                Price: ₹{details.Price}
                            </Typography>  
                            <Typography variant="h5" sx={{color:"#2C3333"}} gutterBottom component="div">
                                Description: {details.Description}          
                            </Typography>   
                            <Typography sx={{display:"inline-block",float:"left"}} variant="h5" sx={{color:"#2C3333"}} gutterBottom component="div">
                            <div sx={{display:"inline-block", float:"right", border:"2px solid green"}}> 
                            Quantity: <Button variant="contained" onClick={decrementValue}>-</Button>
                                    <span className='quantityCounter'>{counter}</span>
                                <Button variant="contained" onClick={incrementValue}>+</Button>
                            </div>        
                            </Typography>          
                        </Item>
                        <Button variant="contained" sx={{float:"right", marginTop:"1rem"}} onClick={()=>{addItem(details.id,details,counter)}}>Add to Cart</Button>
                    </Grid>
                </Grid>
            </div>
            {loading?<div className="txtCenter"><CircularProgress /> Loading...</div>:null}
            <ToastContainer/>
        </>
    );
}

export default Details;