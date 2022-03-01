import {Card, CardActions, CardContent, CardMedia, Button, Typography} from '@mui/material';

function ProductsListing(props)
{
    return (
        <div>
        {
            props.prodArray.map(item => {
                return (
                    <Card sx={{ width:"26%", margin:"3% 3% 0% 3%", display:"inline-block" }}>
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
                        <CardActions style={{float:"right"}}>
                            <Button size="small">Add to Cart</Button>
                        </CardActions>
                    </Card>
                )
            })
        }
        </div>
    )
}

export default ProductsListing;