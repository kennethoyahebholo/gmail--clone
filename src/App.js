import React, { useEffect } from 'react';
import './App.css';
import Header from './Header';
import Sidebar from './Sidebar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Mail from './Mail';
import EmailList from './EmailList';
import SendMail from './SendMail';
import { selectSendMessageIsOpen } from './features/mailSlice';
import { useDispatch, useSelector } from 'react-redux'
import { login, logout, selectUser } from './features/userSlice';
import Login from './Login';
import { auth } from './firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { dropDownState, showDropDown } from './features/settingsSlice';
import { Button } from '@mui/material';


function App() {
  const show = useSelector(dropDownState)
  const sendMessageIsOpen = useSelector(selectSendMessageIsOpen);
  const dispatch = useDispatch();

  const userSignOut = () => {
   signOut(auth)
   .then((response) => {
    dispatch(logout())
    alert('user logged out')
   })  
   .catch((error) => console.log(error.message))
 }

  const user = useSelector(selectUser)

  useEffect(()=>{
  const unsubscribe = onAuthStateChanged(auth, user => {
   if(user){
     dispatch(login({
      displayName: user.displayName,
      email: user.email,
      photoUrl: user.photoURL
     }))
   }else{

   }
  })
  return () => {
   unsubscribe()
  }
  
 }, [])

 const userDropDown = () => {
     dispatch(showDropDown(false
      )
      );
  }
  


  return (
    <BrowserRouter>
    {!user? 
      <Login/>
     : 
      <div className="app">
      <Header />
      <div className="app__body" onClick={userDropDown}>
        <Sidebar/>
        <Routes>
          <Route path='/mail' element={<Mail />}/>
          <Route path='/' element={<EmailList />}/>
        </Routes>
      </div> 
      {sendMessageIsOpen && <SendMail/>}
      {show && 
     <div className='userSo'>
      <Button onClick={userSignOut} className='btn' variant="contained" color="primary">SignOut</Button>
     </div>
     }
    </div>
    }
      
    
    </BrowserRouter>
    
  );
}

export default App;
