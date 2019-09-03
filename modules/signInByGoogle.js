import { auth } from '~/modules/firebase'
import signIn from '~/modules/signIn'

export default async function () {
  const provider = new auth.GoogleAuthProvider()
  const user = await signIn(provider)
  return user
}
