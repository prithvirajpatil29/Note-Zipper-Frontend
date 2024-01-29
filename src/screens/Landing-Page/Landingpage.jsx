import React from 'react'
import './Landingpage.css'
import { NavLink } from 'react-router-dom'
const Landingpage = () => {
  // useEffect(() => {
  //   if (userInfo) {
  //     history.push("/mynotes");
  //   }
  // }, [history, userInfo]);
  return (
    <div className="main d-flex align-items-center justify-content-center">
      <div className="container">
        <div className="intro-text">
          <div className="">
            <h1 className="text-center fw-bolder">Welcome to Note Zipper</h1>
            <p className="text-center">One Safe place for all your notes</p>
          </div>
          <div className="d-flex justify-content-center">
            <NavLink to='/login' className="btn btn-info px-5 py-2 me-4 text-white">
              Login
            </NavLink>
            <NavLink to='/register'>
            <button className="btn btn-info px-5 py-2 text-white">Sign Up</button>

            </NavLink>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Landingpage