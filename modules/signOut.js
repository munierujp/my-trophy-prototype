import { auth } from '~/modules/firebase'

export default async function () {
  await auth().signOut()
}
