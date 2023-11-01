import { Checkbox, IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import './EmailList.css'

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import RedoIcon from '@mui/icons-material/Redo';
import MoreVertIcon from '@mui/icons-material/MoreVert';


import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import SettingsIcon from '@mui/icons-material/Settings';


import InboxIcon from '@mui/icons-material/Inbox';
import PeopleIcon from '@mui/icons-material/People';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';


import Section from './Section';
import EmailRow from './EmailRow';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from './firebase';

const EmailList = () => {

 const [emails, setEmails] = useState([])

 const usersTodosRef = query(collection(db , "emails"), 
   orderBy("timestamp", "desc")
)





    useEffect(()=>{
     const unsub = onSnapshot(usersTodosRef, (snapshot) => {
      setEmails(snapshot.docs.map(doc =>({id: doc.id, ...doc.data()})))
   })

   

   return unsub;
    
   },[])

   console.log(emails) 


  return (
    <div className='emailList'
    >
     <div className="emailList__settings">
      <div className="emailList__settingsLeft">
       <Checkbox/>
       <IconButton>
        <ArrowDropDownIcon/>
      </IconButton> 
      <IconButton>
        <RedoIcon/>
      </IconButton> 
      <IconButton>
        <MoreVertIcon/>
      </IconButton> 
      </div>

      <div className="emailList__settingsRight">
       <IconButton>
        <ChevronLeftIcon/>
      </IconButton> 
      <IconButton>
        <ChevronRightIcon/>
      </IconButton> 
      <IconButton>
        <SettingsIcon/>
      </IconButton> 
      </div>
     </div>

     <div className="emailList__sections">
       <Section Icon={InboxIcon} title='Primary' color='blue' selected/>
       <Section Icon={PeopleIcon} title='Social'/>
       <Section Icon={LocalOfferIcon} title='Permission'/>
     </div>

     <div className="emailList__list">


      {emails.map((email)=>{
       return (
       <div key={email.id}>
         <EmailRow
           id={email.id}           
           title={email.to}
           subject={email.subject}
           description={email.message}
           time={new Date(email.timestamp?.seconds * 1000).toUTCString()}
           />
       </div>
       )
      })}
     </div>
    </div>
  )
}

export default EmailList