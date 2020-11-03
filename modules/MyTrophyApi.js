import Val from '@js-commons/val'
import API from '~/modules/API'
import User from '~/modules/models/User'
import Trophy from '~/modules/models/Trophy'

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
    const user = await this.api.get(`/users/${id}`).then(User.fromResponse)
    return user
  }

  async fetchUserByEmail (email) {
    const params = {
      email
    }
    const users = await this.api.get('/users', params)
    return Val.of(users)
      .filter(users => users.length)
      .map(users => users[0])
      .map(User.fromResponse)
      .or(null)
  }

  async fetchTrophiesByUserId (userId) {
    const params = {
      user_id: userId
    }
    const trophies = await this.api.get('/trophies', params).then(trophies => trophies.map(Trophy.fromResponse))
    return trophies
  }

  async createUser () {
    await this.api.post('/users')
  }

  async fetchTrophyById (id) {
    const trophy = await this.api.get(`/trophies/${id}`).then(Trophy.fromResponse)
    return trophy
  }

  async createTrophy (trophy) {
    await this.api.post('/trophies', trophy)
  }

  async updateTrophy (id, trophy) {
    await this.api.put(`/trophies/${id}`, trophy)
  }

  async deleteTrophy (id) {
    await this.api.delete(`/trophies/${id}`)
  }
}

export default MyTrophyApi
