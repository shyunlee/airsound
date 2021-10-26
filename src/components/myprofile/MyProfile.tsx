import React, { useEffect, useState } from 'react';
import { UserT, EditUserRequestT } from '../../types/types';
import styles from './myprofile.module.css';

type MyProfileProps = {
  userInfo: UserT | undefined;
  onEditUserInfo: (edit:EditUserRequestT) => Promise<Boolean>;
  toggleProfileModal: () => void;
}

const MyProfile = ({userInfo, onEditUserInfo, toggleProfileModal}: MyProfileProps): JSX.Element => {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [srcImage, setSrcImage] = useState('')
  const [alert, setAlert] = useState('')

  useEffect(() => {
    if (userInfo) {
      setEmail(userInfo.email || '')
      setUsername(userInfo.username || '')
      setSrcImage(userInfo.srcImage || './images/default_profile.png')
    }
  }, [userInfo])

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = event;
    switch (name) {
      case 'email':
        return setEmail(value);
      case 'username':
        return setUsername(value);
      case 'password':
        return setPassword(value);
      case 'confirmPassword':
        return setConfirmPassword(value)
      case 'currentPassword':
        return setCurrentPassword(value)
      default:
    }
  };

  const onSaveChanges = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (password !== confirmPassword) {
      return setAlert('Please confirm the password')
    } else if (password === confirmPassword && password !== '') {
      if (currentPassword === '') {
        return setAlert('Please type in your current password')
      }
    }
    const editRequestForm = {
      email,
      username,
      newPassword: password,
      currentPassword,
    }

    const result = await onEditUserInfo(editRequestForm)
    if (result) {
      window.alert('Saved your changes')
      toggleProfileModal()
    } else {
      setAlert('Failed to save, something went wrong')
    }
  }

  return (
    <div className={styles.myprofile_modal}>
      <div className={styles.modal_header}>
        <span>EDIT PROFILE</span>
        <button onClick={toggleProfileModal}>X</button>
      </div>
      <div className={styles.myprofile_image}>
        <img className={styles.avatar_image}src={srcImage} alt="Avatar" />
        <input className={styles.image_input} type="file" />
      </div>
      <div className={styles.user_info}>
        <form className={styles.edit_form} onSubmit={onSaveChanges}>
          <label className={styles.label}>
            Email<br/>
            <input className={styles.input} name='email' type="email" value={email} onChange={onChange} autoComplete='off' readOnly={userInfo!.authProvider === 'web' ? false : true}/>
          </label>
          <label className={styles.label}>
            User Name<br/>
            <input className={styles.input} name='username' type="text" value={username} onChange={onChange} autoComplete='off'/>
          </label>
          {
            userInfo!.authProvider === 'web' ? 
            <>  
            <label className={styles.label}>
              New Password<br/>
              <input className={styles.input} name='password' type="password" value={password} onChange={onChange}/>
            </label>
            <label className={styles.label}>
              Confirm New Password<br/>
              <input className={styles.input} name='confirmPassword' type="password" value={confirmPassword} onChange={onChange}/>
            </label>
            <label className={styles.label}>
              Current Password<br/>
              <input className={styles.input} name='currentPassword' type="password" value={currentPassword} onChange={onChange}/>
            </label>
            </>
            :
            <div className={styles.empty_space}></div>
          }
          <p className={styles.alert}>{alert}</p>
          <button className={styles.submit_button} type='submit'>Save Changes</button>
        </form>
      </div>
    </div>
  )
}

export default MyProfile;