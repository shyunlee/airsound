import { AxiosInstance } from 'axios';
import HttpClient from '../network/http';

class MediaService {
  http: HttpClient
  constructor (http:HttpClient) {
    this.http=http
  }

  async getAllMedia() {
    console.log('get all media')
  }

  async saveMood() {
    console.log('save mood')
  }

  async editMood() {
    console.log('edit mood')
  }

  async deleteMood() {
    console.log('delete mood')
  }
}

export default MediaService;