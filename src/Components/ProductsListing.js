import {Card, CardActions, CardContent, CardMedia, Button, Typography} from '@mui/material';
import { addToCart } from '../features/cartSlice';
import { useDispatch } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ProductsListing(props)
{
    var dispatch=useDispatch();
    var navigate=useNavigate();

    var addItem=(id,details)=>{
        dispatch(addToCart({id:id,data:details}));
        toast.success("Item added to cart!",{position: toast.POSITION.BOTTOM_RIGHT});
    };

    var viewDetails=(id)=>{
        navigate("/details?id="+id);
    };

    return (
        <div>
        {
            props.prodArray.map(item => {
                return (
                    <Card key={item.id} sx={{ maxWidth: 345, margin:"3% 3% 0% 3%", display:"inline-block" }}>
                        <CardMedia
                            component="img"
                            height="140"
                            image={item.details.URL}
                            alt={item.details.Name}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                            {item.details.Name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                            {item.details.Description}
                            </Typography>
                        </CardContent>
                        <Typography variant="h5" gutterBottom component="div">
                        ₹{item.details.Price}
                        </Typography>
                        <CardActions>
                            <Button size="small" variant="contained" style={{margin:"auto"}} onClick={()=>viewDetails(item.id)}>View Details</Button>
                            <Button size="small" variant="contained" style={{margin:"auto"}} onClick={()=>{addItem(item.id,item.details)}}>Add to Cart</Button>
                        </CardActions>
                    </Card>
                )
            })
        }
        <ToastContainer/>
        </div>
    )
}

export default ProductsListing;