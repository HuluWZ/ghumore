import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import { Box } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import "./navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { logout } from "../../redux/userSlice";
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Login from "../../Pages/Login";
import { message } from "antd";
import { fetchAllCategories } from "../../apiCalls/categories";
import { fetchAllLocations } from "../../apiCalls/location";
import Register from "../../Pages/Register";
import Modal from "../../Pages/Modal";
import ModalSign from "../../Pages/ModalSign";

const drawerWidth = 240;
const navItems = ['Home', 'About', 'Contact'];

function DrawerAppBar(props) {
    const { user } = useSelector((state) => state.users);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSignModalOpen, setIsSignModalOpen] = useState(false);
    const [modaltype, setModalType] = useState("");
    const [activeLink, setActiveLink] = useState("Home");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [modalOpen, setModalOpen] = useState(false);
    const handleLinkClick = async (link) => {
        setActiveLink(link);
        if (link === "Testimonials") {
          await navigate("/");
          const testimonialSection = document.getElementById("testimonial");
          testimonialSection.scrollIntoView({ behavior: "smooth" });
        }
        if (link !== "Destination") {
          setIsModalOpen(false);
        }
        if (link !== "login" || link !== "signup") {
          setIsSignModalOpen(false);
        }
      };
    
      const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem("token");
        navigate("/");
      };

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <div style={{display: 'flex'}} className='drawerAlignment' >
    <Box onClick={handleDrawerToggle}>
      <Divider />
      <List>
        <div  onClick={() => {
                handleLinkClick("Home");
                navigate("/");
              }} to='/'>  <img
            className="overflow-hidden cursor-pointer"
            alt=""
            src="/gumo-re-indiafinal-11.svg"
            onClick={() => navigate("/")}
          /></div>
       <ListItem disablePadding>
            
            <ListItemButton sx={{ textAlign: 'center' }}
              className={activeLink === "Home" ? "active" : ""}
              style={{color: 'black'}}
              onClick={() => {
                handleLinkClick("Home");
                navigate("/");
              }}>
              Home
            </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}
              className={activeLink === "Experience" ? "active" : ""}
              style={{color: 'black'}}
              onClick={() => {
                handleLinkClick("Experience");
                setModalType("experience");
                setIsModalOpen(true);
              }}>
              Experience
            </ListItemButton>
    </ListItem>
     <ListItem disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}
              className={activeLink === "Destination" ? "active" : ""}
              style={{color: 'black'}}
              onClick={() => {
                setModalType("destination");
                handleLinkClick("Destination");
                setIsModalOpen(true);
              }}>
              Destination
              </ListItemButton>
              </ListItem>
    <ListItem disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}
              className={activeLink === "Testimonials" ? "active" : ""}
              style={{color: 'black'}}
              onClick={() => {
                setModalType("testimonial");
                handleLinkClick("Testimonials");
              }}>
              Testimonials
            </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}
              className={activeLink === "About" ? "active" : ""}
              style={{color: 'black'}}
              onClick={() => {
                handleLinkClick("About");
                navigate("/aboutus");
              }}>
              About Us
            </ListItemButton>
            </ListItem>
        <ListItem disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}
              className={activeLink === "Contact" ? "active" : ""}
              style={{color: 'black'}}
              onClick={() => {
                handleLinkClick("Contact");
                navigate("/contactus");
              }}>
              Contact Us
            </ListItemButton>
            </ListItem>
            
      </List>
    </Box>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  


  return (
    <div>
      
    <Box sx={{ display: 'flex' }}>
   
      <CssBaseline />
      
      <AppBar id="mynav" className='Navbar main-navbar' style={{background: '#f8f9fa', position: 'fixed'}} component="nav">
        <Toolbar>
          <IconButton
            color="black"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon color='black' />
          </IconButton>
          <div className="navbar-logo p-10 mr-64">
          <img
            className="overflow-hidden cursor-pointer"
            alt=""
            src="/gumo-re-indiafinal-11.svg"
            onClick={() => navigate("/")}
          />
        </div>
          <Box className='ml-12' sx={{ display: { xs: 'none', sm: 'block' } }}>
          <ul className="item-list">
            <li
              className={activeLink === "Home" ? "active" : ""}
              style={{color: 'black'}}
              onClick={() => {
                handleLinkClick("Home");
                navigate("/");
              
              }}>
              Home
            </li>
            <li
              className={activeLink === "Experience" ? "active" : ""}
              style={{color: 'black'}}
              onClick={() => {
                handleLinkClick("Experience");
                setModalType("experience");
                setIsModalOpen(true);
              }}>
              Experience
            </li>
            <li
              className={activeLink === "Destination" ? "active" : ""}
              style={{color: 'black'}}
              onClick={() => {
                setModalType("destination");
                handleLinkClick("Destination");
                setIsModalOpen(true);
              }}>
              Destination
            </li>
            <li
              className={activeLink === "Testimonials" ? "active" : ""}
              style={{color: 'black'}}
              onClick={() => {
                setModalType("testimonial");
                handleLinkClick("Testimonials");
              }}>
              Testimonials
            </li>
            <li
              className={activeLink === "About" ? "active" : ""}
              style={{color: 'black'}}
              onClick={() => {
                handleLinkClick("About");
                navigate("/aboutus");
              }}>
              About Us
            </li>
            <li
              className={activeLink === "Contact" ? "active" : ""}
              style={{color: 'black'}}
              onClick={() => {
                handleLinkClick("Contact");
                navigate("/contactus");
              }}>
              Contact Us
            </li>
          
            </ul>

            
          
          </Box>
          <div sx={{ display: { xs: 'none', sm: 'block' } }} className="flex xs-none gap-2 p-10 mt-2 navbuttons   sm:mt-0">
          {user && user.fullName ? (
            <>
              <button
                onClick={handleLogout}
                className="py-2 px-4 bg-darkslateblue-100 rounded-md shadow-md flex items-center justify-center gap-2 border border-solid border-button-stroke">
                <img
                  className="w-5 h-5 overflow-hidden"
                  alt=""
                  src="/sign-in1.svg"
                />
                <div className="text-base font-semibold font-lato text-white">
                  Log Out
                </div>
              </button>
              <button
                onClick={() => navigate("/profile")}
                className="py-2 px-4 bg-darkslateblue-100 rounded-md shadow-md flex items-center justify-center gap-2 border border-solid border-button-stroke">
                <img
                  className="w-5 h-5 overflow-hidden"
                  alt=""
                  src="/sign-in1.svg"
                />
                <div className="text-base font-semibold font-lato text-white">
                  Profile
                </div>
              </button>
            </>
          ) : (
            <>
              <button
                      // onClick={() => {
                    // navigate('/register')
                  // setModalType("signup");
                  // setIsModalOpen(false);
                  // setIsSignModalOpen(true);
                // }}
                className="py-2 px-4 bg-button-stroke rounded-md shadow-md flex items-center justify-center gap-2 border border-solid border-darkslateblue-100">
                <img
                  className="w-5 h-5 overflow-hidden"
                  alt=""
                  src="/sign-in.svg"
                />
                <div className="text-base font-semibold font-poppins text-darkslateblue-200">
                 <Link to="/register">Signup</Link> 
                </div>
              </button>
              <button
                // onClick={() => {
                //   navigate("/login");
                //   // setModalType("login");
                //   // setIsModalOpen(false);
                //   // setIsSignModalOpen(true);
                // }}
                className="py-2 px-4 bg-darkslateblue-100 rounded-md shadow-md flex items-center justify-center gap-2 border border-solid border-button-stroke">
                <img
                  className="w-5 h-5 overflow-hidden"
                  alt=""
                  src="/sign-in1.svg"
                />
                <div className="text-base font-semibold font-lato text-white">
                 <Link to='/login'>Login</Link> 
                </div>
              </button>
            </>
          )}

          <button className="py-2 px-4 bg-button-stroke rounded-md shadow-md flex items-center justify-center gap-2">
            <img className="w-5 h-5 overflow-hidden" alt="" src="/cart.svg" />
            <div className="text-base font-semibold font-lato text-darkslateblue-100">
              Cart
            </div>
          </button>
        </div>
        </Toolbar>
      </AppBar>
      <Box component="nav" style={{alignItems: 'left'}}>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }} 
          sx={{
            display: { xs: 'inline-block', sm: 'none' },
            alignItems: 'start', justifyContent: 'flex-start',
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
        <Typography>
         
        </Typography>
      </Box>
    </Box>
    <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <CustomModal modalType={modaltype} />
      </Modal>
      <ModalSign open={isSignModalOpen} setOpen={setIsSignModalOpen}>
        <AccountModal modalType={modaltype} modalState={setIsSignModalOpen} />
      </ModalSign>
    </div>
  );
}




DrawerAppBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};


function CustomModal({ modalType }) {
  const [experienceList, setExperienceList] = useState([]);
  const [locationList, setLocationList] = useState([]);

  const navigate = useNavigate();

  const addCategoriesToExperienceList = async () => {
    try {
      const response = await fetchAllCategories();
      console.log(response.category, "my response data");
      console.log(typeof response.category);
      if (response.success) {
        const categories = response.category;

        // Function to group experiences into arrays of four elements each
        const groupExperiences = (experiences, groupSize) => {
          const grouped = [];
          for (let i = 0; i < experiences.length; i += groupSize) {
            grouped.push(experiences.slice(i, i + groupSize));
          }
          return grouped;
        };

        const updatedCategories = groupExperiences(categories, 4);

        // Update the state with the fetched data
        console.log(response.category, "my response category");
        setExperienceList(updatedCategories);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const addLocationToDestinationList = async () => {
    try {
      const response = await fetchAllLocations();
      console.log(response.location, "my response data");
      console.log(typeof response.location);
      if (response.success) {
        const locations = response.location;

        // Function to group experiences into arrays of four elements each
        const groupDestinations = (destinations, groupSize) => {
          const grouped = [];
          for (let i = 0; i < destinations.length; i += groupSize) {
            grouped.push(destinations.slice(i, i + groupSize));
          }
          return grouped;
        };

        const updatedLocations = groupDestinations(locations, 4);

        // Update the state with the fetched data
        console.log(response.location, "my response locarion");
        setLocationList(updatedLocations);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (modalType === "experience") {
      addCategoriesToExperienceList();
    }else if (modalType === "destination") {
      addLocationToDestinationList();
    }
  }, [modalType]);
  // const experienceList = [
  //   ["Skydiving", "Trekking", "Paragliding", "Tree Ziplining"],
  //   ["Sightseeing", "Rafting", "Water Sports", "Dinner & Buffet"],
  //   ["Tours", "Movie Passes", "Bungee Jumping", "Dinner & Buffet"],
  //   ["Tours", "Movie Passes", "Bungee Jumping", "Dinner & Buffet"],
  //   ["Rafting", "Sightseeing", "Water Sports", "Dinner & Buffet"],
  // ];

  // Now call the addCategoriesToExperienceList function to fetch categories and add them to the experienceList
  if (!modalType) return null;
  

  if (modalType === "experience")
    return (
      <div className="modal-display">
        <h2 className="modal-display-header">All Experience</h2>
        <div className="modal-list">
          {experienceList.map((expSec) => (
            <div className="modal-list-section">
              <ul>
                {expSec ? expSec.map((exp) => <li onClick={() => navigate(`/search?category=${exp.name}&location=&activity=`)}>{exp.name}</li>) : null}
              </ul>
            </div>
          ))}
        </div>
      </div>
    );
  if (modalType === "destination")
    return (
      <div className="modal-display">
        <h2 className="modal-display-header">All Destinations</h2>
        <div className="modal-list">
          {locationList.map((expSec) => (
            <div className="modal-list-section">
              <ul>
              {expSec ? expSec.map((exp) => <li onClick={() => navigate(`/search?category=&location=${exp.name}&activity=`)}>{exp.name}</li>) : null}
              </ul>
            </div>
          ))}
        </div>
      </div>
    );
}

function AccountModal({ modalType, modalState }) {
  console.log(modalType, "sign");
  if (modalType === "login")
    return (
      <div className="ModalSign">
        <Login modalState={modalState} />
      </div>
    );
  if (modalType === "signup")
    return (
      <div className="ModalSign">
        {/* <div className="close-button font-bold" onClick={modalState(false)}>x</div> */}
        <Register modalState={modalState} />
      </div>
    );
}


export default DrawerAppBar;
