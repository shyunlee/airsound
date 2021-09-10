import { Switch, Route } from 'react-router-dom';
import styles from './app.module.css';
import LandingPage from './components/landing_page/LandingPage';
import Header from './components/header/Header'
import Main from './components/main/Main'
import Login from './components/user_login/Login';
import Signup from './components/user_signup/Signup';
import MyPage from './components/mypage/MyPage';

function App() {
  return (
    <div className={styles.app}>
      <Switch>
        <Route exact path='/'>
          <LandingPage />
        </Route>
        <Route path='/player'>
          <Header />
          <Main />
        </Route>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='/signup'>
          <Signup />
        </Route>
        <Route path='/mypage'>
          <MyPage/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
