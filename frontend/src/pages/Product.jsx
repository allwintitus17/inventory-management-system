import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProduct, deleteProduct } from '../features/products/productSlice';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaPencilAlt } from 'react-icons/fa';
import { IoTrashBinSharp } from "react-icons/io5";

const Product = () => {
  const { product, isLoading, isError, message } = useSelector((state) => state.products);
  const { productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error(message);
     
    }
    dispatch(getProduct(productId));
  }, [dispatch, isError, message, productId]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this product?');

    if (confirmDelete) {
      try {
        await dispatch(deleteProduct(productId)).unwrap();
        toast.success('Product deleted successfully');
        navigate('/products'); // Redirect after successful deletion
      } catch (err) {
        toast.error('Failed to delete product');
      }
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h3>Something Went Wrong</h3>;
  }



  return (
    <div className='ticket-page'>
      <header className='ticket-header'>
        <BackButton url="/products" />
        <h2>Product ID: {product._id}</h2>
        <h4>Date Submitted: {new Date(product.createdAt).toLocaleString('en-US')}</h4>
        <h4>Inventory Name: {product.InventoryName}</h4>
        <h4>Description: {product.Description}</h4>
        <h4>Product Type: {product.ProductType}</h4>
        <h4>Added By: {product.AddedBY}</h4>
        <h4>Manufacture Date: {product.Manfacturedate}</h4>
        <h4>Rating: {product.Rating}</h4>
      </header>
      <ul>
        <li>
          <Link to={`/update-product/${product._id}`} className='btn btn-block btn-sm'>
            <FaPencilAlt /> Update
          </Link>
        </li>
        <li>
          <button onClick={handleDelete} className='btn btn-block btn-sm'>
            <IoTrashBinSharp /> Delete
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Product;
