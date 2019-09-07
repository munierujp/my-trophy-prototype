const trophy = {
  id: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true,
    max: 13
  },
  description: {
    type: String,
    required: false,
    max: 280
  }
}

export default {
  trophy
}
export { trophy }
