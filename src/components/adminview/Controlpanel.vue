<template>
    <div class="queue-list">
      <h2>排隊清單</h2>
      <p>（點擊號碼球即可刪除）</p>
  
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
  
<style scoped lang="scss">
.queue-list {
  // max-width: 1000px;
  width: 60%;
  margin: 0 auto;
  padding: 2rem 3rem;
  text-align: center;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);

  h2 {
    margin-bottom: 1.2rem;
    font-size: 1.6rem;
    font-weight: 700;
    color: #1e293b;
  }
  p{
    font-size: 0.8rem;
    margin: 0;
    // color: $text-color;
  }
}

.empty {
  margin-top: 1rem;
  font-style: italic;
  color: #94a3b8;
  font-size: 1rem;
}

.queue-section {
  margin-top: 2rem;

  h3 {
    margin-bottom: 0.8rem;
    font-size: 1.1rem;
    font-weight: 600;
    color: #475569;
    display: flex;
    align-items: center;
    justify-content: center;

    &::before {
      content: '';
      display: inline-block;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      margin-right: 8px;
      background: currentColor;
    }
  }
}

.number-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  justify-content: center;
  list-style: none;
  padding: 0;
  margin: 0 auto 1.2rem;
}

.number-ball {
  --size: 70px;
  width: var(--size);
  height: var(--size);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  font-weight: bold;
  font-size: 26px;
  color: #fff;
  cursor: pointer;
  user-select: none;

  background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.4), transparent),
              linear-gradient(145deg, rgba(255, 255, 255, 0.2), rgba(0, 0, 0, 0.25));
  box-shadow:
    0 4px 8px rgba(0, 0, 0, 0.3),
    inset 0 2px 4px rgba(255, 255, 255, 0.25);

  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px) scale(1.05);
    box-shadow:
      0 6px 14px rgba(0, 0, 0, 0.4),
      inset 0 2px 4px rgba(255, 255, 255, 0.25);
  }

  &:active {
    transform: scale(0.95);
  }

  &.question {
    background-color: #f59e0b;
    background-image: radial-gradient(circle at 30% 30%, #fbbf24, #f59e0b);
  }

  &.acceptance {
    background-color: #2563eb;
    background-image: radial-gradient(circle at 30% 30%, #3b82f6, #2563eb);
  }
}

/* 動畫 */
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

