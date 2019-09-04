import Val from '@js-commons/val'

/**
* Wrapper of @nuxtjs/axios
*/
class API {
  constructor (axios, origin) {
    this.axios = axios
    this.origin = origin
  }

  static of (axios, options) {
    Val.of(options)
      .map(options => options.token)
      .ifPresent(token => axios.setToken(token, 'Bearer'))
    return Val.of(options)
      .map(options => options.origin)
      .map(origin => new this(axios, origin))
      .orGet(() => new this(axios))
  }

  clearToken () {
    this.axios.setToken(false)
  }

  async get (path, params) {
    const url = this.toURL(path)
    const resp = await this.axios.$get(url, { params })
    return resp
  }

  async post (path, data) {
    const url = this.toURL(path)
    const resp = await this.axios.$post(url, data)
    return resp
  }

  async put (path, data) {
    const url = this.toURL(path)
    const resp = await this.axios.$put(url, data)
    return resp
  }

  async delete (path, data) {
    const url = this.toURL(path)
    const resp = await this.axios.$delete(url, { data })
    return resp
  }

  async patch (path, data) {
    const url = this.toURL(path)
    const resp = await this.axios.$patch(url, data)
    return resp
  }

  toURL (path) {
    return Val.of(this.origin).map(origin => `${origin}${path}`).or(path)
  }
}

export default API
