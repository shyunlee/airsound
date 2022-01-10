import { Switch, Route } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import styles from './app.module.css';
import LandingPage from './pages/landing/LandingPage';
import Player from './pages/Player/Player'
import UserAuth from './pages/user_auth/UserAuth';
import { EditUserRequestT, UserLoginT, UserSignupT, UserT } from './types/types';
import  AuthService  from './service/auth';
import MediaService from './service/media';

type AppProps = {
  authService: AuthService;
  mediaService: MediaService;
  FileInput: (props: any) => JSX.Element;
}

const App = ({authService, mediaService, FileInput}: AppProps): JSX.Element => {
  const [isLogin, setIsLogin] = useState(false)
  const [user, setUser] = useState<UserT | undefined>(undefined)
  const [width, setWidth] = useState<Number | undefined>(undefined)

  useEffect(() => {
    console.log('app- useeffect')
    authService.me().then(res => {
      if (res.message === 'ok') {
        setUser(res.data)
        setIsLogin(true)
      }
    })
  }, [authService])

  useEffect(() => {
    setWidth(window.innerWidth)
    window.addEventListener('resize', () => setWidth(window.innerWidth))
    return () => {
      window.removeEventListener('resize', () => setWidth(window.innerWidth))
    }
  }, [])

  const signup = async (user: UserSignupT) => {
    const result = await authService.signup(user)
    if (result.message === 'ok') {
      const userInfo = result.data! as UserT
      setUser(userInfo)
      setIsLogin(true)
      return true
    }
    return false
  }

  const login = async (user: UserLoginT) => {
    const result = await authService.login(user!)
    if (result?.message === 'ok') {
      const userInfo = result.data! as UserT
      setUser(userInfo)
      setIsLogin(true)
      return true
    }
    return false
  }

  const authLogin = async (provider: string, authCode: string) => {
    let result;
    if (provider === 'google') {
      result = await authService.googleLogin(authCode)
    } else if (provider === 'github') {
      result = await authService.githubLogin(authCode)
    }
    if (result?.message === 'ok') {
      const userInfo = result.data! as UserT
      setUser(userInfo)
      setIsLogin(true)
    } else {
      window.alert('login failed')
    }
  }

  const logout = async () => {
    const response = await authService.logout()
    if (response.message === 'ok') {
      setUser(undefined)
      setIsLogin(false)
    }
  }

  const eidtUserInfo = async (edit:EditUserRequestT) => {
    const response = await authService.editUserInfo(edit)
    if (response.message === 'ok' && response.data?.message === 'update completed') {
      setUser(prev => ({
        ...prev,
        ...response.data
      }))
      return true
    } else {
      setUser(prev => ({
        ...prev,
        ...response.data
      }))
      return false
    }
  }
  
  return (
    <div className={styles.app}>
      <Switch>
        <Route exact path='/'>
          <LandingPage isLogin={isLogin}/>
        </Route>
        <Route path='/player'>
          <Player 
            isLogin={isLogin} 
            userInfo={user} 
            onLogout={logout} 
            mediaService={mediaService} 
            onEditUserInfo={eidtUserInfo} 
            FileInput={FileInput}
            width={width}
          />
        </Route>
        <Route path='/login'>
          <UserAuth isLogin={isLogin} onLogin={login} onSignup={signup} onAuthLogin={authLogin}/>
        </Route>
        {/* <Route path='/mypage'>
          <MyPage userInfo={user} onEditUserInfo={eidtUserInfo}/>
        </Route> */}
      </Switch>
    </div>
  );
}

export default App;
