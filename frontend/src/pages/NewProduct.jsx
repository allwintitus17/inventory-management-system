import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createProduct, reset } from '../features/products/productSlice';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

const NewProduct = () => {
//   const { user } = useSelector((state) => state.auth);
  const { isLoading, isError, isSuccess, message } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    InventoryName: '',
    Description: '',
    ProductType: '',
    AddedBY: '',
    Manfacturedate: '',
    Rating: ''
  });

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      toast.success('Product created successfully');
      navigate('/products'); // Redirect to the home page or products list
    }

    dispatch(reset());
  }, [isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createProduct(product));
  };

  if(isLoading){
   return   <Spinner/>
  }

  return (
    <div>
      <BackButton />
      <h1>Create New Product</h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="InventoryName">Product Name</label>
          <input
            type="text"
            id="InventoryName"
            name="InventoryName"
            value={product.InventoryName}
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
            value={product.Description}
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
            value={product.ProductType}
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
            value={product.AddedBY}
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
            value={product.Manfacturedate}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
  <label htmlFor="Rating">Rating</label>
  <div className="rating-group">
    {[1, 2, 3, 4, 5].map((rating) => (
      <div key={rating} className="rating-option">
        <input
          type="radio"
          id={`rating-${rating}`}
          name="Rating"
          value={rating}
          checked={product.Rating === rating.toString()}
          onChange={onChange}
        />
        <label htmlFor={`rating-${rating}`}>{rating}</label>
      </div>
    ))}
  </div>
</div>

        <button type="submit" className="btn" disabled={isLoading}>
          {isLoading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default NewProduct;
