export default function (array) {
  return array.sort((a, b) => b.id - a.id)
}
