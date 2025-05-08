<template>
    <div class="queue-list">
      <h2>排隊清單（點擊號碼取消）</h2>
  
      <div v-if="seatQueue.length === 0" class="empty">目前無人排隊</div>
  
      <div class="queue-section">
        <h3>問問題</h3>
        <transition-group name="fade" tag="ul" class="number-grid">
          <li
            v-for="item in seatQueue.filter(q => q.status === 'question')"
            :key="'q' + item.seat"
            class="number-ball question"
            @click="removeSeat(item.seat)"
          >
            {{ item.seat }}
          </li>
        </transition-group>
      </div>
  
      <div class="queue-section">
        <h3>驗收</h3>
        <transition-group name="fade" tag="ul" class="number-grid">
          <li
            v-for="item in seatQueue.filter(q => q.status === 'acceptance')"
            :key="'a' + item.seat"
            class="number-ball acceptance"
            @click="removeSeat(item.seat)"
          >
            {{ item.seat }}
          </li>
        </transition-group>
      </div>
    </div>
  </template>
  
  
  <script setup lang="ts">
  import { doc, updateDoc } from 'firebase/firestore'
  import {db} from '../../firebase'
  import { useSeatQueueWatcher } from '../../composables/useSeatQueueWatcher'
  
  const { seatQueue } = useSeatQueueWatcher('20250508')
  
  const removeSeat = async (seatNumber: number) => {
    const docRef = doc(db, 'seatTable', '20250508')
    const updatedQueue = seatQueue.value.filter(item => item.seat !== seatNumber)
  
    try {
      await updateDoc(docRef, { queue: updatedQueue })
      console.log(`✅ 已移除 seat ${seatNumber}`)
    } catch (err) {
      console.error(`❌ 無法移除 seat ${seatNumber}`, err)
    }
  }
  </script>
  
<style scoped>
.queue-list {
  max-width: 700px;
  margin: 0 auto;
  padding: 2rem;
  border-radius: 16px;
  /* background: #f9f9f9;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.05); */
  text-align: center;
}

.queue-list h2 {
  margin-bottom: 1rem;
  font-size: 1.5rem;
  color: #333;
}

.empty {
  margin-top: 1rem;
  font-style: italic;
  color: #999;
}

.queue-section {
  margin-top: 2rem;
}

.queue-section h3 {
  margin-bottom: 0.5rem;
  color: #666;
}

.number-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
  margin: 0 auto 1rem;
  padding: 0;
  list-style: none;
}

.number-ball {
  font-weight: bold;
  border-radius: 50%;
  width: 70px;
  height: 70px;
  line-height: 64px;
  text-align: center;
  font-size: 28px;
  cursor: pointer;

  background: radial-gradient(circle at 35% 35%, rgba(255,255,255,0.5), transparent),
              linear-gradient(145deg, #ffffff33, #00000022);
  box-shadow:
    0 4px 6px rgba(0, 0, 0, 0.2),
    inset 0 1px 2px rgba(255, 255, 255, 0.2);

  transition: all 0.25s ease;
  user-select: none;
}


.number-ball.question {
  background-color: #ffa725;
  background-image: radial-gradient(circle at 30% 30%, #ffc76d, #ffa725);
  color: white;
}

.number-ball.acceptance {
  background-color: #27548a;
  background-image: radial-gradient(circle at 30% 30%, #4c7eb8, #27548a);
  color: white;
}


.number-ball:hover {
  transform: translateY(-4px) scale(1.04);
  filter: brightness(1.1);
  box-shadow:
    0 6px 10px rgba(0, 0, 0, 0.3),
    inset 0 1px 2px rgba(255, 255, 255, 0.2);
}


.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.5);
}

</style>
