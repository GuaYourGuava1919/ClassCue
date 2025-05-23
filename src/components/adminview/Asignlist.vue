<template>
    <div class="bound-seats">
      <div class="header">
        <h2>已綁定的座位</h2>
        <button class="clear-all-btn" @click="clearAll">清除所有綁定</button>
      </div>
  
      <table v-if="boundSeats.length > 0">
        <thead>
          <tr>
            <th>學號</th>
            <th>座位號碼</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in boundSeats" :key="item.schoolID">
            <td>{{ item.schoolID }}</td>
            <td>{{ item.seat }}</td>
            <td>
              <button class="unbind-btn" @click="unbindSeat(item.schoolID)">解除</button>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-else>目前沒有任何綁定的座位。</p>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted,onUnmounted } from 'vue'
  import { collection, getDocs, deleteDoc, doc, updateDoc, onSnapshot } from 'firebase/firestore'

  import {db} from '../../firebase'
  
  const boundSeats = ref<{ schoolID: string, seat: number }[]>([])
  
  const listenToBoundSeats = () => {
  const usersRef = collection(db, 'users')

  // ✅ 啟用實時監聽
  const unsubscribe = onSnapshot(usersRef, (snapshot) => {
    boundSeats.value = snapshot.docs.map(doc => ({
      schoolID: doc.id,
      seat: doc.data().seat,
    }))
  })

  return unsubscribe // 可選：返回給 onUnmounted 做移除用
}
  
  const unbindSeat = async (schoolID: string) => {
    try {
      await deleteDoc(doc(db, 'users', schoolID))
      boundSeats.value = boundSeats.value.filter(item => item.schoolID !== schoolID)
    } catch (err) {
      console.error('解除綁定失敗', err)
      alert('解除失敗，請再試一次')
    }
  }
  
  const clearAll = async () => {
  if (!confirm('⚠️ 你確定要刪除所有綁定與排隊資料嗎？這個動作無法復原！')) return

  try {
    // ✅ 1. 清除 users 集合（綁定資訊）
    const snapshot = await getDocs(collection(db, 'users'))
    const deletions = snapshot.docs.map(d => deleteDoc(doc(db, 'users', d.id)))
    await Promise.all(deletions)

    // ✅ 2. 清空排隊清單 seatTable/20250508 中的 queue
    const queueRef = doc(db, 'seatTable', '20250508')
    await updateDoc(queueRef, { queue: [] })

    // ✅ 3. 清除本地資料（如果有）
    boundSeats.value = []

    alert('✅ 所有綁定與排隊資料已清除！')
  } catch (err) {
    console.error('❌ 清除失敗', err)
    alert('❌ 清除失敗，請再試一次')
  }
}
  
onMounted(() => {
  const stop = listenToBoundSeats()

  // 若元件卸載時想移除監聽
  onUnmounted(() => {
    stop()
  })
})

  </script>
  
  <style scoped>
  .bound-seats {
    width: 90%;
    padding: 20px;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    height: 300px;
    overflow-y: scroll;
    box-sizing: border-box;
    /* margin: 20px; */
  }
  
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }
  
  .clear-all-btn {
    background-color: #f7374f;
    color: white;
    border: none;
    padding: 6px 12px;
    border-radius: 6px;
    cursor: pointer;
  }
  
  .unbind-btn {
    background-color: #f44336;
    color: white;
    border: none;
    padding: 4px 10px;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .clear-all-btn:hover,
  .unbind-btn:hover {
    opacity: 0.9;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    text-align: center;
  }
  
  thead {
    background-color: #f2f2f2;
  }
  
  th,
  td {
    padding: 10px;
    border-bottom: 1px solid #ddd;
  }
  </style>
  