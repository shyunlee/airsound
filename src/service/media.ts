import { AxiosInstance } from 'axios';
import HttpClient from '../network/http';
import { MoodResponseT, SaveOrEditMoodRequestT } from '../types/types';

class MediaService {
  http: HttpClient
  constructor (http:HttpClient) {
    this.http=http
  }

  async getAllMedia() {
    const response = await this.http.fetch('/media/all', {
      method:'GET'
    }).then(res => {
      if (res.message === 'ok') {
        const moodArr: MoodResponseT[] = res.data && res.data.moods
        const newMoods = moodArr.map((item) => {
          return {
            ...item,
            sounds: item.sounds.map(sound => {
              const newSound = {...sound, customVolume:sound.mood_sounds?.customVolume}
              delete newSound.mood_sounds
              return newSound
            })
          }
        })
        return {
          ...res.data,
          moods: newMoods
        }
      }
    })

    return response
  }

  async saveMood(data:SaveOrEditMoodRequestT) {
    const response = await this.http.fetch('/media/savemood', {
      method: 'POST',
      data,
    })
    return response
  }

  async editMood(moodId: number, data: SaveOrEditMoodRequestT) {
    console.log('edit mood')
  }

  async deleteMood(moodId: number) {
    const response = await this.http.fetch(`/media/${moodId}`, {
      method:'DELETE'
    })
    return response
  }
}

export default MediaService;