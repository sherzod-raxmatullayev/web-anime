import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import PersonIcon from '@mui/icons-material/Person';
import { Link, useLocation } from "react-router-dom";

export const Footer = () => {

  const location = useLocation();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (
    <BottomNavigation
      className='footer-menu'
      sx={{ width: "100%", position: "fixed", bottom: 0, zIndex:'9999' }}
      value={location.pathname}
    >
      <BottomNavigationAction
        label="Home"
        value="/"
        icon={<HomeIcon />}
        component={Link}
        to="/"
      />

      <BottomNavigationAction
        label="Search"
        value="/search"
        icon={<SearchIcon />}
        component={Link}
        to="/search"
      />

      <BottomNavigationAction
        label="Saved"
        value="/save"
        icon={<BookmarkIcon />}
        component={Link}
        to="/save"
      />

      <BottomNavigationAction
        label="Profile"
        value="/register"
        icon={<PersonIcon />}
        component={Link}
        to="/register"
      />
    </BottomNavigation>
  )
}
