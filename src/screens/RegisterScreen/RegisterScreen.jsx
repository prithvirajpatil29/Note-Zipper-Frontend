import axios from 'axios';
import React, {useEffect, useState} from 'react'
import ErrorMessage from '../../components/ErrorMessage'
import { useDispatch, useSelector } from 'react-redux';
import { register } from "../../actions/userActions";
import { useNavigate } from 'react-router-dom';
const RegisterScreen = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState('')
    const [pic, setPic] = useState("https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg")
    const [message, setMessage] = useState(null);
    const [picMessage, setPicMessage] = useState(null);
    const userRegister = useSelector((state) => state.userRegister);
    const { loading, error, userInfo } = userRegister;
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const submitHandler = async(e) => {
        e.preventDefault()
        // console.log(email)
        dispatch(register(name, email, password, pic));
    }
    useEffect(() => {
      if(userInfo){
        navigate('/')
      }
    },[navigate,userInfo])
    const postDetails = (pics) => {
      if (
        pics ===
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
      ) {
        return setPicMessage("Please Select an Image");
      }
      setPicMessage(null);
      if (pics.type === "image/jpeg" || pics.type === "image/png") {
        const data = new FormData();
        data.append("file", pics);
        data.append("upload_preset", "notezipper");
        data.append("cloud_name", "dcmh2rcpb");
        fetch("https://api.cloudinary.com/v1_1/dcmh2rcpb/image/upload", {
          method: "post",
          body: data,
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data)
            setPic(data.url.toString());
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        return setPicMessage("Please Select an Image");
      }
    };
  
  return (
    <div className='container'>
      <div className="row">
        <div className="col-md-12 text-center mt-3">
          <h3 className="display-3 text-secondary">Register</h3>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-md-6 offset-md-3">
        {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
        {message && <ErrorMessage variant='danger'>{message}</ErrorMessage>}
          <div className="card">
            <div className="card-body">
              <form action="" onSubmit={submitHandler}>
                <div className="form-group mt-2">
                  <label htmlFor="">Name*</label>
                  <input type="text" name="name" id="name" className='form-control'  required value={name} onChange={(e) => setName(e.target.value)}/>
                </div>
                <div className="form-group mt-2">
                  <label htmlFor="">Email*</label>
                  <input type="email" name="email" id="email" className='form-control' value={email} required onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="form-group mt-2">
                  <label htmlFor="">Profile</label>
                  <input type="file" name="pic" id="pic" className='form-control' onChange={(e) => postDetails(e.target.files[0])} />
                  {/* //onChange={(e) => postDetails(e.target.files[0])} */}
                </div>
                <div className="form-group mt-2">
                  <label htmlFor="">Password*</label>
                  <input type="password" name="password" id="password" className='form-control' value={password} required onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="form-group mt-2">
                  <input type="submit" value="Register" className='form-control btn btn-outline-info mt' />
                </div>
              </form>
            </div>
            <div className="card-footer">
              <p className="text-end"><b className='me-2'>Already have account ?</b>
                {/* <NavLink to={'/register'}>Register Here</NavLink> */}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterScreen