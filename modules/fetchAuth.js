import { auth } from '~/modules/firebase'

export default async function () {
  const user = await onAuthStateChangedAsync()
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

function onAuthStateChangedAsync () {
  return new Promise((resolve, reject) => {
    try {
      auth().onAuthStateChanged(user => resolve(user))
    } catch (e) {
      reject(e)
    }
  })
}
