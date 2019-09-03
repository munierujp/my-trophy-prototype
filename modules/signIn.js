import { auth } from '~/modules/firebase'

export default async function (provider) {
  const userCredential = await auth().signInWithPopup(provider)
  const user = userCredential.user
  if (user) {
    const token = await user.getIdToken()
    const { email, displayName } = user
    return {
      token,
      email,
      displayName
    }
  }
}
