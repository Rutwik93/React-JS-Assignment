import { useState,useEffect } from 'react';
import {useSearchParams, useNavigate} from 'react-router-dom';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import {styled, Typography, Paper, Grid, Button} from '@mui/material';

function SuccessPage()
{
    var [orderID,setOrderID]=useState("");
    var [searchParams, setSearchParams] = useSearchParams();
    var navigate=useNavigate();
    
    useEffect(()=>{
        setOrderID(searchParams.get("orderID"));
    });

    var viewOrders=()=>{
        navigate("/orders", { replace: true });
    };

    return (
        <div>
            <div className="container">
                <div className="successOrder">
                <CheckCircleOutlineOutlinedIcon sx={{fontSize:"5rem", color:"green", display:"inline-block"}}/>
                <h2 sx={{float:"left"}}>Order Placed Successfully! Please Keep The Following Order ID For Future Reference.</h2>
                <h2>Order ID: {orderID}</h2>
                </div>
                <Button variant="contained" sx={{backgroundColor:"green", ':hover':{backgroundColor:"green"}}} onClick={()=>viewOrders()}>View My Orders</Button>
            </div>
        </div>
    );
}

export default SuccessPage;