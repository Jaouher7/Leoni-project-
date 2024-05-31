import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Navbar,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  
  Button,
  Container,
  
} from 'reactstrap';
import {  Menu } from 'react-feather';
import { useSelector, useDispatch } from 'react-redux';
//import SimpleBar from 'simplebar-react';
// import MessageDD from './MessageDD';
// import MegaDD from './MegaDD';
// import NotificationDD from './NotificationDD';
import user4 from '../../assets/images/users/user4.jpg';

import { ToggleMobileSidebar } from '../../store/customizer/CustomizerSlice';
import ProfileDD from './ProfileDD';

import HorizontalLogo from '../logo/HorizontalLogo';

const HorizontalHeader = () => {
  
 const isDarkMode = useSelector((state) => state.customizer.isDark);
  const topbarColor = "white"

  const dispatch = useDispatch();
  const handleLogout = () => {
    
    sessionStorage.clear();
    localStorage.clear();
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  };
  const [imageData, setImageData] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const id = sessionStorage.getItem('id');

      try {
        
        const response = await axios.get(`http://localhost:8080/api/auth/users/${id}`);
        const base64Image = response.data.imageData;
        
        if (base64Image) {
          setImageData(base64Image); 
          console.log("Image data found.");
        }

      } catch (error) {
        console.log("No image data found.");
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);
  return (
    <Navbar
      color={topbarColor}
      dark={!isDarkMode}
      light={isDarkMode}
      expand="lg"
      className="shadow HorizontalTopbar p-0"
    >
      <Container fluid className="d-flex align-items-center boxContainer">
         <div className="pe-4 py-3 ">
          <HorizontalLogo />
        </div>
       <Nav className="me-auto" navbar>
          <Button
            color="white"
            className="d-sm-block d-lg-none"
            onClick={() => dispatch(ToggleMobileSidebar())}
          >
            <Menu size={22} />
          </Button>
          
        </Nav>
        
        <UncontrolledDropdown>
        <span>
          <h5 className="mb-0 fw-medium">{sessionStorage.getItem('username')}</h5>
          <small className='text-muted'>{sessionStorage.getItem('roles')}</small>
        </span>
        </UncontrolledDropdown>
        <UncontrolledDropdown>
          <DropdownToggle tag="span" className="p-2 cursor-pointer ">
          {imageData ? (
    <img
    src={`data:image/jpeg;base64,${imageData}`}
    alt="user"
    className="img-fluid rounded-circle"
    width="60"
  />
) : (
  <img
    src={user4}
    alt="user"
    className="img-fluid rounded-circle"
    width="60"
  />
)}
          </DropdownToggle>
          <DropdownMenu className="ddWidth" end>
            <ProfileDD />

            <div className="p-2 px-3">
              <Button color="danger" href="/auth/loginformik" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </DropdownMenu>
        </UncontrolledDropdown>
      </Container>
    </Navbar>
  );
};

export default HorizontalHeader;
