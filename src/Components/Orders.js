import MainHeader from "./MainHeader";
import { useState, useEffect } from 'react';
import {db} from './Config';
import {collection, query, where, getDocs} from 'firebase/firestore';
import {styled, Typography, Paper, Grid, Button} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

var Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

function Orders()
{
    var Orders=[];
    var [orders,setOrders]=useState([]);
    var [loading,setLoading]=useState(true);

    useEffect(()=>{
        var myfun=async ()=>{
            var q = await query(collection(db, "Orders"), where("UID", "==", localStorage.getItem('UID')));
            var results=await getDocs(q); 
            setLoading(false);
            results.forEach(item => {
                Orders.push({
                    id:item.id,
                    ...item.data()
                });
            });
            setOrders(Orders);
        }
        myfun();
    },[]);
    console.log(orders.length)

    return (
        <>
            <MainHeader/>

            {
                orders.length>0?
                
            
            <div className="mainContainer">
                    <Grid container spacing={2} >
                        <Grid item xs={12} sm={12} md={10} sx={{margin:"auto"}}>
                            <Item  className="cartItem">
                               {
                                   orders.map(item => {
                                       return (
                                        <Grid key={item.id} container spacing={2} mb={2}>
                                            <Grid item xs={12} sm={12} md={12}>
                                                <Item sx={{textAlign:"left"}}>
                                                    <Typography sx={{display:"inline-block", color:"#2C3333"}}variant="h5" gutterBottom component="div">
                                                        Order ID: {item.id}
                                                    </Typography>    
                                                    <Typography sx={{float:"right", color:"#2C3333"}} variant="h5" gutterBottom component="div">
                                                        Date: {item.Date}
                                                    </Typography> 
                                                    <hr/>
                                                    {
                                                        item.Items.map(product => {
                                                            return (
                                                                <>
                                                                    <Typography sx={{ color:"#2C3333", display:"inline-block"}} mr={5} variant="subtitle1" gutterBottom component="div">
                                                                        Name: {product.Name}
                                                                    </Typography>   
                                                                    <Typography variant="subtitle1" sx={{color:"#2C3333", }} mr={5} gutterBottom component="div">
                                                                        Quantity: {product.quantity}
                                                                    </Typography> 
                                                                    <Typography sx={{color:"#2C3333", }} variant="subtitle1" gutterBottom component="div">
                                                                        Price Per Unit: {product.Price}
                                                                    </Typography>  
                                                                    <hr/>
                                                                    
                                                                </>
                                                            )
                                                        })
                                                    }
                                                    
                                                    <Typography sx={{display:"inline-block", color:"#2C3333"}}variant="h5" gutterBottom component="div">
                                                        Order Total: 
                                                    </Typography>    
                                                    <Typography sx={{float:"right",display:"inline-block", color:"#2C3333"}} variant="h5" gutterBottom component="div">
                                                        ₹{item.OrderTotal}
                                                    </Typography> 
                                                </Item>
                                            </Grid>
                                        </Grid>
                                       )
                                   })
                               } 
                            </Item>
                        </Grid>
                    </Grid>
                </div> 
            :<p className="txtCenter">No Orders Found!</p>
            }

            {loading?<div className="txtCenter"><CircularProgress /></div>:null}
        </>
    );

}

export default Orders;