import MainHeader from './MainHeader';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, emptyCartOnOrder } from '../features/cartSlice';
import {styled, Typography, Paper, Grid, Button} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { db } from "./Config";
import { collection, addDoc } from "firebase/firestore";
import 'react-toastify/dist/ReactToastify.css';

var Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

function Cart()
{
    var data=useSelector(state => state.cart);
    var dispatch=useDispatch();
    var navigate=useNavigate();

    var handleDeleteItem=(id)=>{
        dispatch(removeFromCart({id:id}));
        toast.success("Item removed from cart!",{position: toast.POSITION.BOTTOM_RIGHT});
    };
    
    var handleOrder=async ()=>{
        const usersCollectionRef = await collection(db, "Orders");
        var dt=new Date();
        var res=await addDoc(usersCollectionRef, { 
            UID:localStorage.getItem('UID'),
            Date: dt.getDate()+"-"+(dt.getMonth()+1)+"-"+dt.getFullYear(),
            OrderTotal:data.totalAmount,
            Items: data.cartItems
         });
         dispatch(emptyCartOnOrder());
         navigate("/success?orderID="+res.id, { replace: true });
    };

    if(data.totalItems>0)
    {
        return (
            <>
                <MainHeader/>
                <div className="mainContainer">
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={8} >
                        {
                            data.cartItems.map(element => {
                                return (
                                    <Item key={element.id} className="cartItem">
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} sm={12} md={3}>
                                                <Item>
                                                <img
                                                    src={element.URL}
                                                    alt={element.Name}
                                                    height="50%"
                                                    width="50%"
                                                />                                                    
                                                </Item>
                                            </Grid>
                                            <Grid item xs={12} sm={12} md={9} >
                                                <Item sx={{textAlign:"left"}}>
                                                    <Typography sx={{display:"inline-block", color:"#2C3333"}}variant="h5" gutterBottom component="div">
                                                        {element.Name}
                                                    </Typography>    
                                                    <Typography sx={{float:"right",display:"inline-block", color:"#2C3333"}} variant="h5" gutterBottom component="div">
                                                    ???{element.Price}
                                                    </Typography>  
                                                    <Typography variant="h5" sx={{color:"#2C3333"}} gutterBottom component="div">
                                                        {element.Description}
                                                    </Typography> 
                                                    <Typography variant="h6" sx={{color:"#2C3333"}} gutterBottom component="div">
                                                        Quantity: {element.quantity}
                                                    </Typography> 
                                                </Item>
                                                <Button className="deleteBtn" variant="contained" sx={{float:"right", marginTop:"1rem"}} onClick={()=> handleDeleteItem(element.id)}>Delete Item</Button>
                                            </Grid>
                                        </Grid>
                                    </Item>
                                )
                            })
                        }
                            
                        </Grid>
                        <Grid item xs={12} sm={12} md={4}>
                            <Item sx={{textAlign:"left"}}>
                                
                                <Typography sx={{display:"inline-block", color:"#2C3333"}} variant="h5" gutterBottom component="div">
                                    Total Items:
                                </Typography>    
                                <Typography sx={{float:"right",display:"inline-block", color:"#2C3333"}} variant="h5" gutterBottom component="div">
                                    {data.totalItems}
                                </Typography><br/>
                                <Typography sx={{display:"inline-block", color:"#2C3333"}} variant="h5" gutterBottom component="div">
                                    Total Amount:
                                </Typography>    
                                <Typography sx={{float:"right",display:"inline-block", color:"#2C3333"}} variant="h5" gutterBottom component="div">
                                    ???{data.totalAmount}
                                </Typography>
                                <Button variant="contained" style={{width:"100%", fontSize:"15px", fontWeight:"bold"}} onClick={()=>{handleOrder()}}>Place Order</Button>
                            </Item>
                        </Grid>
                    </Grid>
                </div>   
                <ToastContainer/>         
            </>
        );
    }
    else
    {
        return (
            <>
                <MainHeader/>
                <p className="txtCenter">Your Cart is Empty!</p>
            </> 
        );
    }
}

export default Cart;