"use client";
import React, { useEffect } from 'react';
import { CircularProgress, Typography } from '@mui/material';
import { useUserData } from '@/context/Usercontext/UserDataContext';
import ProductCard from '@/components/ProductCard';
import { FetchProductsProvider, useFetchProducts } from '@/context/ProductContext/ProductDataContext';

const ProductPage = () => {
  const { state: userState } = useUserData();
  const { user } = userState;
  const { state, fetchProducts } = useFetchProducts();
  const { products, loading, error } = state;

  useEffect(() => {
    fetchProducts();
  }, []);

  const userProducts = products?.filter(product => product.sellerId === user?.uid);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <div className="flex h-screen">
      <main className="w-4/5 p-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">My Products</h2>
        <div className="flex flex-wrap justify-between items-center">
          {userProducts?.map(product => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </main>
    </div>
  );
};

const Page = () => (
  <FetchProductsProvider>
    <ProductPage />
  </FetchProductsProvider>
);

export default Page;

