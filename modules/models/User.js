class User {
  constructor (id, createdAt, updatedAt, deletedAt, name, email) {
    this.id = id
    this.createdAt = createdAt
    this.updatedAtd = updatedAt
    this.deletedAt = deletedAt
    this.name = name
    this.email = email
  }

  static fromObject (obj) {
    return new User(
      obj.id,
      obj.createdAt,
      obj.updatedAt,
      obj.deletedAt,
      obj.name,
      obj.email
    )
  }

  static fromResponse (resp) {
    return new User(
      resp.id,
      resp.created_at,
      resp.updated_at,
      resp.deleted_at,
      resp.name,
      resp.email
    )
  }
}

export default User
