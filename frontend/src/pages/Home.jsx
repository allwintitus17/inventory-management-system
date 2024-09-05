import React from 'react'
import {Link} from 'react-router-dom'
import { FaTicketAlt } from 'react-icons/fa'

const Home = () => {
  return (
    <>
    <section className='heading'>
      <h1>Welcome to Span inventory</h1>
       <p>Please add the inventory for the shops</p>
    </section>
    {/* <Link to='/new-product' className='btn btn-reverse'> 
    <FaQuestionCircle/> Create New Product
    </Link> */}

    <Link to='/products' className='btn btn-block'>
    <FaTicketAlt/>View My Inventorys and Products
    </Link>
    
    </>
  )
}

export default Home