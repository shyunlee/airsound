import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { UserLoginT, UserSignupT } from '../../types/types';
import styles from './user_auth.module.css';

type UserAuthProps = {
  onSignup: (user: UserSignupT) => Promise<Boolean>;
  onLogin: (user: UserLoginT) => Promise<Boolean>;
  onAuthLogin: (provider: string, authCode: string) => void;
  isLogin: boolean
}

const UserAuth = ({onLogin, onSignup, isLogin, onAuthLogin}: UserAuthProps): JSX.Element => {
  const history = useHistory()
  const [toggleLogin, setToggleLogin] = useState<Boolean | null>(null)
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [srcImage, setSrcImage] = useState('')
  const [alert, setAlert] = useState('')

  useEffect(() => {
    if (isLogin === true) {
      history.push('/player')
    }
  }, [isLogin, history])

  useEffect(() => {
    console.log('userAuth')
    const url = new URL(window.location.href)
    const authCode = url.searchParams.get('code')
    if (authCode?.length === 20) {
      onAuthLogin('github', authCode)
    } else if (authCode?.length === 73) {
      onAuthLogin('google', authCode)
    }
    return () => {}
  },[onAuthLogin])

  const toggle = () => {
    setEmail('')
    setUsername('')
    setPassword('')
    setConfirmPassword('')
    if (toggleLogin === null) {
      setToggleLogin(true)
    } else {
      setToggleLogin(!toggleLogin)
    }
    // setToggleLogin(!toggleLogin)
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

  const onReset = () => {
    setEmail('')
    setUsername('')
    setPassword('')
    setConfirmPassword('')
    setSrcImage('')
    setAlert('')
  }

  const clickSignup = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const didWork = await onSignup({email, username, password, srcImage})
    if (!didWork) {
      setAlert('User Already Registered')
    }
    onReset()
    history.push('/player')
  }

  const clickLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const didWork = await onLogin({email, password})
    if (!didWork) {
      setAlert('Login Failed')
    }
    onReset()
    history.push('/player')
  }

  const authLogin = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    const provider = event.currentTarget.name
    if (provider === 'github') {
      const githubURL = `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_AUTH_REDIRECT_URI}`
      window.location.assign(githubURL)
    } else if (provider === 'google') {
      const googleURL = `https://accounts.google.com/o/oauth2/v2/auth?scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email&access_type=offline&
      include_granted_scopes=true&response_type=code&state=state_parameter_passthrough_value&redirect_uri=${process.env.REACT_APP_AUTH_REDIRECT_URI}&client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}`
      window.location.assign(googleURL)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.frame}>
        <div className={styles.signup_container}>
          <form className={styles.signup_input} onSubmit={clickSignup}>
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
            <AuthLogin authLogin={authLogin}/>
          </div>
        </div>
        <div className={styles.login_container}>
          <form className={styles.login_input} onSubmit={clickLogin}>
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
            <AuthLogin authLogin={authLogin}/>
          </div>
        </div>
        <div className={`${styles.banner} ${toggleLogin===null?'':!toggleLogin?styles.switch_2:styles.switch_1}`}>
          <img className={`${styles.login_banner} ${!toggleLogin ? styles.active : ''}`} src="./images/login_banner.png" alt="login" />
          <img className={`${styles.signup_banner} ${toggleLogin ? styles.active : ''}`} src="./images/signup_banner.png" alt="signup" />
        </div>
      </div>
    </div>
  )
}

type AuthLoginProps = {
  authLogin: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const AuthLogin = ({authLogin}: AuthLoginProps) => {
  return (
    <div className={styles.auth_login}>
      <div className={styles.auth_divider}>
        <p className={styles.text_or}>or</p>
      </div>
      <div className={styles.auth_btn_container}>
        <button className={styles.auth_btn} name='google' onClick={authLogin}>
          <img className={`${styles.auth_img} ${styles.auth_google_logo}`} src="./images/google.png" alt="" />
        </button>
        <button className={styles.auth_btn} name='github' onClick={authLogin}>
          <img className={`${styles.auth_img} ${styles.auth_github_logo}`} src="./images/github.png" alt="" />
        </button>
        {/* <button className={styles.auth_btn}>Kakao</button> */}
      </div>
    </div>
  )
}

export default UserAuth;