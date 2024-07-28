// "use client"
// import { Product } from '@/app/types';
// import EditProductForm from '@/components/EditProductForm';
// import { db } from '@/firebase/config';
// import { Typography } from '@mui/material';
// import { doc, getDoc } from 'firebase/firestore';
// import { useParams } from 'next/navigation'
// import React, { useEffect, useState } from 'react'

// const page = () => {
//     const params = useParams();
//     const ProductId: string = params?.id;
//     const [ProductData, setProductData] = useState<Product | null>(null);

//     useEffect(() => {
//         const fetchProductData = async () => {
//             const ProductDocRef = doc(db, 'Products', ProductId);
//             const Product = await getDoc(ProductDocRef);
//             console.log(Product.data())
//             if (Product.exists()) {
//                 setProductData(Product.data() as Product)
//             }
//         }
//         if (ProductId) {
//             fetchProductData();
//         }
//     }, [ProductId])

//     if (!ProductData) {
//         return <div className='text-colorOne'>Loading Product Data ...</div>;
//     }
//     return (
//         <div className='bg-colorThree'>
//             <h1 className='text-colorOne w-full flex justify-center text-xl font-sans font-semibold'>Edit Product</h1>
//             <EditProductForm ProductData={ProductData} productId={ProductId} />
//         </div>
//     )
// }

// export default page

"use client";
import { Product } from '@/app/types';
import EditProductForm from '@/components/EditProductForm';
import { db } from '@/firebase/config';
import { Typography } from '@mui/material';
import { doc, getDoc } from 'firebase/firestore';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { EditProductProvider } from '@/context/ProductContext/ProductDataContext';

const Page = () => {
  const params = useParams();
  const productId: string = params?.id;
  const [productData, setProductData] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProductData = async () => {
      const productDocRef = doc(db, 'Products', productId);
      const product = await getDoc(productDocRef);
      console.log(product.data());
      if (product.exists()) {
        setProductData(product.data() as Product);
      }
    };
    if (productId) {
      fetchProductData();
    }
  }, [productId]);

  if (!productData) {
    return <div className='text-colorOne'>Loading Product Data ...</div>;
  }

  return (
    <div className='bg-colorThree'>
      <h1 className='text-colorOne w-full flex justify-center text-xl font-sans font-semibold'>Edit Product</h1>
      <EditProductProvider>
        <EditProductForm ProductData={productData} productId={productId} />
      </EditProductProvider>
    </div>
  );
};

export default Page;

