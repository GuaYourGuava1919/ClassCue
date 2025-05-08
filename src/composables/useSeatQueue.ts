// composables/useSeatQueue.ts
import { doc, runTransaction } from 'firebase/firestore'
import type { Ref } from 'vue'
import {db} from '../firebase'

interface QueueEntry {
  seat: number;
  status: 'question' | 'acceptance';
  timestamp: number;
}

export async function updateSeatQueue(
  studentId: string,
  seatNum: number | null,
  type: 'question' | 'acceptance'
): Promise<void> {
  if (!studentId || !seatNum) {
    alert("請先登記學號及座位號碼")
    console.log(studentId, seatNum)
    return
  }

  const userDocRef = doc(db, 'users', studentId)
  const queueDocRef = doc(db, 'seatTable', '20250508')

  try {
    await runTransaction(db, async (transaction) => {
      const queueSnap = await transaction.get(queueDocRef)
      let queueData: { queue: QueueEntry[] } = { queue: [] }

      if (queueSnap.exists()) {
        queueData = queueSnap.data() as typeof queueData
        if (!Array.isArray(queueData.queue)) {
          queueData.queue = []
        }
      }

      queueData.queue = queueData.queue.filter(entry => entry.seat !== seatNum)
      queueData.queue.push({ seat: seatNum, status: type, timestamp: Date.now() })

      transaction.set(userDocRef, { seat: seatNum }, { merge: true })
      transaction.set(queueDocRef, queueData, { merge: true })
    })

    console.log(`✅ 座位 ${seatNum} 已安全更新為 ${type} 並排入隊列`)
  } catch (error) {
    console.error("❌ 更新座位狀態失敗 (transaction):", error)
  }
}

export async function removeSeatFromQueue(studentId: string, seatNum: number | null): Promise<void> {
  if (!studentId || !seatNum) {
    console.error("studentId 或 seatNum 無效")
    return
  }

  if (!confirm('你確定要取消排隊嗎？這將會從隊列中移除你的座位！')) {
    console.log("使用者取消了座位移除操作。")
    return
  }

  const queueDocRef = doc(db, 'seatTable', '20250508')

  try {
    await runTransaction(db, async (transaction) => {
      const queueSnap = await transaction.get(queueDocRef)

      if (!queueSnap.exists()) {
        console.error("座位隊列不存在")
        return
      }

      let data = queueSnap.data()
      if (!Array.isArray(data.queue)) {
        data.queue = []
      }

      data.queue = data.queue.filter((entry: QueueEntry) => entry.seat !== seatNum)
      transaction.set(queueDocRef, data, { merge: true })
    })

    console.log(`✅ 已成功取消座位 ${seatNum} 的排隊`)
  } catch (error) {
    console.error("❌ 取消座位排隊失敗 (transaction):", error)
  }
}

// useSeatQueue.ts（最後加這段）
export function useSeatQueue() {
    return {
      updateSeatQueue,
      removeSeatFromQueue,
    }
  }