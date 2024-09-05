import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts, reset } from '../features/products/productSlice';
import Spinner from '../components/Spinner';
import ProductItem from '../components/ProductItem';
import BackButton from '../components/BackButton';


const Products = () => {
  const { products, isLoading, isSuccess } = useSelector((state) => state.products);
  console.log(isSuccess)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());

    // Cleanup function to reset state when component unmounts
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);


  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
    <BackButton />
      <h1>Created Inventorys</h1>
      <div className="tickets">
        <div className="ticket-headings">
          <div>Date</div>
          <div>Inventory</div>
          <div>View Inventory</div>
       
          <div></div>
        </div>

        {products.length === 0 ? (
  <h3>No Inventorys Found</h3>
) : (
  products.map((product) => (
    <ProductItem key={product._id} product={product} />
  ))
)}

          
      </div>
    </>
  );
};

export default Products;

