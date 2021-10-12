import { EditUserRequestT } from './../types/types';
import HttpClient from '../network/http';
import { UserLoginT, UserSignupT, UserReponseT, EditUserResponseT} from '../types/types';

class AuthService {
  http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http
  }

  async signup(user: UserSignupT) {
    const response: UserReponseT = await this.http.fetch('/auth/signup', {
      method: 'POST',
      data: JSON.stringify(user)
    })
    return response
  }

  async login(user: UserLoginT) {
    const response: UserReponseT = await this.http.fetch('/auth/login', {
      method: 'POST',
      data: JSON.stringify(user)
    })
    return response
  }

  async googleLogin (authCode: string) {
    const response: UserReponseT = await this.http.fetch('/auth/google', {
      method: 'POST',
      data:JSON.stringify({authCode})
    })
    return response
  }

  async githubLogin (authCode: string) {
    const response: UserReponseT = await this.http.fetch('/auth/github', {
      method: 'POST',
      data:JSON.stringify({authCode})
    })
    return response
  }

  async logout() {
    const response: any = await this.http.fetch('/auth/logout', {
      method: 'GET'
    })
    return response
  }

  async me() {
    const response: any = await this.http.fetch('/auth/me', {
      method: 'GET'
    })
    return response
  }

  
  async editUserInfo(edit: EditUserRequestT) {
    const response: EditUserResponseT = await this.http.fetch('/setting', {
      method: 'POST',
      data: JSON.stringify(edit)
    }) 
    return response
  }

}

export default AuthService;