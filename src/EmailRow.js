
import React from 'react'

import { Checkbox, IconButton } from '@mui/material'

import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import LabelImportantOutlinedIcon from '@mui/icons-material/LabelImportantOutlined';
import './emailRows.css'

import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { selectMail } from './features/mailSlice';

const EmailRow = ({ id, title, subject, description, time}) => {
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const openMail = () => {
    dispatch(
      selectMail({
      id,
      title,
      subject,
      description,
      time
    })
    );
    navigate("/mail")
  };
  return (
    <div onClick={openMail} className='emailRow'>
       <div className="emailRow__options">
         <Checkbox/>
         <IconButton>
          <StarBorderOutlinedIcon />
         </IconButton>
        <IconButton>
          <LabelImportantOutlinedIcon />
         </IconButton>
       </div>

       <div className="emailRow__title">
         {title}
       </div>

       <div className="emailRow__message">
         <h4>{subject}
         <span className="emailRow__description"> 
            - {description}
         </span>
         </h4>
       </div>

       <div className="emailRow__time">
          <p>{time}</p>
       </div>
     </div>
  )
}

export default EmailRow