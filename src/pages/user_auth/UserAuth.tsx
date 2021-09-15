import React, { useState } from 'react';
import styles from './user_auth.module.css';

const UserAuth = (): JSX.Element => {
  const [toggleLogin, setToggleLogin] = useState<Boolean | null>(null)
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const toggle = () => {
    setEmail('')
    setUsername('')
    setPassword('')
    setConfirmPassword('')
    if (useState === null) {
      setToggleLogin(false)
    } else {
      setToggleLogin(!toggleLogin)
    }
  }

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
      default:
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.frame}>
        <div className={styles.signup_container}>
          <form className={styles.signup_input}>
            <label className={styles.label}>
              Email<br/>
              <input className={styles.input} name='email' type="email" value={email} onChange={onChange} autoComplete='off'/>
            </label>
            <label className={styles.label}>
              User Name<br/>
              <input className={styles.input} name='username' type="text" value={username} onChange={onChange} autoComplete='off'/>
            </label>
            <label className={styles.label}>
              Password<br/>
              <input className={styles.input} name='password' type="password" value={password} onChange={onChange}/>
            </label>
            <label className={styles.label}>
              Confirm Password<br/>
              <input className={styles.input} name='confirmPassword' type="password" value={confirmPassword} onChange={onChange}/>
            </label>
            <button className={styles.submit_button} type='submit'>Signup</button>
          </form>
          <div className={styles.auth_container}>
            <div className={styles.login_text}>Already have an account?</div>
            <div className={styles.login_link} onClick={toggle}>Bck to login</div>
            <AuthLogin />
          </div>
        </div>
        <div className={styles.login_container}>
          <form className={styles.login_input}>
            <label className={styles.label}>
              Email<br/>
              <input className={styles.input} name='email' type="email" value={email} onChange={onChange} autoComplete='off'/>
            </label>
            <label className={styles.label}>
              Password<br/>
              <input className={styles.input} name='password' type="password" value={password} onChange={onChange}/>
            </label>
            <button className={styles.submit_button} type='submit'>Login</button>
          </form>
          <div className={styles.auth_container}>
            <div className={styles.login_text}>Don't have an account yet?</div>
            <div className={styles.login_link} onClick={toggle}>Create an account</div>
            <AuthLogin />
          </div>
        </div>
        <div className={`${styles.banner} ${toggleLogin===null?'':!toggleLogin?styles.switch_2:styles.switch_1}`} ></div>
      </div>
    </div>
  )
}

const AuthLogin = () => {
  return (
    <div className={styles.auth_login}>
      <div className={styles.auth_divider}>
        <p className={styles.text_or}>or</p>
      </div>
      <div className={styles.auth_btn_container}>
        <button className={styles.auth_btn}>Google</button>
        <button className={styles.auth_btn}>Github</button>
        <button className={styles.auth_btn}>Kakao</button>
      </div>
    </div>
  )
}

export default UserAuth;