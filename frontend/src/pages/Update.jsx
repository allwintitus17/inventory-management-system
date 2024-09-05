
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getProduct, updateProduct, reset } from '../features/products/productSlice';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

const Update = () => {
  const { product, isLoading, isError, isSuccess, message } = useSelector((state) => state.products);
  const { productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [updatedProduct, setUpdatedProduct] = useState({
    InventoryName: '',
    Description: '',
    ProductType: '',
    AddedBY: '',
    Rating: '',
  });

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      toast.success('Product updated successfully');
      navigate('/products');
    }

    dispatch(getProduct(productId));

    // Cleanup
    return () => {
      dispatch(reset());
    };
  }, [dispatch, isError, isSuccess, message, navigate, productId]);

  useEffect(() => {
    if (product) {
      setUpdatedProduct({
        InventoryName: product.InventoryName || '',
        Description: product.Description || '',
        ProductType: product.ProductType || '',
        AddedBY: product.AddedBY || '',
        Manfacturedate:product.Manfacturedate|| '',
        Rating: product.Rating || '',
      });
    }
  }, [product]);

  const onChange = (e) => {
    setUpdatedProduct({ ...updatedProduct, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (window.confirm('Are you sure you want to update this product?')) {
      dispatch(updateProduct({ productId, productData: updatedProduct }));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <BackButton />
      <h1>Update Product</h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="InventoryName">Product Name</label>
          <input
            type="text"
            id="InventoryName"
            name="InventoryName"
            value={updatedProduct.InventoryName}
            onChange={onChange}
            placeholder="Enter product name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="Description">Description</label>
          <textarea
            id="Description"
            name="Description"
            value={updatedProduct.Description}
            onChange={onChange}
            placeholder="Enter product description"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="ProductType">Product Type</label>
          <select
            id="ProductType"
            name="ProductType"
            value={updatedProduct.ProductType}
            onChange={onChange}
            required
          >
            <option value="">Select product type</option>
            <option value="decors">Decors</option>
            <option value="kitchen">Kitchen</option>
            <option value="stationary">Stationary</option>
            <option value="cooking">Cooking</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="AddedBY">Added By</label>
          <input
            type="text"
            id="AddedBY"
            name="AddedBY"
            value={updatedProduct.AddedBY}
            onChange={onChange}
            placeholder="Enter your name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="Manfacturedate">Manufacture Date</label>
          <input
            type="date"
            id="Manfacturedate"
            name="Manfacturedate"
            value={updatedProduct.Manfacturedate}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Rating</label>
          <div className="rating-group">
            {[1, 2, 3, 4, 5].map((rating) => (
              <div key={rating} className="rating-option">
                <input
                  type="radio"
                  id={`rating-${rating}`}
                  name="Rating"
                  value={rating}
                  checked={updatedProduct.Rating === rating.toString()}
                  onChange={onChange}
                />
                <label htmlFor={`rating-${rating}`}>{rating}</label>
              </div>
            ))}
          </div>
        </div>
        <button type="submit" className="btn" disabled={isLoading}>
          {isLoading ? 'Updating...' : 'Update'}
        </button>
      </form>
    </div>
  );
};

export default Update;
