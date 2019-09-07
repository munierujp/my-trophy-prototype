import sortByIdDesc from '~/modules/sortByIdDesc'

export default function (array) {
  return array.length ? sortByIdDesc(array)[0] : undefined
}
