export default function (array) {
  return array.slice().sort((a, b) => b.id - a.id)
}
