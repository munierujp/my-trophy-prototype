import Val from '@js-commons/val'
import API from '~/modules/API'

class MyTrophyApi {
  constructor (api) {
    this.api = api
  }

  static of (axios, origin, token) {
    const api = API.of(axios, {
      origin,
      token
    })
    return new this(api)
  }

  clearToken () {
    this.api.clearToken()
  }

  async fetchUserById (id) {
    const user = await this.api.get(`/users/${id}`)
    return user
  }

  async fetchUserByEmail (email) {
    const users = await this.api.get('/users/', {
      email
    })
    return Val.of(users)
      .filter(users => users.length)
      .map(users => users[0])
      .or(null)
  }

  async fetchTrophiesByUserId (userId) {
    const trophies = await this.api.get('/trophies/', {
      user_id: userId
    })
    return trophies
  }

  async createUser () {
    await this.api.post('/users/')
  }

  async fetchTrophyById (id) {
    const trophy = await this.api.get(`/trophies/${id}`)
    return trophy
  }

  async createTrophy (trophy) {
    await this.api.post('/trophies/', trophy)
  }

  async updateTrophy (id, trophy) {
    await this.api.post(`/trophies/${id}`, trophy)
  }

  async deleteTrophy (id) {
    await this.api.delete(`/trophies/${id}`)
  }
}

export default MyTrophyApi
