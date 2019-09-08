class Trophy {
  constructor (id, createdAt, updatedAt, deletedAt, title, description, achievedOn, userId) {
    this.id = id
    this.createdAt = createdAt
    this.iupdatedAtd = updatedAt
    this.deletedAt = deletedAt
    this.title = title
    this.description = description
    this.achievedOn = achievedOn
    this.userId = userId
  }

  static fromObject (obj) {
    return new Trophy(
      obj.id,
      obj.createdAt,
      obj.updatedAt,
      obj.deletedAt,
      obj.title,
      obj.description,
      obj.achievedOn,
      obj.userId
    )
  }

  static fromResponse (resp) {
    return new Trophy(
      resp.id,
      resp.created_at,
      resp.updated_at,
      resp.deleted_at,
      resp.title,
      resp.description,
      resp.achieved_on,
      resp.user_id
    )
  }
}

export default Trophy
