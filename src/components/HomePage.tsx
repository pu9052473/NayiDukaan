import React, { useEffect } from 'react'
import { CircularProgress, Typography } from '@mui/material';
import { useUserData } from "@/context/Usercontext/UserDataContext";
import { useFetchProducts } from '@/context/ProductContext/ProductDataContext';
import ProductCard from './ProductCard';


export interface User {
    email: string;
    name: string;
  }

const HomePage = () => {
      


        const { state: userState } = useUserData();
  const { user } = userState;
  const { state, fetchProducts } = useFetchProducts();
  const { products, loading, error } = state;

  useEffect(() => {
    fetchProducts();
  }, []);

//   const userProducts = products?.filter(product => product.sellerId === user?.uid);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }


  return (
    <div className="bg-colorOne h-full w-full flex items-center">
        <div className="flex bg-colorTwo overflow-x-scroll px-10 gap-5 justify-between items-center">
          {products?.map(product => (
            <ProductCard key={product.id} {...product} Page="home"/>
          ))}
        </div>
    </div>
  )
}

export default HomePage