import React from 'react'
import './sendmail.css'
import CloseIcon from '@mui/icons-material/Close';
import { Button } from '@mui/material';
import { useForm } from "react-hook-form"
import { useDispatch } from 'react-redux';
import { closeSendMessage } from './features/mailSlice';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

const SendMail = () => {
 const { register, handleSubmit, watch, formState: { errors } } = useForm();

 const dispatch = useDispatch()

 const onSubmit = (formData) => {
  console.log(formData)

  addDoc(collection(db, `emails`), {
      to: formData.to,
      subject: formData.subject,
      message: formData.message,
      timestamp: serverTimestamp(),
     })
     .then(()=>{
      dispatch(closeSendMessage())
     })
   .catch((error) => {
    console.log(error.message)
   })
 }
  return (
    <div className='sendMail'>
     <div className="sendMail__header">
      <h3>New Message</h3>
      <CloseIcon onClick={()=> dispatch(closeSendMessage())} className="sendMail__close" />
     </div>

     <form onSubmit={handleSubmit(onSubmit)}>
      <input name="to" placeholder="To" type="email"  
      {...register("to", {required: true})}
      />
      {errors.to && <p className='sendMail__error'>To is required!</p>}

      <input name="subject" placeholder="Subject" type="text"  
      {...register("subject", {required: true})}
      />
      {errors.subject && <p className='sendMail__error'>Subject is required!</p>}

      <input placeholder="Message..." type="text" name="message" className='sendMail__message'
      {...register("message", {required: true})}
      />
      {errors.message && <p className='sendMail__error'>Message is required!</p>}

      <div className="sendMail__options">
       <Button className='sendMail__send'
       variant="contained"
       color="primary"
       type="submit"
       >Send</Button>
      </div>
     </form>
    </div>
  )
}

export default SendMail