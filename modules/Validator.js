class Validator {
  constructor (value) {
    this.value = value
  }

  static of (value) {
    return new this(value)
  }

  hasOwnProperties (...keys) {
    return keys.every(key => this.value.hasOwnProperty(key))
  }
}

export default Validator
