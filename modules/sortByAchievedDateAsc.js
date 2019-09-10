export default function (array) {
  return array.slice().sort((a, b) => {
    if (a.achievedOn < b.achievedOn) {
      return -1
    }
    if (a.achievedOn > b.achievedOn) {
      return 1
    }
    return 0
  })
}
