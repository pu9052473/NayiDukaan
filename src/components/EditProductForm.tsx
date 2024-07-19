import React, { useState } from 'react';
import { Box, Input, TextField, Typography } from '@mui/material';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { useUserData } from '@/context/Usercontext/UserDataContext';
import { UpdateDocument } from '@/utils/EditData';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Ensure you have the toastify CSS imported

interface EditProductFormProps {
  ProductData: Product;
  productId: string;
}

const EditProductForm: React.FC<EditProductFormProps> = ({ ProductData, productId }) => {
  const { state } = useUserData();
  const { user } = state;

  if (user.uid !== ProductData.sellerId) {
    return <div className="text-red-500 font-extrabold text-2xl">Sorry, you cannot update this product</div>;
  }

  const [productName, setProductName] = useState(ProductData?.productName);
  const [productDescription, setProductDescription] = useState(ProductData?.description);
  const [productPrice, setProductPrice] = useState(ProductData?.price);
  const [productCategory, setProductCategory] = useState(ProductData?.category);
  const [productImage, setProductImage] = useState<string | ArrayBuffer | null>(ProductData?.productImage);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProductImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (imageFile) {
        const storage = getStorage();
        const storageRef = ref(storage, `images/products/${imageFile.name}`);
        await uploadBytes(storageRef, imageFile);
        const photoUrl = await getDownloadURL(storageRef);
        setProductImage(photoUrl);
      }

      const updatedProductData = {
        productName,
        description: productDescription,
        category: productCategory,
        productImage,
        price: productPrice,
      };

      await UpdateDocument('Products', productId, updatedProductData);
      toast.success('Product data updated successfully!');
    } catch (error) {
      toast.error('Error while updating product data');
      console.error(error);
    }
  };

  return (
    <div className='bg-colorThree h-full w-full flex justify-center p-5'>
      <ToastContainer />
      <form onSubmit={handleFormSubmit} className='bg-colorTwo w-[50%] p-4 shadow-lg shadow-colorFive rounded-xl'>
        <TextField
          label="Product Name"
          value={productName}
          fullWidth
          margin="normal"
          onChange={(e) => setProductName(e.target.value)}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: 'grey' },
              '&:hover fieldset': { borderColor: '#ff8000' },
              '&.Mui-focused fieldset': { borderColor: '#e87d20' },
            },
          }}
        />
        <TextField
          label="Description"
          value={productDescription}
          fullWidth
          multiline
          rows={2}
          margin="normal"
          onChange={(e) => setProductDescription(e.target.value)}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: 'grey' },
              '&:hover fieldset': { borderColor: '#ff8000' },
              '&.Mui-focused fieldset': { borderColor: '#e87d20' },
            },
          }}
        />
        <TextField
          label="Category"
          value={productCategory}
          fullWidth
          margin="normal"
          onChange={(e) => setProductCategory(e.target.value)}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: 'grey' },
              '&:hover fieldset': { borderColor: '#ff8000' },
              '&.Mui-focused fieldset': { borderColor: '#e87d20' },
            },
          }}
        />
        <TextField
          label="Price"
          value={productPrice}
          type="number"
          fullWidth
          margin="normal"
          onChange={(e) => setProductPrice(Number(e.target.value))}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: 'grey' },
              '&:hover fieldset': { borderColor: '#ff8000' },
              '&.Mui-focused fieldset': { borderColor: '#e87d20' },
            },
          }}
        />
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            Product Image
          </Typography>
          {productImage && (
            <img src={productImage as string} alt={productName} style={{ maxWidth: '100%' }} />
          )}
        </Box>
        <Input type='file' onChange={handleImageChange} />
        <Box sx={{ mt: 2 }}>
          <button type='submit' className='bg-colorOne p-2 w-full rounded-md'>Submit</button>
        </Box>
      </form>
    </div>
  );
};

export default EditProductForm;
