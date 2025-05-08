// composables/useSeatQueueWatcher.ts
import { ref, onMounted, onUnmounted } from 'vue'
import { doc, getDoc, onSnapshot, setDoc } from 'firebase/firestore'
import {db }from '../firebase'

export function useSeatQueueWatcher(docId = '20250508') {
  const seatQueue = ref<{ seat: number; status: string; timestamp?: number }[]>([])
  const seatMap = ref<Record<number, { status: string; priority: number }>>({})

  const buildSeatMap = () => {
    const map: Record<number, { status: string; priority: number }> = {}
    seatQueue.value.forEach((item, index) => {
      map[item.seat] = {
        status: item.status,
        priority: index + 1,
      }
    })
    seatMap.value = map
  }

  const loadSeats = async () => {
    const docRef = doc(db, 'seatTable', docId)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const data = docSnap.data()
      const rawQueue = data.queue || []
  
      // ✅ 按照 timestamp 排序（小的在前）
      seatQueue.value = [...rawQueue].sort((a, b) => (a.timestamp || 0) - (b.timestamp || 0))
  
      buildSeatMap()
    } else {
      await setDoc(docRef, { queue: [] })
    }
  }
  
  const setupRealtimeListener = () => {
    const docRef = doc(db, 'seatTable', docId)
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data()
        seatQueue.value = data.queue || []
        buildSeatMap()
      }
    })
    return unsubscribe
  }

  onMounted(loadSeats)

  let unsubscribe: (() => void) | null = null

  onMounted(() => {
    unsubscribe = setupRealtimeListener()
  })

  onUnmounted(() => {
    if (unsubscribe) unsubscribe()
  })

  return {
    seatQueue,
    seatMap,
  }
}
