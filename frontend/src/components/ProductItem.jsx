import React from 'react';
import {Link} from 'react-router-dom'

const ProductItem = ({ product }) => {
  return (
    <div className='ticket'>
      <div>{new Date(product.createdAt).toLocaleDateString()}</div> {/* Display the created date */}
      <div>{product.InventoryName}</div> {/* Display the inventory name */}
     
       <Link to={`/product/${product._id}`} className='btn btn-reverse btn-sm'>View</Link>
       
    </div>
  );
};

export default ProductItem;
