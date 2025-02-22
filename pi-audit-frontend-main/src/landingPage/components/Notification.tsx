import React from 'react'
import NotificationsIcon from '@mui/icons-material/Notifications';
import styles from '../styles/LPHeader.module.css';

const Notification: React.FC = () => {
  return (
    <div className={styles.notificationContainer}>
        <NotificationsIcon sx={{color:'#4B4B4B', height:'32px', width:'32px'}}/>
        <div className={styles.notificationNumber}>
          1
        </div>
    </div>
  )
}

export default Notification