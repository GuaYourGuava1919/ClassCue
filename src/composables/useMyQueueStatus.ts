// composables/useMyQueueStatus.ts
import { ref, watchEffect } from 'vue'
import { computed } from 'vue'
import type { Ref } from 'vue'
import { doc } from 'firebase/firestore'
import db from '../firebase'

import { onSnapshot } from 'firebase/firestore'

export function useMyQueueStatus(seatNum: Ref<number>) {
    const status = ref<'question' | 'acceptance' | null>(null)
  
    watchEffect((onCleanup) => {
      if (!seatNum.value) return
  
      const docRef = doc(db, 'seatTable', '20250508')
      const unsub = onSnapshot(docRef, (snap) => {
        if (!snap.exists()) return
  
        const queue = snap.data().queue || []
        const found = queue.find((item: any) => item.seat === seatNum.value)
        status.value = found?.status ?? null
        // console.log('found', status.value)
      })
  
      onCleanup(() => unsub())
    })

    return {
      status,
      isInQueue: computed(() => !!status.value),
      canQuestion: computed(() => status.value === 'acceptance' || status.value === null),
      canAccept: computed(() => status.value === 'question'|| status.value === null),
      canCancel: computed(() => status.value),
    }
  }
  