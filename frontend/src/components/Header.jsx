import React from 'react'
import {Link,useNavigate} from 'react-router-dom'
import {FaSignInAlt,FaSignOutAlt,FaUser} from 'react-icons/fa'
import {CgAddR} from 'react-icons/cg'
import {logout,reset} from '../features/auth/authSlice'
import { useSelector,useDispatch } from 'react-redux'
const Header = () => {
  const navigate=useNavigate();
  const  dispatch = useDispatch();

  const {user}=useSelector((state)=>state.auth)

  const onLogout=()=>{
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  return (
      <header className='header'>
          <div className='logo'>
             <Link to='/'>SPAN INVENTORY</Link>
          </div>
          <ul>
          {user ? (
            <>
               <li>
             <Link to='/new-product' ><CgAddR/>Add Inventory</Link>
            </li>
            
                    <li>
                   
                        <button className="btn" onClick={onLogout}><FaSignOutAlt/>Logout</button>
                    </li>


                    </>
                      
                ):( <><li>
                    <Link to='/login'>
                    <FaSignInAlt/>Login
                    </Link>
                </li>
                <li>
                    <Link  to='/register'>
                    <FaUser/>
                        Register
                   </Link>
                </li>
                </>)}  
          </ul>
      </header>
  )
}

export default Header