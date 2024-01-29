import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import ErrorMessage from '../../components/ErrorMessage'
import { useDispatch, useSelector } from 'react-redux'
import { login } from "../../actions/userActions";
const LoginScreen = ({history}) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState('')
    // const [error, setError] = useState(false)
    // const [loading, setLoading] = useState(false)

    const dispatch = useDispatch()
    const userLogin = useSelector((state) => state.userLogin);
    const { loading, error, userInfo } = userLogin;
    const navigate = useNavigate();

    useEffect(() => {
      if (userInfo) {
        navigate('/mynotes');
      }
    }, [navigate, userInfo]);
    const submitHandler =async (e) => {
        e.preventDefault()
        dispatch(login(email, password));
        
    }
  return (
    <div className='container'>
      <div className="row">
        <div className="col-md-12 text-center mt-3">
          <h3 className="display-3 text-secondary">Login</h3>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-md-6 offset-md-3">
            {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
          <div className="card">
            <div className="card-body">
              <form action="" onSubmit={submitHandler}>
                <div className="form-group mt-2">
                  <label htmlFor="">Email</label>
                  <input type="email" name="email" id="email" className='form-control' value={email} required onChange={(e) => setEmail(e.target.value)} />
                </div>
                 
                <div className="form-group mt-2">
                  <label htmlFor="">Password</label>
                  <input type="password" name="password" id="password" className='form-control' value={password} required onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="form-group mt-2">
                  <input type="submit" value="Login" className='form-control btn btn-outline-info mt' />
                </div>
              </form>
            </div>
            <div className="card-footer">
              <p className="text-end"><b className='me-2'>Are you a new user</b>
                <NavLink to={'/register'}>Register Here</NavLink>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginScreen