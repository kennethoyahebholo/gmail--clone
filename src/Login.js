import React, { useState } from 'react'
import './Login.css'

import gmailLogo from './assets/image/gmailLogo.png'


import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, sendPasswordResetEmail, confirmPasswordReset } from 'firebase/auth'
import { auth, provider } from './firebase'
import { useDispatch } from 'react-redux'
import { login } from './features/userSlice'
import SaveIcon from '@mui/icons-material/Save';

import LoadingButton from '@mui/lab/LoadingButton';
// or
// import { LoadingButton } from '@mui/lab';
// import { Button, LoadingButton } from '@mui/material'
// import { LoadingButton } from '@mui/lab';


const Login = () => {
 const [isSubmitting, setIsSubmitting] = useState(false)
 const dispatch = useDispatch()
 const signIn = () => {
  setIsSubmitting(true)
   signInWithPopup(auth, provider)
   .then(({user})=>{
    dispatch(login({
     displayName: user.displayName,
     email: user.email,
     photoUrl: user.photoURL
    }))  
    setIsSubmitting(false)  
   }
   )
   .catch((error)=>{
    alert(error.message)
    setIsSubmitting(false)
   })
 }
  return (
    <div className='login'>
     <div className="login__container">
      <section>
       <img src={gmailLogo } alt="" />
      </section>
      <section>
       {!isSubmitting? <LoadingButton 
         type='button' 
            onClick={signIn} variant="contained" color="primary">Login</LoadingButton>:  
        <LoadingButton
         type='button' 
         loading
         loadingPosition='start'
         startIcon={<SaveIcon/>}
         onClick={signIn} variant="contained" color="primary">Login</LoadingButton>}
      </section>      
     </div>
    </div>
  )
}

export default Login