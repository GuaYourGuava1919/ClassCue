<template>
  <div class="seat-actions" v-if="studentId && seatNum">
    <button @click="handleAction('question')" class="btn question" :disabled="!myQueueStatus.canQuestion.value">問問題</button>
    <button @click="handleAction('acceptance')" class="btn acceptance" :disabled="!myQueueStatus.canAccept.value">驗收</button>
    <button @click="handleCancel" class="btn cancel" :disabled="!myQueueStatus.canCancel.value">退出排隊</button>
  </div>
</template>

<script setup lang="ts">
import { useSeatQueue } from '../composables/useSeatQueue'
import {useMyQueueStatus} from '../composables/useMyQueueStatus'
import { watchEffect, ref } from 'vue'


// 從 localStorage 取得使用者 ID
const studentId = ref('')
const seatNum = ref(0)

const currentStatus = ref<'question' | 'acceptance' | null>(null)


watchEffect(() => {
  try {
    const saved = localStorage.getItem('seat-registered')
    if (saved) {
      const parsed = JSON.parse(saved)

      studentId.value = parsed.studentId || parsed.schoolID || ''
      seatNum.value = parsed.enteredSeat ?? 0

      if (!studentId.value) {
        console.warn('⚠️ localStorage 中沒有 studentId/schoolID')
      }
      if (!seatNum.value) {
        console.warn('⚠️ localStorage 中沒有 enteredSeat')
      }

      console.log(`🎓 學號: ${studentId.value}, 座號: ${seatNum.value}`)
    } else {
      console.warn('⚠️ localStorage 中找不到 seat-registered')
    }
  } catch (e) {
    console.warn('❌ localStorage 解析失敗', e)
  }
})



const myQueueStatus = useMyQueueStatus(seatNum)


const { updateSeatQueue, removeSeatFromQueue } = useSeatQueue()

const handleAction = async (type: 'question' | 'acceptance') => {
  await updateSeatQueue(studentId.value, seatNum.value, type)
  console.log(`更新座位 ${seatNum.value} 的狀態為 ${type}`)
}

const handleCancel = async () => {
  await removeSeatFromQueue(studentId.value, seatNum.value)
}
</script>

<style scoped lang="scss">
.seat-actions {
  display: flex;
  gap: 2rem;
  justify-content: center;
  margin-top: 1rem;
  margin-bottom: 1rem;

  .btn {
    padding: 10px 20px;
    border: none;
    font-weight: 600;
    font-size: 24px;
    border-radius: 999px;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

    &.question {
      background-color: #ffa725;
      color: white;
    }

    &.acceptance {
      background-color: #27548a;
      color: white;
    }

    &.cancel {
      background-color: #d84040;
      color: white;
    }

    &:hover {
      transform: scale(1.2);
    }
  }
  .btn:disabled {
      opacity: 0.5;
      background-color: #ccc;
      cursor: not-allowed;
      transform: none !important;
      box-shadow: none;
      filter: grayscale(40%);
    }
}
</style>
