import React, { useEffect, useState } from 'react'
import './Header.css'
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AppsIcon from '@mui/icons-material/Apps';
import NotificationsIcon from '@mui/icons-material/Notifications';

import gmailLogo from './assets/image/gmailLogo.png'
import { Avatar, Button } from '@mui/material';
import { logout, selectUser } from './features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { auth } from './firebase';
import { signOut } from 'firebase/auth';
import { dropDownState, showDropDown } from './features/settingsSlice';

const Header = () => {
 const user = useSelector(selectUser)
 const show = useSelector(dropDownState)
 const navigate = useNavigate()
 const dispatch = useDispatch()

  const userDropDown = () => {
     dispatch(showDropDown(!show
      )
      );
  }

  return (
    <div className="header">
     <div className="header__left">
      <IconButton>
        <MenuIcon/>
      </IconButton>  
      <img src={gmailLogo} alt="gmail_icon" />     
     </div>

     <div className="header__middle">
      <SearchIcon/>
      <input type="text" placeholder='Search mail' />
      <ArrowDropDownIcon className="header__inputCaret"/>
     </div>

     <div className="header__right">
      <IconButton>
        <AppsIcon />
      </IconButton>
      <IconButton>
        <NotificationsIcon />
      </IconButton>
      <Avatar onClick={userDropDown} src={user?.photoUrl}/>      
     </div>
    </div>
  )
}

export default Header