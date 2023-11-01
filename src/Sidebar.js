import { Button, IconButton } from '@mui/material'
import React from 'react'
import './Sidebar.css'
import AddIcon from '@mui/icons-material/Add'
import InboxIcon from '@mui/icons-material/Inbox'
import NoteIcon from '@mui/icons-material/Note'
import LabelImportantIcon from '@mui/icons-material/LabelImportant'
import NearMeIcon from '@mui/icons-material/NearMe'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import StarIcon from '@mui/icons-material/Star'

import PersonIcon from '@mui/icons-material/Person'
import DuoIcon from '@mui/icons-material/Duo'
import PhoneIcon from '@mui/icons-material/Phone'


import SideBarOption from './SideBarOption'
import { useDispatch } from 'react-redux'
import { openSendMessage } from './features/mailSlice'


const Sidebar = () => {
 const dispatch = useDispatch();
  return (
    <div className='sidebar'>
     <Button startIcon={<AddIcon fontSize="large"     
     />} className='sidebar__compose'
     onClick={()=> dispatch(openSendMessage())}
     >Compose</Button>

     <SideBarOption Icon={InboxIcon} title="Inbox" number={54}
     selected={true}
     />

     <SideBarOption Icon={StarIcon} title="Snoozed" number={54}/>

     <SideBarOption Icon={LabelImportantIcon} title="Important" number={54}/>

     <SideBarOption Icon={NearMeIcon} title="Sent" number={54}/>

     <SideBarOption Icon={NoteIcon} title="Drafts" number={54}/>

     <SideBarOption Icon={ExpandMoreIcon} title="More" number={54}/>

     <div className="SideBar__footer">
        <div className="SideBar__footerIcons">
         <IconButton>
           <PersonIcon/>
         </IconButton> 
         <IconButton>
           <DuoIcon/>
         </IconButton> 
         <IconButton>
           <PhoneIcon/>
         </IconButton>  
        </div>
     </div>
    </div>
  )
}

export default Sidebar