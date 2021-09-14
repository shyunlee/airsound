import { Switch, Route } from 'react-router-dom';
import { useState } from 'react';

import styles from './app.module.css';
import LandingPage from './pages/landing/LandingPage';
import Main from './pages/main/Main'
import MyPage from './pages/mypage/MyPage';
import UserAuth from './pages/user_auth/UserAuth';

function App() {
  const [isLogin, setIsLogin] = useState(false)
  return (
    <div className={styles.app}>
      <Switch>
        <Route exact path='/'>
          <LandingPage />
        </Route>
        <Route path='/player'>
          <Main isLogin={isLogin}/>
        </Route>
        <Route path='/auth'>
          <UserAuth />
        </Route>
        <Route path='/mypage'>
          <MyPage/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
