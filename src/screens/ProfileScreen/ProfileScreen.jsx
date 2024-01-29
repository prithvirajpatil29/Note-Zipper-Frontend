import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
// import MainScreen from "../../components/Mainscree";
import MainScreen from "../../components/Mainscree";
// import "./ProfileScreen.css";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../actions/userActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { useNavigate } from "react-router-dom";

const ProfileScreen = ({ location, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pic, setPic] = useState();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [picMessage, setPicMessage] = useState();

  const dispatch = useDispatch();
    const navigate = useNavigate()
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading, error, success } = userUpdate;

  useEffect(() => {
    if (!userInfo) {
      history.push("/");
    } else {
      setName(userInfo.name);
      setEmail(userInfo.email);
      setPic(userInfo.pic);
    }
  }, [history, userInfo]);

  const postDetails = (pics) => {
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
          setPic(data.url.toString());
          console.log(pic);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return setPicMessage("Please Select an Image");
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateProfile({ name, email, password, pic }));
    navigate('/mynotes')
  };

  return (
    // <MainScreen title="EDIT PROFILE">
    //   <div>
    //     <Row className="profileContainer">
    //       <Col md={6}>
    //         <Form onSubmit={submitHandler}>
    //           {loading && <Loading />}
    //           {success && (
    //             <ErrorMessage variant="success">
    //               Updated Successfully
    //             </ErrorMessage>
    //           )}
    //           {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
    //           <Form.Group controlId="name">
    //             <Form.Label>Name</Form.Label>
    //             <Form.Control
    //               type="text"
    //               placeholder="Enter Name"
    //               value={name}
    //               onChange={(e) => setName(e.target.value)}
    //             ></Form.Control>
    //           </Form.Group>
    //           <Form.Group controlId="email">
    //             <Form.Label>Email Address</Form.Label>
    //             <Form.Control
    //               type="email"
    //               placeholder="Enter Email"
    //               value={email}
    //               onChange={(e) => setEmail(e.target.value)}
    //             ></Form.Control>
    //           </Form.Group>
    //           <Form.Group controlId="password">
    //             <Form.Label>Password</Form.Label>
    //             <Form.Control
    //               type="password"
    //               placeholder="Enter Password"
    //               value={password}
    //               onChange={(e) => setPassword(e.target.value)}
    //             ></Form.Control>
    //           </Form.Group>
    //           <Form.Group controlId="confirmPassword">
    //             <Form.Label>Confirm Password</Form.Label>
    //             <Form.Control
    //               type="password"
    //               placeholder="Confirm Password"
    //               value={confirmPassword}
    //               onChange={(e) => setConfirmPassword(e.target.value)}
    //             ></Form.Control>
    //           </Form.Group>{" "}
    //           {picMessage && (
    //             <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
    //           )}
    //           <Form.Group controlId="pic">
    //             <Form.Label>Change Profile Picture</Form.Label>
    //             <Form.File
    //               onChange={(e) => postDetails(e.target.files[0])}
    //               id="custom-file"
    //               type="image/png"
    //               label="Upload Profile Picture"
    //               custom
    //             />
    //           </Form.Group>
    //           <Button type="submit" varient="primary">
    //             Update
    //           </Button>
    //         </Form>
    //       </Col>
    //       <Col
    //         style={{
    //           display: "flex",
    //           alignItems: "center",
    //           justifyContent: "center",
    //         }}
    //       >
    //         <img src={pic} alt={name} className="profilePic" />
    //       </Col>
    //     </Row>
    //   </div>
    // </MainScreen>
    <div className="container">
        <div className="row">
            <h3 className="display-5 text-secondary">Edit Profile</h3>
            <hr />
        </div>
        <div className="row">
            <div className="offset-md-4 col-md-4 border rounded p-3">
                <form action="" onSubmit={submitHandler}>
                    <div className="form-group mb-2">
                        <label htmlFor="">Name</label>
                        <input type="text" name="" className="form-control" id=""  placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div className="form-group my-2">
                      <label htmlFor="">Email</label>
                        <input type="email" name="" id=""className="form-control" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className="form-group my-2">
                      <label htmlFor="">Reset Password</label>
                        <input type="password" name="" id="" className="form-control" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Update Profile" className="btn btn-secondary form-control text-white"/>
                    </div>
                </form>
            </div>
        </div>
    </div>
  );
};

export default ProfileScreen;