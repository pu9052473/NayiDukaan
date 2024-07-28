"use client"

import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/firebase/config';
import { Grid, CircularProgress, Typography } from '@mui/material';
import { useUserData } from '@/context/Usercontext/UserDataContext';
import ProductCard from '../../../Components/ProductCard';

const page = () => {
  const { state } = useUserData();
  const { user } = state;
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      if (user?.uid) {
        console.log(user);
        setLoading(true);
        try {
          const productsRef = collection(db, 'Products');
          const q = query(productsRef, where('sellerId', '==', user.uid));
          const querySnapshot = await getDocs(q);
          const productsData = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          setProducts(productsData);
          setLoading(false);
        } catch (error) {
          setError(error instanceof Error ? error.message : 'Error fetching products');
          setLoading(false);
        }
      }
    };

    fetchProducts();
  }, [user?.uid]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }
  console.log(products)

  return (
    <div className="flex h-screen">
      <main className="w-4/5 p-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          My Products

        </h2>
        {/* <Grid container spacing={10}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <ProductCard {...product} />
            </Grid>
          ))}
        </Grid> */}
        <div className="flex flex-wrap justify-between items-center">

          {products.map((product) => (
            <ProductCard {...product} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default page;
