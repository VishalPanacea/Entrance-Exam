import React from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import styles from '../styles/LPHeader.module.css';
import { useLPHeader } from '../hooks/useLPHeader';

const ProfileSetting: React.FC = () => {

  const {username} = useLPHeader ();
  return (
    <div className={styles.profileSettingContainer}>
       <h1 className={styles.profileAvatar}>A</h1>
       <span className={styles.profileName}>{username}</span>
       <KeyboardArrowDownIcon sx={{color:'#4B4B4B', height:'24px', width:'24px'}}/>
    </div>
  )
}

export default ProfileSetting