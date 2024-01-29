import React, { useEffect } from "react";
import {
  Container,
  Form,
  FormControl,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {useNavigate } from "react-router-dom";
import { logout } from "../actions/userActions";

function Header({ setSearch }) {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    navigate('/');

  };

  useEffect(() => {}, [userInfo]);

  return (
    <Navbar collapseOnSelect expand="lg" bg="secondary-subtle" variant="dark">
      <Container>
        {
          userInfo? (<Navbar.Brand href="/mynotes" style={{color:'black'}} >Note Zipper</Navbar.Brand>):(<Navbar.Brand href="/" style={{color:'black'}} >Note Zipper</Navbar.Brand>)
        }
        {/* <Navbar.Brand href="/" style={{color:'black'}} >Note Zipper</Navbar.Brand> */}

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="m-auto">
            {userInfo && (
              <Form inline>
                <FormControl
                  type="text"
                  placeholder="Search"
                  className="mr-sm-2"
                  onChange={(e) => setSearch(e.target.value)}
                />
              </Form>
            )}
          </Nav>
          <Nav>
            {userInfo ? (
              <>
                <Nav.Link href="/mynotes" style={{color:'black'}}>My Notes</Nav.Link>
                <NavDropdown className="text-white bg-secondary rounded"
                  title={`${userInfo.name}`}
                  id="collasible-nav-dropdown"
                  style={{textTransform:'capitalize'}}
                >
                  <NavDropdown.Item  style={{color:'black'}}  href="/profile">
                    My Profile
                  </NavDropdown.Item>

                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logoutHandler} style={{color:'black'}}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <Nav.Link href="/login" style={{color:'black'}}>Login</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;