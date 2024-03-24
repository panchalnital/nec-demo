import {Navbar,Nav,NavDropdown} from "react-bootstrap"
import { Link, link } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
function Header(){
    const navigate = useNavigate()
    const user=JSON.parse(localStorage.getItem('user-info'));
    function logout(){
        localStorage.clear();
        navigate('/login');
    }
    return(
        <div>
            <Navbar bg="dark" data-bs-theme="dark">
            {/* <Container> */}
                <Navbar.Brand href="#home">NEC  </Navbar.Brand>
                <Nav className="me-auto nav_bar_wrapper">
                    {
                        localStorage.getItem('user-info')?
                        <>
                            <Link to="/">ProductList</Link>
                            <Link to="/add">AddProducts</Link>
                           
                        </>
                        :
                        <>
                            <Link to="/login">LogIn</Link>
                        </>
                    }
                    
                    
                </Nav>
                {
                localStorage.getItem('user-info')?
                <Nav>
                    <NavDropdown title={user && user.name}>
                        <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                        <NavDropdown.Item>Profile</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                : null
                }
            {/* </Container> */}
            </Navbar>
        </div>
    )
}
export default Header