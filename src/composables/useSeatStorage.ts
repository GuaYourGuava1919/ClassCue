// composables/useSeatStorage.ts
import { ref, onMounted } from 'vue'

interface SeatInfo {
  studentId: string
  enteredSeat: number | null
}

const STORAGE_KEY = 'seat-registered'

export function useSeatStorage() {
  const info = ref<SeatInfo>({
    studentId: '',
    enteredSeat: null,
  })

  const hasRegistered = ref(false)

  // 初始化：載入 localStorage 資料
  onMounted(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        info.value = JSON.parse(saved)
        hasRegistered.value = true
      } catch (e) {
        console.warn('解析座位資料失敗', e)
      }
    }
  })

  // 登記座位（寫入 localStorage）
  const register = () => {
    if (info.value.studentId.length !== 9 || !info.value.enteredSeat) {
      alert('請正確填寫學號與座位號碼')
      return false
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(info.value))
    hasRegistered.value = true
    //重整頁面
    window.location.reload()
    return true
  }

  // 清除登記（移除 localStorage）
  const clear = () => {
    localStorage.removeItem(STORAGE_KEY)
    info.value = { studentId: '', enteredSeat: null }
    hasRegistered.value = false
    window.location.reload()
  }

  // 自動移除非數字
  const formatStudentId = () => {
    info.value.studentId = info.value.studentId.replace(/\D/g, '')
  }

  return {
    info,
    hasRegistered,
    register,
    clear,
    formatStudentId,
  }
}
