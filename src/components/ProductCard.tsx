import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  Button,
  CardActions,
} from '@mui/material';
import { Product } from '@/app/types';


const ProductCard: React.FC<Product> = ({
  productName,
  description,
  category,
  price,
  productImage,
}) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={productImage}
        alt={productName}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {productName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Category: {category}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Price: ${price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Add to Cart</Button>
        <Button size="small">View Details</Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
