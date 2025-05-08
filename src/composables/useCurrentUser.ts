import { ref } from 'vue'
import { onAuthStateChanged, getAuth } from 'firebase/auth'

const currentUser = ref<null | { email: string }>(null)
let initialized = false

export function useCurrentUser() {
  if (!initialized) {
    const auth = getAuth()
    onAuthStateChanged(auth, (user) => {
      currentUser.value = user ? { email: user.email || '' } : null
    })
    initialized = true
  }

  return { currentUser }
}
