import sortByAchievedDateAsc from '~/modules/sortByAchievedDateAsc'

export default function (array) {
  return sortByAchievedDateAsc(array).reverse()
}
